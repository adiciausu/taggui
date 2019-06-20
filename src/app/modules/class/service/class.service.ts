import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Class} from '../models/class.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ClassService {
  baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Class[]> {
    return this.http.get<Class[]>(this.baseURL + '/class/list');
  }

  save(clazz: Class): Observable<boolean> {
    return this.http.post<boolean>(this.baseURL + '/class', clazz);
  }

  delete(classId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + '/class/' + classId);
  }
}
