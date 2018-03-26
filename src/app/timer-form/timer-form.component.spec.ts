import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerFormComponent } from './timer-form.component';

describe('TimerFormComponent', () => {
  let component: TimerFormComponent;
  let fixture: ComponentFixture<TimerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
