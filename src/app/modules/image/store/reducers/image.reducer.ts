import * as _ from 'lodash';
import {Image} from '../../models/image.model';
import {
  DELETE_IMAGE_SUCCESS,
  ImageActions,
  LOAD_IMAGES_SUCCESS,
  NEXT_IMAGE,
  PREVIOUS_IMAGE,
  SAVE_IMAGE_SUCCESS,
  SELECT_IMAGE
} from '../actions/image.actions';
import {ImageState, initialImageState} from '../state/image.state';


export function imageReducer(state: ImageState = initialImageState, action: ImageActions): ImageState {
  switch (action.type) {
    case LOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload,
        selectedImage: action.payload[0] ? action.payload[0] : null,
        selectedImageIndex: action.payload[0] ? 0 : null
      };

    case SAVE_IMAGE_SUCCESS:
      const imageListStateAfterSave = _.clone(state.images);
      const idx = imageListStateAfterSave.findIndex((image: Image) => {
        return image.id === action.payload.id;
      });

      if (idx !== -1) {
        imageListStateAfterSave[idx] = action.payload;
      } else {
        imageListStateAfterSave.push(action.payload);
      }

      return {
        ...state,
        images: imageListStateAfterSave
      };

    case DELETE_IMAGE_SUCCESS:
      let imageListAfterDelete = _.clone(state.images);
      imageListAfterDelete = imageListAfterDelete.filter((image) => {

        return image.id !== action.payload;
      });

      return {
        ...state,
        images: imageListAfterDelete
      };

    case SELECT_IMAGE:
      const imgIndex = state.images.findIndex((image) => image.id === action.payload);
      return {
        ...state,
        selectedImage: state.images[imgIndex],
        selectedImageIndex: imgIndex,
      };

    case NEXT_IMAGE:
      if (!state.images[state.selectedImageIndex++]) {
        return state;
      }
      return {
        ...state,
        selectedImage: state.images[state.selectedImageIndex++],
        selectedImageIndex: state.selectedImageIndex++,
      };

    case PREVIOUS_IMAGE:
      if (!state.images[state.selectedImageIndex--]) {
        return state;
      }
      return {
        ...state,
        selectedImage: state.images[state.selectedImageIndex--],
        selectedImageIndex: state.selectedImageIndex--,
      };


    default:
      return state;
  }
}
