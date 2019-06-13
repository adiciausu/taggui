import {NgModule} from '@angular/core';
import {AnnotateComponent} from './components/pages/annotate/annotate.component';
import {AnnotateRoutingModule} from './annotate-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CanvasD3Module} from '../canvas-d3/canvas-d3.module';


@NgModule({
  declarations: [
    AnnotateComponent
  ],
  imports: [
    SharedModule,
    AnnotateRoutingModule,

    CanvasD3Module
  ]
})
export class AnnotateModule {
}
