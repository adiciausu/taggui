import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CanvasD3Component} from './components/canvas-d3/canvas-d3.component';

@NgModule({
  declarations: [
    CanvasD3Component
  ],
  exports: [
    CanvasD3Component
  ],
  imports: [
    SharedModule,
  ]
})
export class CanvasD3Module { }
