import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Class, Shape} from '../models/class.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ClassService {
  baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Class[]> {
    // const class1: Class = {name: 'Apple', shape: Shape.RECTANGLE, id: 1, color: '#ff22cc'};
    // const class2: Class = {name: 'Avocado', shape: Shape.RECTANGLE, id: 2, color: '#00ff00'};
    // const class3: Class = {name: 'Nut', shape: Shape.RECTANGLE, id: 3, color: '#cc3322'};
    // const class4: Class = {name: 'Recipient', shape: Shape.RECTANGLE, id: 4, color: '#123456'};
    // const class5: Class = {name: 'Orange', shape: Shape.RECTANGLE, id: 4, color: '#ffff00'};
    //
    // return of([class1, class2, class3, class4, class5]);

    return this.http.get<Class[]>(this.baseURL + '/class/list');
  }

  save(clazz: Class): Observable<boolean> {
    return this.http.post<boolean>(this.baseURL + '/class', clazz);
  }
}
