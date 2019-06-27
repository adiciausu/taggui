import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {LoginPageComponent} from './components/pages/login/login .component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthService} from './service/auth.service';

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
