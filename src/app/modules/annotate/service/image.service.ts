import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from '../../image/models/image.model';

@Injectable()
export class ImageService {
  findBach(): Observable<Image[]> {
    const img1: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201456.jpg',
      name: 'img-1.jpg',
      id: 1,
      width: 640,
      height: 480
    };

    const img2: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201508.jpg',
      name: 'img-2.jpg',
      id: 1,
      width: 640,
      height: 480
    };

    const img3: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201519.jpg',
      name: 'img-3.jpg',
      id: 1,
      width: 640,
      height: 480
    };

    const img4: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201527.jpg',
      name: 'img-4.jpg',
      id: 1,
      width: 640,
      height: 480
    };

    const img5: Image = {
      path: 'https://raw.githubusercontent.com/viorelspinu/object_detection_demo/master/data/images/train/20190503_201532.jpg',
      name: 'img-5.jpg',
      id: 1,
      width: 640,
      height: 480
    };

    return of([img1, img2, img3, img4, img5]);
  }
}
