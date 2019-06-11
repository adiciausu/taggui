import {NgModule, Optional, SkipSelf} from '@angular/core';
import {throwIfAlreadyLoaded} from './guards/module-import.guard';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [],
  exports: [HeaderComponent, FooterComponent],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
