import {NgModule} from '@angular/core';
import {ImageListComponent} from './components/pages/image-list/image-list.component';
import {ImageRoutingModule} from './image-routing.module';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ImageService} from './service/image.service';
import {FileUploadModule} from 'primeng/fileupload';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ImageListComponent,
  ],
  imports: [
    SharedModule,
    ImageRoutingModule,

    TableModule,
    FileUploadModule
  ],
  providers: [
    ImageService
  ]
})
export class ImageModule {
}
