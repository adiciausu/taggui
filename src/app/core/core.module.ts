import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenuComponent} from './components/menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import {HttpClientModule} from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import {ProjectService} from '../modules/project/service/project.service';
import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {projectReducer} from '../modules/project/store/reducers/project.reducer';
import {ProjectEffects} from '../modules/project/store/effects/project.effects';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    SharedModule,
    MenubarModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,

    EffectsModule.forFeature([
      ProjectEffects
    ]),
    StoreModule.forFeature('projects', projectReducer),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  providers: [
    ProjectService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
