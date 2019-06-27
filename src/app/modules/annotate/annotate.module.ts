import {NgModule} from '@angular/core';
import {AnnotateComponent} from './components/pages/annotate/annotate.component';
import {AnnotateRoutingModule} from './annotate-routing.module';
import {CanvasD3Module} from '../canvas-d3/canvas-d3.module';
import {ClassService} from '../class/service/class.service';
import {ListboxModule} from 'primeng/listbox';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ImageService} from '../image/service/image.service';
import {DropdownModule} from 'primeng/dropdown';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {imageReducer} from '../image/store/reducers/image.reducer';
import {ImageEffects} from '../image/store/effects/image.effects';
import {ClassEffects} from '../class/store/effects/class.effects';
import {classReducer} from '../class/store/reducers/class.reducer';


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
    DropdownModule,

    EffectsModule.forFeature([
      ImageEffects,
      ClassEffects
    ]),
    StoreModule.forFeature('images', imageReducer),
    StoreModule.forFeature('classes', classReducer),
  ],
  providers: [
    ClassService,
    ImageService
  ]
})
export class AnnotateModule {
}
