import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import {
  ToggleOption,
  ButtonToggleComponent,
} from '../../../../shared/components/button-toggle/button-toggle.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ListPage } from '../../../../shared/directives/list-page/list-page.directive';
import { GridSearchComponent } from '../../../../shared/views/grid/grid-search/grid-search.component';
import { GridComponent } from '../../../../shared/views/grid/grid.component';
import {
  FilterOption,
  GridColumn,
  StatusLabels,
  Filter,
  ActionConfig,
} from '../../../../shared/views/grid/model';
import { FinanceService } from '../finance.service';
import {
  statusLabels,
  statusColors,
  financesToggleOptions,
  sort,
  getActionConfig,
  financeFilters,
  accountsToggleOptions,
  expenditureToggleOptions,
  bankAccountColumns,
  pettyCashAccountColumns,
  internalFundsTransferExpenditureColumns,
  externalFundsTransferExpenditureColumns,
} from './model';
import { BankAccountUpsertDialogComponent } from '../upsert/bank-account/bank-account.component';
import {
  AccountType,
  BankAccount,
} from '../../../../core/entities/account.entity';
import { PettyCashAccountUpsertDialogComponent } from '../upsert/petty-cash-account/petty-cash-account.component';
import {
  ExpenditureType,
  ExternalFundsTransferExpenditure,
  InternalFundsTransferExpenditure,
} from '../../../../core/entities/expenditure.entity';
import { InternalFundsTransferExpenditureUpsertDialogComponent } from '../upsert/internal-funds-transfer-expenditure/internal-funds-transfer-expenditure.component';
import { ExternalFundsTransferExpenditureUpsertDialogComponent } from '../upsert/external-funds-transfer-expenditure/external-funds-transfer-expenditure.component';

export const FINANCES_TOGGLE_OPTIONS = new InjectionToken<ToggleOption[]>(
  'Finances header toggle options'
);

export const ACCOUNTS_TOGGLE_OPTIONS = new InjectionToken<ToggleOption[]>(
  'Accounts toggle options'
);

export const EXPENDITURES_TOGGLE_OPTIONS = new InjectionToken<ToggleOption[]>(
  'Expenditures toggle options'
);

export const FILTERS = new InjectionToken<FilterOption[]>('Grid filters');

export const LABELS = new InjectionToken<StatusLabels>('Grid status labels');

export const COLORS = new InjectionToken<StatusLabels>('Grid status colors');

