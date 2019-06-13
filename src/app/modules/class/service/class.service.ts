import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Class, Shape} from '../models/class.model';

@Injectable()
export class ClassService {
  findAll(): Observable<Class[]> {
    const class1: Class = {name: 'Apple', shape: Shape.RECTANGLE, id: 1, color: '#ff22cc'};
    const class2: Class = {name: 'Nut', shape: Shape.RECTANGLE, id: 2, color: '#00ff00'};

    return of([class1, class2]);
  }
}
