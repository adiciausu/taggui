import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ClassListComponent} from './components/pages/class-list/class-list.component';
import {ClassRoutingModule} from './class-routing.module';
import {ClassService} from './service/class.service';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    ClassListComponent,
  ],
  imports: [
    SharedModule,
    ClassRoutingModule,

    TableModule
  ],
  providers: [
    ClassService
  ]
})
export class ClassModule {
}
