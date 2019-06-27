import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './components/pages/login/login .component';

const routes: Routes = [{
  path: 'login',
  component: LoginPageComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class AuthRoutingModule {
}
