import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ImageState} from '../state/image.state';
import {Image, ImageStatus} from '../../models/image.model';

export const getImagesState = createFeatureSelector<ImageState>('images');
export const getImages = createSelector(getImagesState, (state: ImageState) => {
  return state.images;
});
export const getImageBatchForAnnotating = createSelector(getImagesState, (state: ImageState, props) => {
  return state.images.filter((image: Image) => image.processorUserId === props.userId && ImageStatus[image.status] === ImageStatus.PROCESSING);
});
export const getSelectedImage = createSelector(getImagesState, (state: ImageState) => {
  return state.selectedImage;
});

export const getSelectedImageIndex = createSelector(getImagesState, (state: ImageState) => {
  return state.selectedImageIndex;
});
