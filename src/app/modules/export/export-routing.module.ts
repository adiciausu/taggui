import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExportComponent} from './components/pages/export/export.component';

const routes: Routes = [{
  path: '',
  component: ExportComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ExportRoutingModule {
}
