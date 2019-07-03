import {Actions, Effect, ofType} from '@ngrx/effects';

import {Injectable} from '@angular/core';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {
  DELETE_IMAGE,
  DeleteImageAction,
  DeleteImageSuccessAction,
  LOAD_ANNOTATION_IMAGE_BATCH,
  LOAD_IMAGES,
  LoadAnnotationBatchImagesAction,
  LoadAnnotationBatchImagesSuccessAction,
  LoadImagesAction,
  LoadImagesSuccessAction,
  MARK_IMAGE_ANNOTATION_COMPLETE,
  MARK_IMAGE_ANNOTATION_COMPLETE_SUCCESS,
  MarkAnnotationCompleteAction,
  MarkAnnotationCompleteSuccesAction,
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
    switchMap((action: LoadImagesAction) => this.imageService.findAll(action.payload)),
    map((images: Image[]) => {
      return new LoadImagesSuccessAction(images);
    }),
    catchError(error => new Observable(error))
  );

  @Effect() loadAnnotationBatchImages$ = this.actions$.pipe(
    ofType(LOAD_ANNOTATION_IMAGE_BATCH),
    switchMap((action: LoadAnnotationBatchImagesAction) => this.imageService.findBatch(action.payload)),
    map((images: Image[]) => {
      return new LoadAnnotationBatchImagesSuccessAction(images);
    }),
    catchError(error => new Observable(error))
  );

  @Effect() saveImage$ = this.actions$.pipe(
    ofType(SAVE_IMAGES),
    switchMap((action: SaveImageAction) => this.imageService.save(action.payload)),
    map((image: Image) => new SaveImageSuccessAction(image)),
    catchError(error => new Observable(error))
  );

  @Effect() markAnnotaionComplete$ = this.actions$.pipe(
    ofType(MARK_IMAGE_ANNOTATION_COMPLETE),
    switchMap((action: MarkAnnotationCompleteAction) => {
      return this.imageService.markAnnotationComplete(action.payload);
    }),
    map((image: Image) => new MarkAnnotationCompleteSuccesAction(image)),
    catchError(error => new Observable(error))
  );

  @Effect() fetchNewBatchAfterAnnComplete$ = this.actions$.pipe(
    ofType(MARK_IMAGE_ANNOTATION_COMPLETE_SUCCESS),
    switchMap((action: MarkAnnotationCompleteSuccesAction) => {
      return of(action.payload);
    }),
    map((image: Image) => {
      console.log(image);
      return new LoadAnnotationBatchImagesAction(image.projectId);
    }),
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
