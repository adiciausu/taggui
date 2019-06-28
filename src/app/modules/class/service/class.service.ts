import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Class} from '../models/class.model';
import {AbstractService} from '../../../core/service/abstract.service';
import {HttpParams} from "@angular/common/http";

@Injectable()
export class ClassService extends AbstractService {
  baseURL = 'http://localhost:8080';

  findAll(projectId: string): Observable<Class[]> {
    let params = new HttpParams();
    params = params.append('projectId', projectId);

    return this.http.get<Class[]>(this.baseURL + '/class/list', {params});
  }

  save(clazz: Class): Observable<Class> {
    return this.http.post<Class>(this.baseURL + '/class', clazz,);
  }

  delete(classId: string): Observable<string> {
    return this.http.delete<string>(this.baseURL + '/class/' + classId,);
  }
}
