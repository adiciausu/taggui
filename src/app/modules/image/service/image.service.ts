import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Image} from '../models/image.model';

@Injectable()
export class ImageService {
  baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Image[]> {
    return this.http.get<Image[]>(this.baseURL + '/image/list');
  }

  save(image: Image): Observable<boolean> {
    return this.http.post<boolean>(this.baseURL + '/image', image);
  }

  find(imageId: number): Observable<Image> {
    return this.http.get<Image>(this.baseURL + '/image/' + imageId);
  }
}
