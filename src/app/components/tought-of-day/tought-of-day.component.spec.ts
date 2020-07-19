import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToughtOfDayComponent } from './tought-of-day.component';

describe('ToughtOfDayComponent', () => {
  let component: ToughtOfDayComponent;
  let fixture: ComponentFixture<ToughtOfDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToughtOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToughtOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
