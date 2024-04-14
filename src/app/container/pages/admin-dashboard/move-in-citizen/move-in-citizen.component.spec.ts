import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveInCitizenComponent } from './move-in-citizen.component';

describe('MoveInCitizenComponent', () => {
  let component: MoveInCitizenComponent;
  let fixture: ComponentFixture<MoveInCitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveInCitizenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoveInCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
