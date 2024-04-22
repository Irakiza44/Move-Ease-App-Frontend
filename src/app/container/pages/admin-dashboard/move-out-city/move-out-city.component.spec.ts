import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveOutCityComponent } from './move-out-city.component';

describe('MoveOutCityComponent', () => {
  let component: MoveOutCityComponent;
  let fixture: ComponentFixture<MoveOutCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoveOutCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoveOutCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
