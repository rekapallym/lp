import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AptittudeComponent } from './aptittude.component';

describe('AptittudeComponent', () => {
  let component: AptittudeComponent;
  let fixture: ComponentFixture<AptittudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AptittudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AptittudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
