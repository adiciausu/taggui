import {DELETE_PROJECT_SUCCESS, LOAD_PROJECTS_SUCCESS, ProjectActions, SAVE_PROJECT_SUCCESS} from '../actions/project.actions';
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
      const projectListStateAfterSave = _.clone(state.projects);
      const idx = projectListStateAfterSave.findIndex((prj: Project) => {
        return prj.id === action.payload.id;
      });

      if (idx !== -1) {
        projectListStateAfterSave[idx] = action.payload;
      } else {
        projectListStateAfterSave.push(action.payload);
      }

      return {
        ...state,
        projects: projectListStateAfterSave
      };

    case DELETE_PROJECT_SUCCESS:
      let projectListAfterDelete = _.clone(state.projects);
      projectListAfterDelete = projectListAfterDelete.filter((project) => {

        return project.id !== action.payload;
      });

      return {
        ...state,
        projects: projectListAfterDelete
      };

    default:
      return state;
  }
}

export const getProjectsState = createFeatureSelector<ProjectState>('projects');
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
