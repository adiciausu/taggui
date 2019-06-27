import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutLoggedComponent} from './components/layout-logged/layout-logged.component';
import {MenuLoggedComponent} from './components/menu-logged/menu-logged.component';
import {DropdownModule} from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';

@NgModule({
  declarations: [
    LayoutLoggedComponent,
    MenuLoggedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MenubarModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutLoggedComponent
  ],
  providers: []
})
export class SharedModule {
}
