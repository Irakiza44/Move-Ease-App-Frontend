import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedIssuesComponent } from './reported-issues.component';

describe('ReportedIssuesComponent', () => {
  let component: ReportedIssuesComponent;
  let fixture: ComponentFixture<ReportedIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportedIssuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportedIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
