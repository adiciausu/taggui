import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ClassState} from '../state/class.state';

export const getClassState = createFeatureSelector<ClassState>('classes');
export const getClasses = createSelector(getClassState, (state: ClassState) => {
  return state.classes;
});
