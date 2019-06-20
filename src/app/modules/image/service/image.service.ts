import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Image} from '../models/image.model';
import {environment} from '../../../../environments/environment';

@Injectable()
export class ImageService {
  env = environment;

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Image[]> {
    return this.http.get<Image[]>(this.env.apiHost + '/image/list');
  }

  save(image: Image): Observable<boolean> {
    return this.http.post<boolean>(this.env.apiHost + '/image', image);
  }

  delete(imageId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.env.apiHost + '/image/' + imageId);
  }
}
