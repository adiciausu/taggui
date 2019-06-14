import {Annotation} from './Annotation.model';

export interface ImageAnnotations {
  imageId: number;
  annotations: { [className: string]: Annotation[] };
}
