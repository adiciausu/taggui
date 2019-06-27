import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Project} from '../model/project.model';
import {AbstractService} from '../../../core/service/abstract.service';

@Injectable()
export class ProjectService extends AbstractService {
  findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.env.apiHost + '/project/list', {headers: this.getAuthHeaders()});
  }

  save(project: Project): Observable<Project> {
    return this.http.post<Project>(this.env.apiHost + '/project', project, {headers: this.getAuthHeaders()});
  }

  delete(id: string): Observable<string> {
    return this.http.delete<string>(this.env.apiHost + '/project/' + id, {headers: this.getAuthHeaders()});
  }
}
