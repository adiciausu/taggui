import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../../modules/auth/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = route['_routerState']['url'];

    if (this.authService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(this.router.createUrlTree(['/auth/login'], {queryParams: {redirectUrl}}));

    return false;
  }
}
