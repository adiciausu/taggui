import {Injectable} from '@angular/core';
import {ImageAnnotations} from '../model/ImageAnnotations.model';

@Injectable()
export class AnnotationService {
  save(annotations: ImageAnnotations) {
    console.log(annotations);
  }

  find(imageId: number) {

  }
}
