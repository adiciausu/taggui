import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoginPageComponent} from './components/pages/login/login .component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './service/auth.service';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./models/jwt.interceptor";

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
