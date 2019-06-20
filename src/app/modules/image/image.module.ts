import {NgModule} from '@angular/core';
import {ImageListComponent} from './components/pages/image-list/image-list.component';
import {ImageRoutingModule} from './image-routing.module';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ImageService} from './service/image.service';

@NgModule({
  declarations: [
    ImageListComponent,
  ],
  imports: [
    SharedModule,
    ImageRoutingModule,

    TableModule
  ],
  providers: [
    ImageService
  ]
})
export class ImageModule {
}
