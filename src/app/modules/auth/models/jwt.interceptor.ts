import {Injectable, Injector} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../service/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('itenrcept');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getJWT())
    });

    return next.handle(authReq);
  }
}
