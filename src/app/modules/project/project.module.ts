import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProjectRoutingModule} from './project-routing.module';
import {ProjectListComponent} from './components/pages/project-list/project-list.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ProjectEffects} from './store/effects/project.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {projectReducer} from './store/reducers/project.reducer';
import {ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    SharedModule,
    ProjectRoutingModule,

    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    EffectsModule.forFeature([
      ProjectEffects
    ]),
    StoreModule.forFeature('projects', projectReducer),
  ],
  providers: [
    ConfirmationService
  ]
})
export class ProjectModule {
}
