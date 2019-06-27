import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {User} from '../models/user.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
  env = environment;
  TOKEN = 'LOGGED_USER';

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.env.apiHost + '/auth/login', {
      email: user.email,
      password: user.password,
    }).pipe(tap(item => {
      console.log('dsad');
      this.setLoggedInUser(item);
    }));
  }

  setLoggedInUser(user: User): void {
    localStorage.setItem(this.TOKEN, JSON.stringify(user));
  }

  isLogged() {
    return localStorage.getItem(this.TOKEN) != null;
  }
}
