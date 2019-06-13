import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ClassListComponent} from './components/pages/class-list/class-list.component';
import {ClassRoutingModule} from './class-routing.module';
import {DataViewModule} from 'primeng/dataview';


@NgModule({
  declarations: [
    ClassListComponent,
  ],
  imports: [
    SharedModule,
    ClassRoutingModule,

    DataViewModule
  ]
})
export class ClassModule {
}
