import {Actions, Effect, ofType} from '@ngrx/effects';

import {Injectable} from '@angular/core';
import {ProjectService} from '../../service/project.service';
import {LOAD_PROJECTS, LoadProjectsSuccessAction} from '../actions/project.actions';
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

  constructor(private projectService: ProjectService, private actions$: Actions) {
  }
}
