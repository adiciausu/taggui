import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getSelectedProjectId} from '../../../../project/store/selectors/project.selector';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  selectedProjectId$: Observable<string>;

  constructor(private store: Store<any>) {
    this.selectedProjectId$ = this.store.pipe(select(getSelectedProjectId));
  }

  ngOnInit() {
  }
}
