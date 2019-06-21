import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {DropdownModule} from 'primeng/dropdown';
import {ProjectRoutingModule} from './project-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ProjectRoutingModule,

    DropdownModule
  ],
  providers: []
})
export class ProjectModule {
}
