import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ObjectListComponent} from './components/pages/object-list/object-list.component';

const routes: Routes = [{
  path: 'list',
  component: ObjectListComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ObjectRoutingModule {
}
