import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../models/user.model';
import {tap} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import * as jwtdecode from 'jwt-decode';

@Injectable()
export class AuthService {
  env = environment;
  TOKEN = 'JWT_TOKEN';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  login(user: User): Observable<string> {
    return this.http.post<string>(this.env.apiHost + '/auth/login', {
      email: user.email,
      password: user.password,
    }).pipe(tap(item => {
      this.setJWT(item);
    }));
  }

  setJWT(token: string): void {
    localStorage.setItem(this.TOKEN, token);
    this.cookieService.set('jwt', token);
  }

  isLogged() {
    return localStorage.getItem(this.TOKEN) != null;
  }

  getJWT(): string {
    return localStorage.getItem(this.TOKEN);
  }

  getDecodedJWT(): any {
    try {
      return jwtdecode(this.getJWT());
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
