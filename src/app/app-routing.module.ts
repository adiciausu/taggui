import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: './modules/annotate/annotate.module#AnnotateModule' },
  { path: 'class', loadChildren: './modules/class/class.module#ClassModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
