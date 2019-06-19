import {NgModule} from '@angular/core';
import {ClassListComponent} from './components/pages/class-list/class-list.component';
import {ClassRoutingModule} from './class-routing.module';
import {ClassService} from './service/class.service';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    ClassListComponent,
  ],
  imports: [
    SharedModule,
    ClassRoutingModule,

    TableModule,
    ButtonModule
  ],
  providers: [
    ClassService
  ]
})
export class ClassModule {
}
