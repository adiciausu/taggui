import { NgModule } from '@angular/core';
import {HomeComponent} from './components/pages/home/home.component';
import {HomeRoutingModule} from './home-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HomeRoutingModule
  ]
})
export class HomeModule {
}
