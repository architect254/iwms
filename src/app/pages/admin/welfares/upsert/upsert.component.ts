import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  Component,
  inject,
  InjectionToken,
  signal,
  SkipSelf,
} from '@angular/core';
import { Data } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Member, Role } from '../../../../core/entities/member.entity';
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
import { Membership } from '../../../../core/entities/user.entity';
import { MatIconModule } from '@angular/material/icon';

export const WELFARE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Welfare details form controls');

export const CHAIRPERSON_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Chairperson details form controls');

export const CHAIRPERSON_SPOUSE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Chairperson spouse details form controls');

export const CHAIRPERSON_CHILD_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Chairperson child details form controls');

export const TREASURER_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Treasurer details form controls');

export const TREASURER_SPOUSE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Treasurer spouse details form controls');

export const TREASURER_CHILD_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Treasurer child details form controls');

export const SECRETARY_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Secretary details form controls');

export const SECRETARY_SPOUSE_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Secretary spouse details form controls');

export const SECRETARY_CHILD_DETAILS_FORM_CONTROLS = new InjectionToken<
  Observable<DynamicCustomFormControlBase<ValueType>[]>
>('Secretary child details form controls');

@Component({
  selector: 'iwms-upsert',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    DynamicFormComponent,
    MatButtonModule,
    MatStepperModule,
    MatExpansionModule,
    MatIconModule,
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
      provide: CHAIRPERSON_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberDetailsFormControls,
    },
    {
      provide: CHAIRPERSON_SPOUSE_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberSpouseDetailsFormControls,
    },
    {
      provide: CHAIRPERSON_CHILD_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberChildDetailsFormControls,
    },
    {
      provide: TREASURER_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberDetailsFormControls,
    },
    {
      provide: TREASURER_SPOUSE_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberSpouseDetailsFormControls,
    },
    {
      provide: TREASURER_CHILD_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberChildDetailsFormControls,
    },
    {
      provide: SECRETARY_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberDetailsFormControls,
    },
    {
      provide: SECRETARY_SPOUSE_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberSpouseDetailsFormControls,
    },
    {
      provide: SECRETARY_CHILD_DETAILS_FORM_CONTROLS,
      useFactory: specialMemberChildDetailsFormControls,
    },
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.scss',
})
export class UpsertComponent extends EditableViewPage {
  override listUrl: string = '/welfares';

  welfare?: Welfare;
  welfareId?: string;

  chairperson: Member = new Member();
  treasurer: Member = new Member();
  secretary: Member = new Member();

  welfareDetailsFormControls = inject(WELFARE_DETAILS_FORM_CONTROLS);

  chairpersonDetailsFormControls = inject(CHAIRPERSON_DETAILS_FORM_CONTROLS);
  chairpersonSpouseDetailsFormControls = inject(
    CHAIRPERSON_SPOUSE_DETAILS_FORM_CONTROLS
  );
  chairpersonChildDetailsFormControls = [
    inject(CHAIRPERSON_CHILD_DETAILS_FORM_CONTROLS),
  ];

  treasurerDetailsFormControls = inject(TREASURER_DETAILS_FORM_CONTROLS);
  treasurerSpouseDetailsFormControls = inject(
    TREASURER_SPOUSE_DETAILS_FORM_CONTROLS
  );
  treasurerChildDetailsFormControls = [
    inject(TREASURER_CHILD_DETAILS_FORM_CONTROLS),
  ];

  secretaryDetailsFormControls = inject(SECRETARY_DETAILS_FORM_CONTROLS);
  secretarySpouseDetailsFormControls = inject(
    SECRETARY_SPOUSE_DETAILS_FORM_CONTROLS
  );
  secretaryChildDetailsFormControls = [
    inject(SECRETARY_CHILD_DETAILS_FORM_CONTROLS),
  ];

  step = signal(0);

  readonly isSelected: Record<string, [boolean, boolean, boolean]> = {
    Chairperson: [true, false, false],
    Treasurer: [true, false, false],
    Secretary: [true, false, false],
  };

