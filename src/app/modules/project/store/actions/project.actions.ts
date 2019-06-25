import {Project} from '../../model/project.model';

export const LOAD_PROJECTS = '[Project] Load';
export const LOAD_PROJECTS_SUCCESS = '[Project] Load Success';
export const SAVE_PROJECT = '[Project] Save';
export const SAVE_PROJECT_SUCCESS = '[Project] Save Success';
export const DELETE_PROJECT = '[Project] Delete';
export const DELETE_PROJECT_SUCCESS = '[Project] Delete Success';
export const SELECT_PROJECT = '[Project] Select';


export class LoadProjectsAction {
  readonly type = LOAD_PROJECTS;
}

export class LoadProjectsSuccessAction {
  readonly type = LOAD_PROJECTS_SUCCESS;

  constructor(public payload: Project[]) {
  }
}

export class SaveProjectAction {
  readonly type = SAVE_PROJECT;

  constructor(public payload: Project) {
  }
}

export class SaveProjectSuccessAction {
  readonly type = SAVE_PROJECT_SUCCESS;

  constructor(public payload: Project) {
  }
}

export class DeleteProjectAction {
  readonly type = DELETE_PROJECT;

  constructor(public payload: string) {
  }
}

export class DeleteProjectSuccessAction {
  readonly type = DELETE_PROJECT_SUCCESS;

  constructor(public payload: string) {
  }
}

export class SelectProjectAction {
  readonly type = SELECT_PROJECT;

  constructor(public payload: string) {
  }
}

export type ProjectActions = LoadProjectsAction
  | LoadProjectsSuccessAction
  | SaveProjectAction
  | SaveProjectSuccessAction
  | DeleteProjectAction
  | DeleteProjectSuccessAction
  | SelectProjectAction;
