import {Actions, Effect, ofType} from '@ngrx/effects';

import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  DELETE_CLASS, DeleteClassAction, DeleteClassSuccessAction,
  LOAD_CLASSES,
  LoadClassesSuccessAction,
  SAVE_CLASS,
  SaveClassAction,
  SaveClassSuccessAction
} from '../actions/class.actions';
import {Class} from '../../models/class.model';
import {ClassService} from '../../service/class.service';

@Injectable()
export class ClassEffects {

  @Effect() loadClasss$ = this.actions$.pipe(
    ofType(LOAD_CLASSES),
    switchMap(() => this.classService.findAll()),
    map((classes: Class[]) => {
      return new LoadClassesSuccessAction(classes);
    }),
    catchError(error => new Observable(error))
  );

  @Effect() saveClass$ = this.actions$.pipe(
    ofType(SAVE_CLASS),
    switchMap((action: SaveClassAction) => this.classService.save(action.payload)),
    map((image: Class) => new SaveClassSuccessAction(image)),
    catchError(error => new Observable(error))
  );

  @Effect() deleteClass$ = this.actions$.pipe(
    ofType(DELETE_CLASS),
    switchMap((action: DeleteClassAction) => this.classService.delete(action.payload)),
    map((id: string) => new DeleteClassSuccessAction(id)),
    catchError(error => new Observable(error))
  );

  constructor(private classService: ClassService, private actions$: Actions) {
  }
}
