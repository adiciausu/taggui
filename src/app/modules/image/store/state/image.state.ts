import {Image} from '../../models/image.model';

export interface ImageState {
  images: Image[];
  selectedImage: Image;
  selectedImageIndex: number;
}

export const initialImageState: ImageState = {
  images: [],
  selectedImage: null,
  selectedImageIndex: null
};
