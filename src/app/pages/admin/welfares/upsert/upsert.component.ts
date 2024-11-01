import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, InjectionToken, SkipSelf } from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Member } from '../../../../core/entities/member.entity';
import { Welfare } from '../../../../core/entities/welfare.entity';
import { getIDNumber } from '../../../../core/models/utils';
import { AuthService } from '../../../../core/services/auth.service';
import { DynamicFormComponent } from '../../../../shared/components/form-control/form.component';
import {
  DynamicCustomFormControlBase,
  ValueType,
} from '../../../../shared/components/form-control/model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { EditableViewPage } from '../../../../shared/directives/view-page/editable-view-page.directive';
import { MembersService } from '../../members/members.service';
import { WelfaresService } from '../welfares.service';
import {
  specialMemberChildDetailsFormControls,
  specialMemberDetailsFormControls,
  specialMemberSpouseDetailsFormControls,
  welfareDetailsFormControls,
} from './model';
import { Child } from '../../../../core/entities/child.entity';
import { Spouse } from '../../../../core/entities/spouse.entity';
import { childDetailsFormControls } from '../../members/upsert/model';

export const WELFARE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Welfare details form controls');

export const SPECIAL_MEMBER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Special member details form controls');

export const SPECIAL_MEMBER_SPOUSE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Special member spouse details form controls');

export const SPECIAL_MEMBER_CHILD_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Special member child details form controls');

