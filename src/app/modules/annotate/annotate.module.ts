import {NgModule} from '@angular/core';
import {AnnotateComponent} from './components/pages/annotate/annotate.component';
import {AnnotateRoutingModule} from './annotate-routing.module';
import {CanvasD3Module} from '../canvas-d3/canvas-d3.module';
import {ClassService} from '../class/service/class.service';
import {ListboxModule} from 'primeng/listbox';


@NgModule({
  declarations: [
    AnnotateComponent
  ],
  imports: [
    AnnotateRoutingModule,

    CanvasD3Module,
    ListboxModule
  ],
  providers: [
    ClassService
  ]
})
export class AnnotateModule {
}
