import {LOAD_PROJECTS_SUCCESS, ProjectActions, SAVE_PROJECT_SUCCESS} from '../actions/project.actions';
import {Project} from '../../model/project.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SelectItem} from 'primeng/api';
import * as _ from 'lodash';

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
    case SAVE_PROJECT_SUCCESS:
      const newState = _.clone(state);
      const idx = newState.projects.findIndex((prj: Project) => {
        return prj.id === action.payload.id;
      });

      if (idx !== -1) {
        newState.projects[idx] = action.payload;
      } else {
        newState.projects.push(action.payload);
      }

      return newState;
    default:
      return state;
  }
}

export const getProjectsState = createFeatureSelector<Project[]>('projects');
export const getProjects = createSelector(getProjectsState, (state: ProjectState) => {
  return state.projects;
});
export const getProjectsAsSelectOptions = createSelector(getProjects, (projects: Project[]) => {
  const projectSelectItems: SelectItem[] = [];
  projects.forEach((project) => {
    projectSelectItems.push({label: project.name, value: project.id});
  });

  return projectSelectItems;
});
