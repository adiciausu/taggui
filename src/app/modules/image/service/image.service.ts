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
    const img1: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201456.jpg',
      name: 'img-1.jpg',
      id: '5d090a12bb30bf1fc3d30a98',
      width: 640,
      height: 480,
      annotations: {}
    };

    const img2: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201508.jpg',
      name: 'img-2.jpg',
      id: '5d090a12bb30bf1fc3d30a99',
      width: 640,
      height: 480,
      annotations: {}
    };

    const img3: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201519.jpg',
      name: 'img-3.jpg',
      id: '5d090a12bb30bf1fc3d30199',
      width: 640,
      height: 480,
      annotations: {}
    };

    const img4: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201527.jpg',
      name: 'img-4.jpg',
      id: '5d090a12bb30cf1fc3d30a99',
      width: 640,
      height: 480,
      annotations: {}
    };

    const img5: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201532.jpg',
      name: 'img-5.jpg',
      id: '5d090a12bb30bf1fd3d30a99',
      width: 640,
      height: 480,
      annotations: {}
    };

    return of([img1, img2, img3, img4, img5]);
  }

  save(image: Image): Observable<boolean> {
    return this.http.post<boolean>(this.baseURL + '/image', image);
  }

  find(imageId: number): Observable<Image> {
    return this.http.get<Image>(this.baseURL + '/image/' + imageId);
  }
}
