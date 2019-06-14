import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenuComponent} from './components/menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    MenubarModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
