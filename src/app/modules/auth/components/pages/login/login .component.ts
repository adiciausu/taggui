import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent {
  user: User = {} as User;

  constructor(private authService: AuthService, private router: Router) {
  }

  tryLogin() {
    this.authService.login(this.user).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
