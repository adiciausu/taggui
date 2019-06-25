import {Actions, Effect, ofType} from '@ngrx/effects';

import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  DELETE_IMAGE,
  DeleteImageAction,
  DeleteImageSuccessAction,
  LOAD_IMAGES,
  LoadImagesSuccessAction,
  SAVE_IMAGES,
  SaveImageAction,
  SaveImageSuccessAction
} from '../actions/image.actions';
import {Image} from '../../models/image.model';
import {ImageService} from '../../service/image.service';


@Injectable()
export class ImageEffects {

  @Effect() loadImages$ = this.actions$.pipe(
    ofType(LOAD_IMAGES),
    switchMap(() => this.imageService.findAll()),
    map((images: Image[]) => {
      return new LoadImagesSuccessAction(images);
    }),
    catchError(error => new Observable(error))
  );

  @Effect() saveImage$ = this.actions$.pipe(
    ofType(SAVE_IMAGES),
    switchMap((action: SaveImageAction) => this.imageService.save(action.payload)),
    map((image: Image) => new SaveImageSuccessAction(image)),
    catchError(error => new Observable(error))
  );

  @Effect() deleteImage$ = this.actions$.pipe(
    ofType(DELETE_IMAGE),
    switchMap((action: DeleteImageAction) => this.imageService.delete(action.payload)),
    map((id: string) => new DeleteImageSuccessAction(id)),
    catchError(error => new Observable(error))
  );

  constructor(private imageService: ImageService, private actions$: Actions) {
  }
}
