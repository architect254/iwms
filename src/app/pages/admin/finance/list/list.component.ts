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
import { RouterModule, Data } from '@angular/router';
import { Member } from '../../../../core/entities/member.entity';
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
import { ContributionsService } from '../finance.service';
import {
  statusLabels,
  statusColors,
  adminToggleOptions,
  monthlyContributionColumns,
  membershipContributionColumns,
  bereavedMemberContributionColumns,
  deceasedMemberContributionColumns,
  membershipReactivationContributionColumns,
  sort,
  getActionConfig,
  membersFilters,
  contributionColumns,
} from './model';
import { Membership } from '../../../../core/entities/user.entity';
import { BereavedMember } from '../../../../core/entities/bereaved-member.entity';
import { IsBereavedMemberDialogComponent } from '../../../../shared/views/is-bereaved-member-dialog/is-bereaved-member-dialog.component';
import { IsDeceasedMemberDialogComponent } from '../../../../shared/views/is-deceased-member-dialog/is-deceased-member-dialog.component';
import { DeceasedMember } from '../../../../core/entities/deceased-member.entity';
import {
  ContributionType,
  MonthlyContribution,
} from '../../../../core/entities/contribution.entity';

export const TOGGLE_OPTIONS = new InjectionToken<ToggleOption[]>(
  'Header toggle options'
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
    { provide: TOGGLE_OPTIONS, useValue: adminToggleOptions },
    { provide: FILTERS, useValue: membersFilters },
    { provide: LABELS, useValue: statusLabels },
    { provide: COLORS, useValue: statusColors },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent extends ListPage {
  toggleOptions = inject(TOGGLE_OPTIONS);

  filterOptions = inject(FILTERS);
  columns!: GridColumn[];
  labels = inject(LABELS);
  colors = inject(COLORS);

  welfareId!: string;
  memberId!: string;

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: ContributionsService
  ) {
    super(authService);
    this.columns = sort(contributionColumns);
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
      case ContributionType.Membership:
        this.columns = sort(membershipContributionColumns);
        break;
      case ContributionType.Monthly:
        this.columns = sort(monthlyContributionColumns);
        break;
      case ContributionType.BereavedMember:
        this.columns = sort(bereavedMemberContributionColumns);
        break;
      case ContributionType.DeceasedMember:
        this.columns = sort(deceasedMemberContributionColumns);
        break;
      case ContributionType.MembershipReactivation:
        this.columns = sort(membershipReactivationContributionColumns);
        break;

      default:
        this.columns = sort(contributionColumns);
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
    if (this.memberId) {
      action = this.service.getManyByMemberId(
        this.memberId,
        page,
        take,
        filters
      );
    } else if (this.welfareId) {
      action = this.service.getManyByWelfareId(
        this.welfareId,
        page,
        take,
        filters
      );
    } else {
      action = this.service.getMany(page, take, filters);
    }
    this.subscriptions.add(
      action.subscribe((contributions) => {
        this.data = contributions.map((contribution) => {
          return {
            id: contribution.id,
            type: contribution.type,
            from: contribution.from.name,
            to: contribution.to?.name,
            create_date: contribution.create_date,
            update_date: contribution.update_date,
            month: (contribution as MonthlyContribution).monthly,
            actionConfig: getActionConfig(contribution),
          };
        });

        console.log('data', statusLabels[this.data[1].type]);
      })
    );
  }

  doAction(action: ActionConfig) {
    switch (action.key) {
      case 'is_bereaved':
        this.dialogRef = this.dialog.open(IsBereavedMemberDialogComponent, {
          data: action.entity,
          width: '700px',
          height: '590px',
        });
        break;
      case 'is_deceased':
        this.dialogRef = this.dialog.open(IsDeceasedMemberDialogComponent, {
          data: action.entity,
          width: '700px',
          height: '430px',
        });
        break;

      default:
        break;
    }

    this.subscriptions.add(
      this.dialogRef.afterClosed().subscribe(() => this.doRefresh())
    );
  }

  doAdd() {
    this.router.navigate(['add'], {
      relativeTo: this.route,
      queryParams: { type: this.toggledOptionValue },
    });
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
