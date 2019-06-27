import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule'},
  {path: '', loadChildren: './modules/annotate/annotate.module#AnnotateModule', canActivate: [AuthGuard]},
  {path: 'class', loadChildren: './modules/class/class.module#ClassModule', canActivate: [AuthGuard]},
  {path: 'image', loadChildren: './modules/image/image.module#ImageModule', canActivate: [AuthGuard]},
  {path: 'export', loadChildren: './modules/export/export.module#ExportModule', canActivate: [AuthGuard]},
  {path: 'project', loadChildren: './modules/project/project.module#ProjectModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