@Component({
  selector: 'iwms-upsert',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    DynamicFormComponent,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSnackBarModule,
    JsonPipe,
  ],
  providers: [
    {
      provide: WELFARE_DETAILS_FORM_CONTROLS,
      useFactory: welfareDetailsFormControls,
    },
    {
      provide: SPECIAL_MEMBER_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberDetailsFormControls,
    },
    {
      provide: SPECIAL_MEMBER_SPOUSE_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberSpouseDetailsFormControls,
    },
    {
      provide: SPECIAL_MEMBER_CHILD_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberChildDetailsFormControls,
    },
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends EditableViewPage {
  override listUrl: string = '/welfares';

  welfare?: Welfare;

  chairperson!: Member;
  treasurer!: Member;
  secretary!: Member;

  welfareDetailsFormControls = inject(WELFARE_DETAILS_FORM_CONTROLS);
  specialMemberDetailsFormControls = inject(
    SPECIAL_MEMBER_DETAILS_FORM_CONTROLS
  );

  specialMemberSpouseDetailsFormControls = inject(
    SPECIAL_MEMBER_SPOUSE_DETAILS_FORM_CONTROLS
  );
  specialMemberChildDetailsFormControls: Record<string, any[]> = {
    Chairperson: [inject(SPECIAL_MEMBER_CHILD_DETAILS_FORM_CONTROLS)],
    Treasurer: [inject(SPECIAL_MEMBER_CHILD_DETAILS_FORM_CONTROLS)],
    Secretary: [inject(SPECIAL_MEMBER_CHILD_DETAILS_FORM_CONTROLS)],
  };

  readonly specialMembers = ['Chairperson', 'Treasurer', 'Secretary'];

  readonly isSelected: Record<string, [boolean, boolean, boolean]> = {
    Chairperson: [true, false, false],
    Treasurer: [true, false, false],
    Secretary: [true, false, false],
  };

  override readonly isProceedAllowed: Record<
    string,
    boolean | Record<string, boolean>
  > = {
    Welfare: false,
    Chairperson: {
      proceed: false,
      Spouse: false,
      Children: false,
    },
    Treasurer: {
      proceed: false,
      Spouse: false,
      Children: false,
    },
    Secretary: {
      proceed: false,
      Spouse: false,
      Children: false,
    },
  };

  readonly checks: Record<string, Record<string, boolean>> = {
    Chairperson: {
      Spouse: true,
      Children: true,
    },
    Treasurer: {
      Spouse: true,
      Children: true,
    },
    Secretary: {
      Spouse: true,
      Children: true,
    },
  };

  validChildren: Record<string, boolean[]> = {
    Chairperson: [false],
    Treasurer: [false],
    Secretary: [false],
  };

  constructor(
    @SkipSelf() override authService: AuthService,
    private service: WelfaresService,
    private membersService: MembersService
  ) {
    super(authService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.route.data.subscribe((data: Data) => {
        this.pageAction = data['action'];
        this.viewUrl = `/welfares/${this.route.snapshot.paramMap.get('id')}`;

        this.welfare = data['welfare'];
        this.chairperson = this.welfare?.chairperson!;
        this.treasurer = this.welfare?.treasurer!;
        this.secretary = this.welfare?.secretary!;

        if (this.pageAction == 'update') {
          if (this.welfare) {
            this.welfareDetailsFormControls.forEach(
              (form: DynamicCustomFormControlBase<ValueType>[]) => {
                form.forEach(
                  (control: DynamicCustomFormControlBase<ValueType>) => {
                    if (control) {
                      control.value = (
                        this.welfare as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date;
                    }
                  }
                );
              }
            );
          }
        }
      })
    );
  }

  setSelected(member: string, index: number) {
    this.isSelected[member][index] = true;
  }

  areChildrenValid(member: string) {
    return this.validChildren[member].reduce(
      (previusChildrenValid: boolean, currentOffspringValid: boolean) => {
        return previusChildrenValid && currentOffspringValid;
      }
    );
  }

  addChild(member: string) {
    this.specialMemberChildDetailsFormControls[member].push(
      specialMemberChildDetailsFormControls()
    );
    this.validChildren[member].push(false);
  }

  check(
    checked: boolean,
    checkSection: { section: string; subsection: string }
  ) {
    const { section, subsection } = checkSection;

    this.checks[section][subsection] = checked;
    (this.isProceedAllowed[section] as Record<string, boolean>)[subsection] =
      checked;
  }

  onValidityNotified(
    formData: string,
    section: string,
    childDetailsIndex?: number,
    validOffspring?: boolean
  ) {
    const data = JSON.parse(formData);
    switch (section) {
      case 'Welfare Details':
        this.welfare = { ...this.welfare, ...data };
        this.isProceedAllowed['Welfare Details'] = true;
        break;
      case 'Chairperson Details':
        this.chairperson = <Member>{ ...this.chairperson, ...data };
        this.isProceedAllowed['Chairperson Details'] = true;
        break;
      case 'Chairperson Spouse Details':
        this.chairperson.spouse = <Spouse>{
          ...this.chairperson.spouse,
          ...data,
        };
        this.isProceedAllowed['Chairperson Spouse Details'] = true;
        break;
      case 'Chairperson Children Details':
        this.chairperson.children![childDetailsIndex!] = <Child>{
          ...this.chairperson.children[childDetailsIndex!],
          ...data,
        };
        this.validChildren['Chaiperson'][childDetailsIndex!] = validOffspring!;
        break;
      case 'Treasurer Details':
        this.treasurer = <Member>{ ...this.treasurer, ...data };
        this.isProceedAllowed['Treasurer Details'] = true;
        break;
      case 'Treasurer Spouse Details':
        this.treasurer.spouse = <Spouse>{
          ...this.treasurer.spouse,
          ...data,
        };
        this.isProceedAllowed['Treasurer Spouse Details'] = true;
        break;
      case 'Treasurer Children Details':
        this.treasurer.children![childDetailsIndex!] = <Child>{
          ...this.treasurer.children[childDetailsIndex!],
          ...data,
        };
        this.validChildren['Treasurer'][childDetailsIndex!] = validOffspring!;
        break;
      case 'Secretary Details':
        this.secretary = <Member>{ ...this.secretary, ...data };
        this.isProceedAllowed['Secretary Details'] = true;
        break;
      case 'Secretary Spouse Details':
        this.secretary.spouse = <Spouse>{
          ...this.secretary.spouse,
          ...data,
        };
        this.isProceedAllowed['Secretary Spouse Details'] = true;
        break;
      case 'Secretary Children Details':
        this.secretary.children![childDetailsIndex!] = <Child>{
          ...this.secretary.children[childDetailsIndex!],
          ...data,
        };
        this.validChildren['Secretary'][childDetailsIndex!] = validOffspring!;
        break;
    }
  }

  save() {
    this.isSubmitting = true;

    const payload: any = {
      ...this.welfare,
    };

    if (this.chairperson) {
      payload['chairpersonDto'] = this.chairperson;
      payload['chairpersonDto'].spouseDto = this.chairperson.spouse;
      payload['chairpersonDto'].childrenDto = this.chairperson.children;
    }

    if (this.treasurer) {
      payload['treasurerDto'] = this.treasurer;
      payload['treasurerDto'].spouseDto = this.treasurer.spouse;
      payload['treasurerDto'].childrenDto = this.treasurer.children;
    }

    if (this.secretary) {
      payload['secretaryDto'] = this.secretary;
      payload['secretaryDto'].spouseDto = this.secretary.spouse;
      payload['secretaryDto'].childrenDto = this.secretary.children;
    }

    console.log('payload', payload)


    // let serviceAction;

    // if (this.pageAction == 'update') {
    //   serviceAction = this.service.update(this.userId!, payload);
    // } else {
    //   serviceAction = this.service.create(payload);
    // }

    // this.subscriptions.add(
    //   serviceAction.subscribe({
    //     next: ({ id }) => {
    //       this.isSubmitting = false;

    //       this.router.navigate(['/', 'user-accounts', id]);

    //       const snackBarRef = this.snackbar.open(
    //         `User account successfully ${this.pageAction}d. Navigate back to Accounts List?`,
    //         `OK`,
    //         {
    //           panelClass: `alert success`,
    //           duration: 200,
    //         }
    //       );
    //       snackBarRef.onAction().subscribe(() => {
    //         this.router.navigate(['../']);

    //         snackBarRef.dismiss();
    //       });
    //     },
    //     error: (err) => {
    //       this.isSubmitting = false;
    //     },
    //   })
    // );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
