import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {path: '', loadChildren: './modules/annotate/annotate.module#AnnotateModule'},
  {path: 'class', loadChildren: './modules/class/class.module#ClassModule'},
  {path: 'image', loadChildren: './modules/image/image.module#ImageModule'},
  {path: 'export', loadChildren: './modules/export/export.module#ExportModule'},
  {path: 'project', loadChildren: './modules/project/project.module#ProjectModule'}
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
