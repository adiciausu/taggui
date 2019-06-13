import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClassListComponent} from './components/pages/class-list/class-list.component';

const routes: Routes = [{
  path: 'list',
  component: ClassListComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ClassRoutingModule {
}
