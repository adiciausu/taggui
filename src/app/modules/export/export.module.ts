import {NgModule} from '@angular/core';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ImageService} from '../annotate/service/image.service';
import {ExportComponent} from './components/pages/export/export.component';
import {ExportRoutingModule} from './export-routing.module';

@NgModule({
  declarations: [
    ExportComponent,
  ],
  imports: [
    SharedModule,
    ExportRoutingModule,

    TableModule
  ],
  providers: [
    ImageService
  ]
})
export class ExportModule {
}
