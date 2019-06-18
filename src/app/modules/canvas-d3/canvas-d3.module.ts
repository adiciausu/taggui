import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {CanvasD3Component} from './components/canvas-d3/canvas-d3.component';
import {ImageService} from '../image/service/image.service';


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
    ImageService
  ]
})
export class CanvasD3Module { }
