import {Project} from '../../model/project.model';

export const LOAD_PROJECTS = '[Project] Load Projects';
export const LOAD_PROJECTS_SUCCESS = '[Project] Load Projects Success';


export class LoadProjectsAction {
  readonly type = LOAD_PROJECTS;
}

export class LoadProjectsSuccessAction {
  readonly type = LOAD_PROJECTS_SUCCESS;

  constructor(public payload: Project[]) {
  }
}

export type ProjectActions = LoadProjectsAction | LoadProjectsSuccessAction;
