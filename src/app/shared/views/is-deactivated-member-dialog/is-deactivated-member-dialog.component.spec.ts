import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDeactivatedMemberDialogComponent } from './is-deactivated-member-dialog.component';

describe('IsDeactivatedMemberDialogComponent', () => {
  let component: IsDeactivatedMemberDialogComponent;
  let fixture: ComponentFixture<IsDeactivatedMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsDeactivatedMemberDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IsDeactivatedMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
