import {Injectable} from '@angular/core';
import {ImageAnnotations} from '../model/ImageAnnotations.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AnnotationService {
  baseURL = 'http://localhost:808';

  constructor(private http: HttpClient) {

  }

  save(imageAnnotations: ImageAnnotations) {
    this.http.post(this.baseURL + '/annotation', imageAnnotations);
  }

  find(imageId: number) {

  }
}
