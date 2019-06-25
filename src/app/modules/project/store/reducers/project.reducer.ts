import {DELETE_PROJECT_SUCCESS, LOAD_PROJECTS_SUCCESS, ProjectActions, SAVE_PROJECT_SUCCESS} from '../actions/project.actions';
import {Project} from '../../model/project.model';
import * as _ from 'lodash';
import {initialProjectState, ProjectState} from '../state/project.state';


export function projectReducer(state: ProjectState = initialProjectState, action: ProjectActions): ProjectState {
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
