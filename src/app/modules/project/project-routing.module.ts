import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectListComponent} from './components/pages/project-list/project-list.component';

const routes: Routes = [{
  path: 'list',
  component: ProjectListComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ProjectRoutingModule {
}
