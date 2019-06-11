import {NgModule} from '@angular/core';
import {HomeComponent} from './components/pages/home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {CanvasD3Module} from '../canvas-d3/canvas-d3.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,

    CanvasD3Module
  ]
})
export class HomeModule {
}
