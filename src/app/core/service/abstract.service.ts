import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../modules/auth/service/auth.service';

@Injectable()
export class AbstractService {
  protected env;

  constructor(protected http: HttpClient, protected authService: AuthService) {
    this.env = environment;
  }

  getAuthHeaders(): HttpHeaders {
    const jwt = this.authService.getJWT();
    return new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
  }
}
