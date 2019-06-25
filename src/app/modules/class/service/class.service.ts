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

  save(clazz: Class): Observable<Class> {
    return this.http.post<Class>(this.baseURL + '/class', clazz);
  }

  delete(classId: string): Observable<string> {
    return this.http.delete<string>(this.baseURL + '/class/' + classId);
  }
}
