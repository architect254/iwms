import { ScrollingModule } from '@angular/cdk/scrolling';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  EnvironmentInjector,
  Inject,
  inject,
  InjectionToken,
  Injector,
  runInInjectionContext,
  SkipSelf,
} from '@angular/core';
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
import { Action } from 'rxjs/internal/scheduler/Action';
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
import { MembersService } from '../members.service';
import {
  statusLabels,
  statusColors,
  adminToggleOptions,
  bereavedMembersColumns,
  deceasedMembersColumns,
  deactivatedMembersColumns,
  membersFilters,
  activeMembersColumns,
  allMemberColumns,
  sort,
  getActionConfig,
} from './model';
import { DEACTIVATED_MEMBERS_COLUMNS } from '../../admins/list/list.component';
import { Membership } from '../../../../core/entities/user.entity';
import { bereavedMemberDetailsFormControls } from '../../../../shared/views/bereaved-member-dialog/model';
import { BereavedMemberDialogComponent } from '../../../../shared/views/bereaved-member-dialog/bereaved-member-dialog.component';
import { BereavedMember } from '../../../../core/entities/bereaved-member.entity';

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

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: MembersService
  ) {
    super(authService);

    this.columns = sort(allMemberColumns);
    this.toggledOption = this.toggleOptions[0];
    this.toggledOptionValue = this.toggledOption.value;
    this.filters = [{ key: 'membership', value: this.toggledOptionValue }];

    this.welfareId =
      this.router.getCurrentNavigation()?.extras.state?.['welfareId'];
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onToggle(option: ToggleOption) {
    this.toggledOption = option;
    this.toggledOptionValue = option.value;
    this.filters = [{ key: 'membership', value: this.toggledOptionValue }];
    switch (this.toggledOptionValue) {
      case 'all':
        this.columns = sort(allMemberColumns);
        break;
      case Membership.Active:
        this.columns = sort(activeMembersColumns);
        break;
      case Membership.Bereaved:
        this.columns = sort(bereavedMembersColumns);
        break;
      case Membership.Deceased:
        this.columns = sort(deceasedMembersColumns);
        break;
      case Membership.Deactivated:
        this.columns = sort(deactivatedMembersColumns);
        break;

      default:
        break;
    }
    console.log('toggled', this.filters, this.columns);
    this.cdr.detectChanges();
    this.doRefresh();
  }

  override fetchData(
    page: number = this.page,
    take: number = this.take,
    filters: Filter[] = this.filters
  ) {
    let action;
    if (this.welfareId) {
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
      action.subscribe((members) => {
        this.data = members.map((member) => {
          return {
            id: member.id,
            name: member.name,
            gender: member.gender,
            id_number: member.id_number,
            phone_number: member.phone_number,
            email: member.email,
            profile_image: member?.profile_image,
            membership: member.membership,
            welfare: (member as Member)?.welfare?.name,
            deceased: (member as BereavedMember)?.deceased,
            relationship_with_deceased: (member as BereavedMember)
              ?.relationship_with_deceased,
            bereavement_date: (member as BereavedMember)?.bereavement_date,
            create_date: member.create_date,
            update_date: member.update_date,
            actionConfig: getActionConfig(member),
          };
        });
      })
    );
  }

  doAction(action: ActionConfig) {
    console.log('action', action);

    switch (action.key) {
      case 'to_bereaved':
        this.dialogRef = this.dialog.open(BereavedMemberDialogComponent, {
          data: action.entity,
          width: '700px',
          height: '600px',
        });

        break;

      default:
        break;
    }
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
