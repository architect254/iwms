import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipUpsertComponent } from './membership-upsert.component';

describe('MembershipUpsertComponent', () => {
  let component: MembershipUpsertComponent;
  let fixture: ComponentFixture<MembershipUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipUpsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembershipUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
