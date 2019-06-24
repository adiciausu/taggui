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
      const stateAfterSave = _.clone(state);
      const idx = stateAfterSave.projects.findIndex((prj: Project) => {
        return prj.id === action.payload.id;
      });

      if (idx !== -1) {
        stateAfterSave.projects[idx] = action.payload;
      } else {
        stateAfterSave.projects.push(action.payload);
      }

      return stateAfterSave;
    case DELETE_PROJECT_SUCCESS:
      let stateAfterDelete = _.clone(state);
      stateAfterDelete = stateAfterDelete.projects.filter((project) => {
        console.log(project.id, action.payload, project.id === action.payload);
        return project.id === action.payload;
      });

      return stateAfterDelete;
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
