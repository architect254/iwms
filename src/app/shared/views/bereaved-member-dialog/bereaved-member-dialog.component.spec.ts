import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BereavedMemberDialogComponent } from './bereaved-member-dialog.component';

describe('BereavedMemberDialogComponent', () => {
  let component: BereavedMemberDialogComponent;
  let fixture: ComponentFixture<BereavedMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BereavedMemberDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BereavedMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
