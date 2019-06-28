import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoginPageComponent} from './components/pages/login/login .component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './service/auth.service';
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  providers: [
  ]
})
export class AuthModule {
}
