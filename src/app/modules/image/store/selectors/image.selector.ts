import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ImageState} from '../state/image.state';

export const getImagesState = createFeatureSelector<ImageState>('images');
export const getImages = createSelector(getImagesState, (state: ImageState) => {
  return state.images;
});
export const getSelectedImage = createSelector(getImagesState, (state: ImageState) => {
  return state.selectedImage;
});

export const getSelectedImageIndex = createSelector(getImagesState, (state: ImageState) => {
  return state.selectedImageIndex;
});
