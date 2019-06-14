import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CanvasD3Component} from './components/canvas-d3/canvas-d3.component';
import {AnnotationService} from './service/annotation.service';

@NgModule({
  declarations: [
    CanvasD3Component
  ],
  exports: [
    CanvasD3Component
  ],
  imports: [
    SharedModule,
  ],
  providers: [
    AnnotationService
  ]
})
export class CanvasD3Module { }
