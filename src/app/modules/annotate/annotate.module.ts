import {NgModule} from '@angular/core';
import {AnnotateComponent} from './components/pages/annotate/annotate.component';
import {AnnotateRoutingModule} from './annotate-routing.module';
import {CanvasD3Module} from '../canvas-d3/canvas-d3.module';
import {ClassService} from '../class/service/class.service';
import {ListboxModule} from 'primeng/listbox';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ImageService} from './service/image.service';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [
    AnnotateComponent
  ],
  imports: [
    SharedModule,
    AnnotateRoutingModule,

    CanvasD3Module,
    ListboxModule,
    ButtonModule,
    DialogModule,
    DropdownModule
  ],
  providers: [
    ClassService,
    ImageService
  ]
})
export class AnnotateModule {
}
