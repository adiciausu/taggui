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

  save(image: Image): Observable<Image> {
    return this.http.post<Image>(this.env.apiHost + '/image', image);
  }

  delete(imageId: string): Observable<string> {
    return this.http.delete<string>(this.env.apiHost + '/image/' + imageId);
  }
}
