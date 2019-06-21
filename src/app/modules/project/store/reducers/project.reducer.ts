import {LOAD_PROJECTS_SUCCESS, ProjectActions} from '../actions/project.actions';
import {Project} from '../../model/project.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface ProjectState {
  projects: Project[];
}

export const initialState: ProjectState = {
  projects: [],
};

export function projectReducer(state: ProjectState = initialState, action: ProjectActions): ProjectState {
  switch (action.type) {
    case LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload
      };
    default:
      return state;
  }
}

export const getProjectsState = createFeatureSelector<Project[]>('projects');
export const getProjects = createSelector(getProjectsState, (state: ProjectState) => {
  return state.projects;
});
