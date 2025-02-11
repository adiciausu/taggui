import {Image} from '../../models/image.model';

export const LOAD_IMAGES = '[Image] Load';
export const LOAD_IMAGES_SUCCESS = '[Image] Load Success';
export const LOAD_ANNOTATION_IMAGE_BATCH = '[Image] Load Annotation Batch';
export const LOAD_ANNOTATION_IMAGE_BATCH_SUCCESS = '[Image] Load Annotation Batch Success';
export const SAVE_IMAGES = '[Image] Save';
export const MARK_IMAGE_ANNOTATION_COMPLETE = '[Image] Annotation Complete';
export const MARK_IMAGE_ANNOTATION_COMPLETE_SUCCESS = '[Image] Annotation Complete Success';
export const SAVE_IMAGE_SUCCESS = '[Image] Save Success';
export const DELETE_IMAGE = '[Image] Delete';
export const DELETE_IMAGE_SUCCESS = '[Image] Delete Success';
export const SELECT_IMAGE = '[Image] Select';
export const NEXT_IMAGE = '[Image] Next';
export const PREVIOUS_IMAGE = '[Image] Previous';

export class LoadImagesAction {
  readonly type = LOAD_IMAGES;

  constructor(public payload: string) {
  }
}

export class LoadImagesSuccessAction {
  readonly type = LOAD_IMAGES_SUCCESS;

  constructor(public payload: Image[]) {
  }
}

export class LoadAnnotationBatchImagesAction {
  readonly type = LOAD_ANNOTATION_IMAGE_BATCH;

  constructor(public payload: string) {
  }
}

export class LoadAnnotationBatchImagesSuccessAction {
  readonly type = LOAD_ANNOTATION_IMAGE_BATCH_SUCCESS;

  constructor(public payload: Image[]) {
  }
}

export class MarkAnnotationCompleteAction {
  readonly type = MARK_IMAGE_ANNOTATION_COMPLETE;

  constructor(public payload: Image) {
  }
}

export class MarkAnnotationCompleteSuccesAction {
  readonly type = MARK_IMAGE_ANNOTATION_COMPLETE_SUCCESS;

  constructor(public payload: Image) {
  }
}


export class SaveImageAction {
  readonly type = SAVE_IMAGES;

  constructor(public payload: Image) {
  }
}

export class SaveImageSuccessAction {
  readonly type = SAVE_IMAGE_SUCCESS;

  constructor(public payload: Image) {
  }
}

export class DeleteImageAction {
  readonly type = DELETE_IMAGE;

  constructor(public payload: string) {
  }
}

export class DeleteImageSuccessAction {
  readonly type = DELETE_IMAGE_SUCCESS;

  constructor(public payload: string) {
  }
}

export class SelectImageAction {
  readonly type = SELECT_IMAGE;

  constructor(public payload: string) {
  }
}


export class NextImageAction {
  readonly type = NEXT_IMAGE;

  constructor() {
  }
}

export class PreviousImageAction {
  readonly type = PREVIOUS_IMAGE;

  constructor() {
  }
}

export type ImageActions = LoadAnnotationBatchImagesAction
  | MarkAnnotationCompleteAction
  | MarkAnnotationCompleteSuccesAction
  | LoadAnnotationBatchImagesSuccessAction
  | LoadImagesAction
  | LoadImagesSuccessAction
  | SaveImageAction
  | SaveImageSuccessAction
  | DeleteImageAction
  | DeleteImageSuccessAction
  | SelectImageAction
  | NextImageAction
  | PreviousImageAction;
