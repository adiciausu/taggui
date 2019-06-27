import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutLoggedComponent} from './layout-logged.component';

describe('La', () => {
  let component: LayoutLoggedComponent;
  let fixture: ComponentFixture<LayoutLoggedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutLoggedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
