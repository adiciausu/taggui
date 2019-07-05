import {
  DELETE_PROJECT_SUCCESS,
  LOAD_PROJECTS_SUCCESS,
  ProjectActions,
  SAVE_PROJECT_SUCCESS,
  SELECT_PROJECT
} from '../actions/project.actions';
import {Project} from '../../model/project.model';
import * as _ from 'lodash';
import {initialProjectState, ProjectState} from '../state/project.state';


export function projectReducer(state: ProjectState = initialProjectState, action: ProjectActions): ProjectState {
  switch (action.type) {
    case LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        selectedProjectId: state.selectedProjectId || (action.payload[0] ? action.payload[0].id : null) || null
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

      let newSelectedProjectId = state.selectedProjectId;
      if (action.payload === state.selectedProjectId) {
        if (projectListAfterDelete.length) {
          newSelectedProjectId = projectListAfterDelete[0].id;
        } else {
          newSelectedProjectId = null;
        }
      }

      return {
        ...state,
        projects: projectListAfterDelete,
        selectedProjectId: newSelectedProjectId
      };
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload
      };

    default:
      return state;
  }
}
