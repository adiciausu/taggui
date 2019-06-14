import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Class, Shape} from '../models/class.model';


@Injectable()
export class ClassService {
  findAll(): Observable<Class[]> {
    const class1: Class = {name: 'Apple', shape: Shape.RECTANGLE, id: 1, color: '#ff22cc'};
    const class2: Class = {name: 'Car', shape: Shape.RECTANGLE, id: 2, color: '#00ff00'};
    const class3: Class = {name: 'Bike', shape: Shape.RECTANGLE, id: 3, color: '#cc3322'};
    const class4: Class = {name: 'Human', shape: Shape.RECTANGLE, id: 4, color: '#123456'};

    return of([class1, class2, class3, class4]);
  }
}
