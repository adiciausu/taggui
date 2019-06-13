import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    // core
    CoreModule,

    // app
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

