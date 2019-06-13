import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', loadChildren: './modules/home/home.module#HomeModule' },
  { path: 'object', loadChildren: './modules/object/object.module#ObjectModule' }
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
