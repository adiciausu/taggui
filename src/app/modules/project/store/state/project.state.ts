import {Project} from '../../model/project.model';

export interface ProjectState {
  projects: Project[];
}

export const initialProjectState: ProjectState = {
  projects: [],
};
