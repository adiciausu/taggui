import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Image, ImageStatus} from '../models/image.model';
import {AbstractService} from '../../../core/service/abstract.service';

@Injectable()
export class ImageService extends AbstractService {
  findAll(projectId: string): Observable<Image[]> {
    let params = new HttpParams();
    params = params.set('projectId', projectId);

    return this.http.get<Image[]>(this.env.apiHost + '/image/list', {params});
  }

  findBatch(projectId: string): Observable<Image[]> {
    let params = new HttpParams();
    params = params.set('projectId', projectId);

    return this.http.get<Image[]>(this.env.apiHost + '/image/batch', {params});
  }

  save(image: Image): Observable<Image> {
    return this.http.post<Image>(this.env.apiHost + '/image', image);
  }

  delete(imageId: string): Observable<string> {
    return this.http.delete<string>(this.env.apiHost + '/image/' + imageId,);
  }

  markAnnotationComplete(image: Image, userId: string) {
    image.status = ImageStatus.FINISHED;

    return this.save(image);
  }
}