  override readonly isProceedAllowed: Record<
    string,
    Record<string, boolean | boolean[]>
  > = {
    Welfare: { proceed: false },
    Chairperson: {
      proceed: false,
      Spouse: false,
      Children: [false],
    },
    Treasurer: {
      proceed: false,
      Spouse: false,
      Children: [false],
    },
    Secretary: {
      proceed: false,
      Spouse: false,
      Children: [false],
    },
  };

  readonly checks: Record<string, Record<string, boolean>> = {
    Chairperson: {
      Spouse: false,
      Children: false,
    },
    Treasurer: {
      Spouse: false,
      Children: false,
    },
    Secretary: {
      Spouse: false,
      Children: false,
    },
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

        if (this.pageAction == 'update') {
          this.welfare = data['welfare'];
          this.welfareId = this.welfare?.id;
          this.chairperson = this.welfare?.chairperson!;
          this.treasurer = this.welfare?.treasurer!;
          this.secretary = this.welfare?.secretary!;
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
            (this.isProceedAllowed['Welfare'] as Record<string, boolean>)[
              'proceed'
            ] = true;
          }
          if (this.chairperson) {
            this.chairpersonDetailsFormControls.forEach(
              (form: DynamicCustomFormControlBase<ValueType>[]) => {
                form.forEach(
                  (control: DynamicCustomFormControlBase<ValueType>) => {
                    if (control) {
                      control.value = (
                        this.chairperson as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date;
                    }
                  }
                );
              }
            );
            (this.isProceedAllowed['Chairperson'] as Record<string, boolean>)[
              'proceed'
            ] = true;

            if (this.chairperson.spouse) {
              const spouse = this.chairperson.spouse;
              this.chairpersonSpouseDetailsFormControls.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  form.forEach(
                    (control: DynamicCustomFormControlBase<ValueType>) => {
                      if (control) {
                        control.value = (
                          spouse as unknown as Record<
                            string,
                            string | number | Date
                          >
                        )[control.key] as string | number | Date;
                      }
                    }
                  );
                }
              );
            } else {
              this.check(true, {
                section: 'Chairperson',
                subsection: 'Spouse',
              });
            }
            (this.isProceedAllowed['Chairperson'] as Record<string, boolean>)[
              'Spouse'
            ] = true;

            if (this.chairperson.children && this.chairperson.children.length) {
              const children = this.chairperson.children;
              children.forEach((child, index) => {
                if (index > 0) {
                  this.chairpersonChildDetailsFormControls.push(
                    specialMemberChildDetailsFormControls()
                  );
                }
                this.chairpersonChildDetailsFormControls[index].forEach(
                  (form: DynamicCustomFormControlBase<ValueType>[]) => {
                    form.forEach(
                      (control: DynamicCustomFormControlBase<ValueType>) => {
                        if (control) {
                          control.value = (
                            child as unknown as Record<
                              string,
                              string | number | Date
                            >
                          )[control.key] as string | number | Date;
                        }
                      }
                    );
                  }
                );
                (this.isProceedAllowed['Chairperson']['Children'] as boolean[])[
                  index
                ] = true;
              });
            } else {
              this.check(true, {
                section: 'Chairperson',
                subsection: 'Children',
              });
              (
                this.isProceedAllowed['Chairperson']['Children'] as boolean[]
              )[0] = true;
            }
          }
          if (this.treasurer) {
            this.treasurerDetailsFormControls.forEach(
              (form: DynamicCustomFormControlBase<ValueType>[]) => {
                form.forEach(
                  (control: DynamicCustomFormControlBase<ValueType>) => {
                    if (control) {
                      control.value = (
                        this.treasurer as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date;
                    }
                  }
                );
              }
            );
            (this.isProceedAllowed['Treasurer'] as Record<string, boolean>)[
              'proceed'
            ] = true;

            if (this.treasurer.spouse) {
              const spouse = this.treasurer.spouse;
              this.treasurerSpouseDetailsFormControls.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  form.forEach(
                    (control: DynamicCustomFormControlBase<ValueType>) => {
                      if (control) {
                        control.value = (
                          spouse as unknown as Record<
                            string,
                            string | number | Date
                          >
                        )[control.key] as string | number | Date;
                      }
                    }
                  );
                }
              );
            } else {
              this.check(true, {
                section: 'Treasurer',
                subsection: 'Spouse',
              });
            }
            (this.isProceedAllowed['Treasurer'] as Record<string, boolean>)[
              'Spouse'
            ] = true;

