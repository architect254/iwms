import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsDeceasedMemberDialogComponent } from './is-deceased-member-dialog.component';

describe('IsDeceasedMemberDialogComponent', () => {
  let component: IsDeceasedMemberDialogComponent;
  let fixture: ComponentFixture<IsDeceasedMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsDeceasedMemberDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IsDeceasedMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
