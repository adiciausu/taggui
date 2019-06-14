import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Image} from '../../image/models/image.model';

@Injectable()
export class ImageService {
  findBach(): Observable<Image[]> {
    const img1: Image = {
      path: 'https://dz5vhvq2e26ss.cloudfront.net/media/image/7595667854e9da321.01809399.jpg',
      name: 'cars.jpg',
      id: 1,
      width: 800,
      height: 468
    };

    const img2: Image = {
      path: 'https://petapixel.com/assets/uploads/2016/10/Los-Angeles-International-25L-and-25R-Wake-Turbulence-800x450.jpg',
      name: 'planes.PNG',
      id: 1,
      width: 800,
      height: 450
    };

    const img3: Image = {
      path: 'https://cdn1.harryanddavid.com/wcsstore/HarryAndDavid/images/catalog/18_26862_30XP_01ex.jpg',
      name: 'fruites.jpg',
      id: 1,
      width: 690,
      height: 775
    };

    return of([img1, img2, img3]);
  }
}
