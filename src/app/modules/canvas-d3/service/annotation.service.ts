import {Injectable} from '@angular/core';
import {ImageAnnotations} from '../model/ImageAnnotations.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AnnotationService {
  baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {

  }

  save(imageAnnotations: ImageAnnotations): Observable {
    console.log(imageAnnotations);
    return this.http.post(this.baseURL + '/annotation', imageAnnotations);
  }

  find(imageId: number) {

  }
}
