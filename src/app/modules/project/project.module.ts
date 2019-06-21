import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectListComponent} from './components/pages/project-list/project-list.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    SharedModule,
    ProjectRoutingModule,

    TableModule,
    ButtonModule,
    DialogModule
  ],
  providers: []
})
export class ProjectModule {
}
