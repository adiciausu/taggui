import {Actions, Effect, ofType} from '@ngrx/effects';

import {Injectable} from '@angular/core';
import {ProjectService} from '../../service/project.service';
import {
  DELETE_PROJECT,
  DeleteProjectAction,
  DeleteProjectSuccessAction,
  LOAD_PROJECTS,
  LoadProjectsSuccessAction,
  SAVE_PROJECT,
  SaveProjectAction,
  SaveProjectSuccessAction
} from '../actions/project.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Project} from '../../model/project.model';
import {Observable} from 'rxjs';


@Injectable()
export class ProjectEffects {

  @Effect() loadProjects$ = this.actions$.pipe(
    ofType(LOAD_PROJECTS),
    switchMap(() => this.projectService.findAll()),
    map((projects: Project[]) => {
      return new LoadProjectsSuccessAction(projects);
    }),
    catchError(error => new Observable(error))
  );

  @Effect() saveProject$ = this.actions$.pipe(
    ofType(SAVE_PROJECT),
    switchMap((action: SaveProjectAction) => this.projectService.save(action.payload)),
    map((project: Project) => new SaveProjectSuccessAction(project)),
    catchError(error => new Observable(error))
  );

  @Effect() deleteProject$ = this.actions$.pipe(
    ofType(DELETE_PROJECT),
    switchMap((action: DeleteProjectAction) => {
      let a = this.projectService.delete(action.payload);
      a.subscribe(console.log);

      return a;
    }),
    map((id: string) => {
      console.log('map');
      return new DeleteProjectSuccessAction(id);
    }),
    catchError(error => new Observable(error))
  );

  constructor(private projectService: ProjectService, private actions$: Actions) {
  }
}
