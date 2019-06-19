import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Class, Shape} from '../models/class.model';
import {HttpClient} from "@angular/common/http";
import {Image} from "../../image/models/image.model";

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
}
