import {Project} from '../../model/project.model';

export interface ProjectState {
  projects: Project[];
  selectedProjectId: string;
}

export const initialProjectState: ProjectState = {
  projects: [],
  selectedProjectId: null
};
