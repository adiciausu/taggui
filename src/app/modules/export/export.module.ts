import {NgModule} from '@angular/core';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ImageService} from '../image/service/image.service';
import {ExportComponent} from './components/pages/export/export.component';
import {ExportRoutingModule} from './export-routing.module';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    ExportComponent,
  ],
  imports: [
    SharedModule,
    ExportRoutingModule,

    ButtonModule
  ],
  providers: [
    ImageService
  ]
})
export class ExportModule {
}
