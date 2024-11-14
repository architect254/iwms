import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsBereavedMemberDialogComponent } from './is-bereaved-member-dialog.component';

describe('IsBereavedMemberDialogComponent', () => {
  let component: IsBereavedMemberDialogComponent;
  let fixture: ComponentFixture<IsBereavedMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsBereavedMemberDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IsBereavedMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
