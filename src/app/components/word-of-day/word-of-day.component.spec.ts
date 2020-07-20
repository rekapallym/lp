import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordOfDayComponent } from './word-of-day.component';

describe('WordOfDayComponent', () => {
  let component: WordOfDayComponent;
  let fixture: ComponentFixture<WordOfDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
