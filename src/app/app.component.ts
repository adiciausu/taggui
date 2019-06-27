import {Component} from '@angular/core';
import {AuthService} from './modules/auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged = false;

  constructor(private authService: AuthService) {
    this.isLogged = this.authService.isLogged();
  }
}
