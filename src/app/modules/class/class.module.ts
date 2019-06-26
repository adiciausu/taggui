import {NgModule} from '@angular/core';
import {ClassListComponent} from './components/pages/class-list/class-list.component';
import {ClassRoutingModule} from './class-routing.module';
import {ClassService} from './service/class.service';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../../shared/shared.module';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    ClassListComponent,
  ],
  imports: [
    SharedModule,
    ClassRoutingModule,

    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ColorPickerModule,
    ConfirmDialogModule
  ],
  providers: [
    ClassService,
    ConfirmationService
  ]
})
export class ClassModule {
}
