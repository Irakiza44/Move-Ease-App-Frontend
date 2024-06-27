import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistorsComponent } from './vistors.component';

describe('VistorsComponent', () => {
  let component: VistorsComponent;
  let fixture: ComponentFixture<VistorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
