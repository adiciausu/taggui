import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectState} from '../state/project.state';
import {Project} from '../../model/project.model';
import {SelectItem} from 'primeng/api';

export const getProjectsState = createFeatureSelector<ProjectState>('projects');
export const getProjects = createSelector(getProjectsState, (state: ProjectState) => {
  return state.projects;
});
export const getSelectedProject = createSelector(getProjectsState, (state: ProjectState) => {
  return state.selectedProjectId;
});
export const getProjectsAsSelectOptions = createSelector(getProjects, (projects: Project[]) => {
  const projectSelectItems: SelectItem[] = [];
  projects.forEach((project) => {
    projectSelectItems.push({label: project.name, value: project.id});
  });

  return projectSelectItems;
});