@Component({
  selector: 'iwms-list',
  standalone: true,
  imports: [
    ScrollingModule,
    AsyncPipe,
    HeaderComponent,
    ButtonToggleComponent,
    GridComponent,
    GridSearchComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    { provide: FINANCES_TOGGLE_OPTIONS, useValue: financesToggleOptions },
    { provide: ACCOUNTS_TOGGLE_OPTIONS, useValue: accountsToggleOptions },
    {
      provide: EXPENDITURES_TOGGLE_OPTIONS,
      useValue: expenditureToggleOptions,
    },
    { provide: FILTERS, useValue: financeFilters },
    { provide: LABELS, useValue: statusLabels },
    { provide: COLORS, useValue: statusColors },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  financesToggleOptions = inject(FINANCES_TOGGLE_OPTIONS);

  fincancesToggledOption: ToggleOption;
  fincancesToggledOptionValue: string = '';

  accountsToggleOptions = inject(ACCOUNTS_TOGGLE_OPTIONS);
  expenditureToggleOptions = inject(EXPENDITURES_TOGGLE_OPTIONS);

  filterOptions = inject(FILTERS);
  columns!: GridColumn[];
  labels = inject(LABELS);
  colors = inject(COLORS);

  welfareId!: string;
  memberId!: string;

  constructor(private service: FinanceService) {
    super();

    this.columns = sort(bankAccountColumns);
    this.fincancesToggledOption = this.financesToggleOptions[0];
    this.fincancesToggledOptionValue = this.fincancesToggledOption.value;
    this.toggleOptions = accountsToggleOptions;
    this.toggledOption = this.toggleOptions[0];
    this.toggledOptionValue = this.toggledOption.value;
    this.filters = [{ key: 'type', value: this.toggledOptionValue }];

    this.subscriptions.add(
      this.route.queryParamMap.subscribe((params) => {
        this.welfareId = params.get('welfareId')!;
        this.memberId = params.get('memberId')!;
      })
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onToggle(option: ToggleOption) {
    this.toggledOption = option;
    this.toggledOptionValue = option.value;
    this.filters = [{ key: 'type', value: this.toggledOptionValue }];

    switch (this.toggledOptionValue) {
      case 'accounts':
        this.toggleOptions = accountsToggleOptions;
        this.toggledOption = this.toggleOptions[0];
        this.onToggle(this.toggledOption);
        break;
      case AccountType.Bank:
        this.columns = sort(bankAccountColumns);
        break;
      case AccountType.PettyCash:
        this.columns = sort(pettyCashAccountColumns);
        break;
      case 'expenditures':
        this.toggleOptions = expenditureToggleOptions;
        this.toggledOption = this.toggleOptions[0];
        this.onToggle(this.toggledOption);
        break;
      case ExpenditureType.InternalFundsTransfer:
        this.columns = sort(internalFundsTransferExpenditureColumns);
        break;
      case ExpenditureType.ExternalFundsTransfer:
        this.columns = sort(externalFundsTransferExpenditureColumns);
        break;
    }
    this.cdr.detectChanges();
    this.doRefresh();
  }

  override fetchData(
    page: number = this.page,
    take: number = this.take,
    filters: Filter[] = this.filters
  ) {
    let action;

    switch (this.toggledOptionValue) {
      case AccountType.Bank:
        if (this.welfareId) {
          action = this.service.getManyAccountsByWelfareId(
            this.welfareId,
            page,
            take,
            filters
          );
        } else {
          action = this.service.getManyAccounts(page, take, filters);
        }
        this.subscriptions.add(
          action.subscribe((accounts) => {
            this.data = accounts.map((account) => {
              return {
                id: account.id,
                type: account.type,
                acc_name: account.name,
                number: (account as BankAccount).number,
                current_amount: account.current_amount,
                base_amount: account.base_amount,
                welfare: account.welfare.name,
                create_date: account.create_date,
                update_date: account.update_date,
                actionConfig: getActionConfig(account),
              };
            });
          })
        );
        break;
      case AccountType.PettyCash:
        if (this.welfareId) {
          action = this.service.getManyAccountsByWelfareId(
            this.welfareId,
            page,
            take,
            filters
          );
        } else {
          action = this.service.getManyAccounts(page, take, filters);
        }
        this.subscriptions.add(
          action.subscribe((accounts) => {
            this.data = accounts.map((account) => {
              return {
                id: account.id,
                type: account.type,
                acc_name: account.name,
                current_amount: account.current_amount,
                base_amount: account.base_amount,
                welfare: account.welfare.name,
                create_date: account.create_date,
                update_date: account.update_date,
                actionConfig: getActionConfig(account),
              };
            });
          })
        );
        break;

      case ExpenditureType.InternalFundsTransfer:
        if (this.welfareId) {
          action = this.service.getManyExpendituresByWelfareId(
            this.welfareId,
            page,
            take,
            filters
          );
        } else {
          action = this.service.getManyExpenditures(page, take, filters);
        }
        this.subscriptions.add(
          action.subscribe((expenditures) => {
            this.data = expenditures.map((expenditure) => {
              return {
                id: expenditure.id,
                type: expenditure.type,
                for: expenditure.for,
                amount: expenditure.amount,
                from: expenditure.from?.name,
                welfare: expenditure.from?.welfare?.name,
                to: (expenditure as InternalFundsTransferExpenditure).to.name,
                create_date: expenditure.create_date,
                update_date: expenditure.update_date,
              };
            });
          })
        );
        break;
      case ExpenditureType.ExternalFundsTransfer:
        if (this.welfareId) {
          action = this.service.getManyExpendituresByWelfareId(
            this.welfareId,
            page,
            take,
            filters
          );
        } else {
          action = this.service.getManyExpenditures(page, take, filters);
        }
        this.subscriptions.add(
          action.subscribe((expenditures) => {
            this.data = expenditures.map((expenditure) => {
              return {
                id: expenditure.id,
                type: expenditure.type,
                for: expenditure.for,
                amount: expenditure.amount,
                from: expenditure.from?.name,
                toAccount: (expenditure as ExternalFundsTransferExpenditure)
                  .toAccount,
                welfare: expenditure.from?.welfare?.name,
                create_date: expenditure.create_date,
                update_date: expenditure.update_date,
                actionConfig: getActionConfig(expenditure),
              };
            });
          })
        );
        break;
    }
  }

  upsert(action: 'create' | 'update', entity?: any) {
    console.log('toggl', this.toggledOptionValue);
    switch (this.toggledOptionValue) {
      case AccountType.Bank:
        this.dialogRef = this.dialog.open(BankAccountUpsertDialogComponent, {
          data: { action, bankAccount: entity },
          width: '700px',
          height: 'max-content',
        });
        break;
      case AccountType.PettyCash:
        this.dialogRef = this.dialog.open(
          PettyCashAccountUpsertDialogComponent,
          {
            data: { action, pettyCashAccount: entity },
            width: '700px',
            height: 'max-content',
          }
        );
        break;
      case ExpenditureType.InternalFundsTransfer:
        this.dialogRef = this.dialog.open(
          InternalFundsTransferExpenditureUpsertDialogComponent,
          {
            data: { action, internalFundsTransferExpenditure: entity },
            width: '700px',
            height: 'max-content',
          }
        );
        break;
      case ExpenditureType.ExternalFundsTransfer:
        this.dialogRef = this.dialog.open(
          ExternalFundsTransferExpenditureUpsertDialogComponent,
          {
            data: { action, externalFundsTransferExpenditure: entity },
            width: '700px',
            height: 'max-content',
          }
        );
        break;
    }

    this.subscriptions.add(
      this.dialogRef?.afterClosed().subscribe(() => this.doRefresh())
    );
  }

  doAdd() {
    this.upsert('create');
  }

  override setTwitterCardMeta(): void {
    this.setMeta([
      {
        name: `twitter:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:card`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `twitter:site`,
        content: `https://www.iwms.com`,
      },
      {
        name: `twitter:creator`,
        content: `Jared Bada - Code Links Industries Ltd`,
      },
    ]);
  }

  override setFacebookOpenGraphMeta(): void {
    this.setMeta([
      {
        name: `og:type`,
        content: `website`,
      },
      {
        name: `og:title`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:description`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:url`,
        content: `https://www.iwms.com`,
      },
      {
        name: `og:site_name`,
        content: `Integrated Welfare Management System`,
      },
      {
        name: `og:locale`,
        content: `en_US`,
      },
      {
        name: `og:image`,
        content: `@LoremIpsum`,
      },
      {
        name: `og:image:type`,
        content: `image/png`,
      },
      {
        name: `og:image:width`,
        content: `1360`,
      },
      {
        name: `og:image:height`,
        content: `720`,
      },
      {
        name: `og:image:secure_url`,
        content: `@LoremIpsum`,
      },
    ]);
  }

  override setDefaultMetaAndTitle(): void {
    this.setTitle(
      `Integrated Welfare Management System - Welfare Management Information System | Integrated Welfare Management System`
    );
    this.setMeta([
      {
        name: `description`,
        content: `@LoremIpsum`,
      },
      {
        name: `keywords`,
        content: `@LoremIpsum`,
      },
    ]);
  }
}
