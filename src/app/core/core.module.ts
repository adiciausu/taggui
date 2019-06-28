import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenubarModule} from 'primeng/menubar';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProjectService} from '../modules/project/service/project.service';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {projectReducer} from '../modules/project/store/reducers/project.reducer';
import {ProjectEffects} from '../modules/project/store/effects/project.effects';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from '../modules/auth/service/auth.service';
import {JwtInterceptor} from "../modules/auth/models/jwt.interceptor";
import {CookieService} from "ngx-cookie-service";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    FormsModule,

    EffectsModule.forFeature([
      ProjectEffects
    ]),
    StoreModule.forFeature('projects', projectReducer),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    ProjectService,
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    CookieService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
