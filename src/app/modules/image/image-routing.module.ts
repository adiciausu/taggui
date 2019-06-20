import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImageListComponent} from './components/pages/image-list/image-list.component';

const routes: Routes = [{
  path: 'list',
  component: ImageListComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ImageRoutingModule {
}
