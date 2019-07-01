import {Image} from '../../models/image.model';

export const LOAD_IMAGES = '[Image] Load';
export const LOAD_IMAGES_SUCCESS = '[Image] Load Success';
export const SAVE_IMAGES = '[Image] Save';
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

export type ImageActions = LoadImagesAction
  | LoadImagesSuccessAction
  | SaveImageAction
  | SaveImageSuccessAction
  | DeleteImageAction
  | DeleteImageSuccessAction
  | SelectImageAction
  | NextImageAction
  | PreviousImageAction;
