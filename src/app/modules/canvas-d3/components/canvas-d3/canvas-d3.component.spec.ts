import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasD3Component } from './canvas-d3.component';

describe('CanvasD3Component', () => {
  let component: CanvasD3Component;
  let fixture: ComponentFixture<CanvasD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
