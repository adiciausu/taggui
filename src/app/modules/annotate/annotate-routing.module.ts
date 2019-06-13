import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnnotateComponent} from './components/pages/annotate/annotate.component';

const routes: Routes = [{
  path: '',
  component: AnnotateComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class AnnotateRoutingModule {
}