            if (this.treasurer.children && this.treasurer.children.length) {
              const children = this.treasurer.children;
              children.forEach((child, index) => {
                if (index > 0) {
                  this.treasurerChildDetailsFormControls.push(
                    specialMemberChildDetailsFormControls()
                  );
                }
                this.treasurerChildDetailsFormControls[index].forEach(
                  (form: DynamicCustomFormControlBase<ValueType>[]) => {
                    form.forEach(
                      (control: DynamicCustomFormControlBase<ValueType>) => {
                        if (control) {
                          control.value = (
                            child as unknown as Record<
                              string,
                              string | number | Date
                            >
                          )[control.key] as string | number | Date;
                        }
                      }
                    );
                  }
                );
                (this.isProceedAllowed['Treasurer']['Children'] as boolean[])[
                  index
                ] = true;
              });
            } else {
              this.check(true, {
                section: 'Treasurer',
                subsection: 'Children',
              });
              (this.isProceedAllowed['Treasurer']['Children'] as boolean[])[0] =
                true;
            }
          }
          if (this.secretary) {
            this.secretaryDetailsFormControls.forEach(
              (form: DynamicCustomFormControlBase<ValueType>[]) => {
                form.forEach(
                  (control: DynamicCustomFormControlBase<ValueType>) => {
                    if (control) {
                      control.value = (
                        this.secretary as unknown as Record<
                          string,
                          string | number | Date
                        >
                      )[control.key] as string | number | Date;
                    }
                  }
                );
              }
            );
            (this.isProceedAllowed['Secretary'] as Record<string, boolean>)[
              'proceed'
            ] = true;

            if (this.secretary.spouse) {
              const spouse = this.secretary.spouse;
              this.secretarySpouseDetailsFormControls.forEach(
                (form: DynamicCustomFormControlBase<ValueType>[]) => {
                  form.forEach(
                    (control: DynamicCustomFormControlBase<ValueType>) => {
                      if (control) {
                        control.value = (
                          spouse as unknown as Record<
                            string,
                            string | number | Date
                          >
                        )[control.key] as string | number | Date;
                      }
                    }
                  );
                }
              );
            } else {
              this.check(true, {
                section: 'Secretary',
                subsection: 'Spouse',
              });
            }
            (this.isProceedAllowed['Secretary'] as Record<string, boolean>)[
              'Spouse'
            ] = true;
            if (this.secretary.children && this.secretary.children.length) {
              const children = this.secretary.children;
              children.forEach((child, index) => {
                if (index > 0) {
                  this.secretaryChildDetailsFormControls.push(
                    specialMemberChildDetailsFormControls()
                  );
                }
                this.secretaryChildDetailsFormControls[index].forEach(
                  (form: DynamicCustomFormControlBase<ValueType>[]) => {
                    form.forEach(
                      (control: DynamicCustomFormControlBase<ValueType>) => {
                        if (control) {
                          control.value = (
                            child as unknown as Record<
                              string,
                              string | number | Date
                            >
                          )[control.key] as string | number | Date;
                        }
                      }
                    );
                  }
                );
                (this.isProceedAllowed['Secretary']['Children'] as boolean[])[
                  index
                ] = true;
              });
            } else {
              this.check(true, {
                section: 'Secretary',
                subsection: 'Children',
              });
              (this.isProceedAllowed['Secretary']['Children'] as boolean[])[0] =
                true;
            }
          }
        } else {
          this.chairperson.children = [];
          this.treasurer.children = [];
          this.secretary.children = [];
        }
      })
    );
  }

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update((i) => i + 1);
  }

  prevStep() {
    this.step.update((i) => i - 1);
  }

  setSelected(member: string, index: number) {
    this.isSelected[member][index] = true;
  }

  isProceedAllowedForMember(member: string, spouse?: boolean) {
    if (spouse) {
      return (this.isProceedAllowed[member] as Record<string, boolean>)[
        'Spouse'
      ];
    } else {
      return (this.isProceedAllowed[member] as Record<string, boolean>)[
        'proceed'
      ];
    }
  }

  getChildren(member: string) {
    return this.isProceedAllowed[member]['Children'] as boolean[];
  }

  areChildrenValid(member: string) {
    return this.getChildren(member).reduce(
      (previusChildrenValid: boolean, currentOffspringValid: boolean) => {
        return previusChildrenValid && currentOffspringValid;
      }
    );
  }

  get enableSave() {
    return (
      this.isProceedAllowed['Welfare']['proceed'] &&
      this.isProceedAllowedForMember('Chairperson') &&
      this.isProceedAllowedForMember('Chairperson', true) &&
      this.areChildrenValid('Chairperson') &&
      this.isProceedAllowedForMember('Treasurer') &&
      this.isProceedAllowedForMember('Treasurer', true) &&
      this.areChildrenValid('Treasurer') &&
      this.isProceedAllowedForMember('Secretary') &&
      this.isProceedAllowedForMember('Secretary', true) &&
      this.areChildrenValid('Secretary')
    );
  }

  addChairpersonChild() {
    this.chairpersonChildDetailsFormControls.push(
      specialMemberChildDetailsFormControls()
    );
    (this.isProceedAllowed['Chairperson']['Children'] as boolean[]).push(false);
  }

  addTreasurerChild() {
    this.treasurerChildDetailsFormControls.push(
      specialMemberChildDetailsFormControls()
    );
    (this.isProceedAllowed['Treasurer']['Children'] as boolean[]).push(false);
  }

  addSecretaryChild() {
    this.treasurerChildDetailsFormControls.push(
      specialMemberChildDetailsFormControls()
    );
    (this.isProceedAllowed['Secretary']['Children'] as boolean[]).push(false);
  }

  check(
    checked: boolean,
    checkSection: { section: string; subsection: string }
  ) {
    const { section, subsection } = checkSection;

    this.checks[section][subsection] = checked;
    if (subsection == 'Spouse') {
      this.isProceedAllowed[section][subsection] = checked;
    } else {
      (this.isProceedAllowed[section][subsection] as boolean[]) = [checked];
    }
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
        (this.isProceedAllowed['Welfare'] as Record<string, boolean>)[
          'proceed'
        ] = true;
        break;
      case 'Chairperson Details':
        this.chairperson = <Member>{ ...this.chairperson, ...data };
        (this.isProceedAllowed['Chairperson'] as Record<string, boolean>)[
          'proceed'
        ] = true;
        break;
      case 'Chairperson Spouse Details':
        this.chairperson.spouse = <Spouse>{
          ...this.chairperson.spouse,
          ...data,
        };
        (this.isProceedAllowed['Chairperson'] as Record<string, boolean>)[
          'Spouse'
        ] = true;
        break;
      case 'Chairperson Children Details':
        this.chairperson.children![childDetailsIndex!]
          ? (this.chairperson.children![childDetailsIndex!] = <Child>{
              ...this.chairperson.children[childDetailsIndex!],
              ...data,
            })
          : this.chairperson.children.push(<Child>{
              ...data,
            });
        (this.isProceedAllowed['Chairperson']['Children'] as boolean[])[
          childDetailsIndex!
        ] = validOffspring!;
        break;
      case 'Treasurer Details':
        this.treasurer = <Member>{ ...this.treasurer, ...data };
        (this.isProceedAllowed['Treasurer'] as Record<string, boolean>)[
          'proceed'
        ] = true;
        break;
      case 'Treasurer Spouse Details':
        this.treasurer.spouse = <Spouse>{
          ...this.treasurer.spouse,
          ...data,
        };
        (this.isProceedAllowed['Treasurer'] as Record<string, boolean>)[
          'Spouse'
        ] = true;
        break;
      case 'Treasurer Children Details':
        this.treasurer.children![childDetailsIndex!]
          ? (this.treasurer.children![childDetailsIndex!] = <Child>{
              ...this.treasurer.children[childDetailsIndex!],
              ...data,
            })
          : this.treasurer.children.push(<Child>{
              ...data,
            });
        (this.isProceedAllowed['Treasurer']['Children'] as boolean[])[
          childDetailsIndex!
        ] = validOffspring!;
        break;
      case 'Secretary Details':
        this.secretary = <Member>{ ...this.secretary, ...data };
        (this.isProceedAllowed['Secretary'] as Record<string, boolean>)[
          'proceed'
        ] = true;
        break;
      case 'Secretary Spouse Details':
        this.secretary.spouse = <Spouse>{
          ...this.secretary.spouse,
          ...data,
        };
        (this.isProceedAllowed['Secretary'] as Record<string, boolean>)[
          'Spouse'
        ] = true;
        break;
      case 'Secretary Children Details':
        this.secretary.children![childDetailsIndex!]
          ? (this.secretary.children![childDetailsIndex!] = <Child>{
              ...this.secretary.children[childDetailsIndex!],
              ...data,
            })
          : this.secretary.children.push(<Child>{
              ...data,
            });
        (this.isProceedAllowed['Secretary']['Children'] as boolean[])[
          childDetailsIndex!
        ] = validOffspring!;
        break;
    }
  }

  save() {
    this.isSubmitting = true;

    const payload: any = {
      ...this.welfare,
    };

    delete payload.chairperson;
    delete payload.treasurer;
    delete payload.secretary;

    if (this.chairperson) {
      payload['chairpersonDto'] = this.chairperson;
      payload['chairpersonDto'].spouseDto = this.chairperson.spouse;
      payload['chairpersonDto'].childrenDto = this.chairperson.children;

      delete payload['chairpersonDto'].spouse;
      delete payload['chairpersonDto'].children;
    }

    if (this.treasurer) {
      payload['treasurerDto'] = this.treasurer;
      payload['treasurerDto'].spouseDto = this.treasurer.spouse;
      payload['treasurerDto'].childrenDto = this.treasurer.children;

      delete payload['treasurerDto'].spouse;
      delete payload['treasurerDto'].children;
    }

    if (this.secretary) {
      payload['secretaryDto'] = this.secretary;
      payload['secretaryDto'].spouseDto = this.secretary.spouse;
      payload['secretaryDto'].childrenDto = this.secretary.children;

      delete payload['secretaryDto'].spouse;
      delete payload['secretaryDto'].children;
    }

    console.log('payload', payload);

    let serviceAction;

    if (this.pageAction == 'update') {
      serviceAction = this.service.updateWelfare(this.welfareId!, payload);
    } else {
      serviceAction = this.service.createWelfare(payload);
    }

    this.subscriptions.add(
      serviceAction.subscribe({
        next: ({ id }) => {
          this.isSubmitting = false;

          this.router.navigate(['/', 'welfares', id]);

          const snackBarRef = this.snackbar.open(
            `Welfare successfully ${this.pageAction}d. Navigate back to Welfares List?`,
            `OK`,
            {
              panelClass: `alert success`,
              duration: 200,
            }
          );
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['../']);

            snackBarRef.dismiss();
          });
        },
        error: (err) => {
          this.isSubmitting = false;
        },
      })
    );
  }

  override setDefaultMetaAndTitle(): void {}
  override setTwitterCardMeta(): void {}
  override setFacebookOpenGraphMeta(): void {}

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
