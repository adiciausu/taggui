import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Project} from '../model/project.model';

@Injectable()
export class ProjectService {
  env = environment;

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.env.apiHost + '/project/list');
  }

  save(project: Project): Observable<boolean> {
    return this.http.post<boolean>(this.env.apiHost + '/project', project);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.env.apiHost + '/project/' + id);
  }
}
