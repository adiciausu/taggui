import {Class} from '../../models/class.model';

export const LOAD_CLASSES = '[Class] Load';
export const LOAD_CLASSES_SUCCESS = '[Class] Load Success';
export const SAVE_CLASS = '[Class] Save';
export const SAVE_CLASS_SUCCESS = '[Class] Save Success';
export const DELETE_CLASS = '[Class] Delete';
export const DELETE_CLASS_SUCCESS = '[Class] Delete Success';

export class LoadClassesAction {
  readonly type = LOAD_CLASSES;
    constructor(public payload: string) {
  }
}

export class LoadClassesSuccessAction {
  readonly type = LOAD_CLASSES_SUCCESS;

  constructor(public payload: Class[]) {
  }
}

export class SaveClassAction {
  readonly type = SAVE_CLASS;

  constructor(public payload: Class) {
  }
}

export class SaveClassSuccessAction {
  readonly type = SAVE_CLASS_SUCCESS;

  constructor(public payload: Class) {
  }
}

export class DeleteClassAction {
  readonly type = DELETE_CLASS;

  constructor(public payload: string) {
  }
}

export class DeleteClassSuccessAction {
  readonly type = DELETE_CLASS_SUCCESS;

  constructor(public payload: string) {
  }
}

export type ClassActions = LoadClassesAction
  | LoadClassesSuccessAction
  | SaveClassAction
  | SaveClassSuccessAction
  | DeleteClassAction
  | DeleteClassSuccessAction;
