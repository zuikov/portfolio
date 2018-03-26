import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlyNumbersComponent } from './friendly-numbers.component';

describe('FriendlyNumbersComponent', () => {
  let component: FriendlyNumbersComponent;
  let fixture: ComponentFixture<FriendlyNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendlyNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendlyNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
