import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ObjectListComponent} from './components/pages/object-list/object-list.component';
import {ObjectRoutingModule} from './object-routing.module';


@NgModule({
  declarations: [
    ObjectListComponent,
  ],
  imports: [
    SharedModule,
    ObjectRoutingModule,
  ]
})
export class ObjectModule {
}
