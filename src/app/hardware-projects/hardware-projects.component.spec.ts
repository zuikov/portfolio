import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareProjectsComponent } from './hardware-projects.component';

describe('HardwareProjectsComponent', () => {
  let component: HardwareProjectsComponent;
  let fixture: ComponentFixture<HardwareProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
