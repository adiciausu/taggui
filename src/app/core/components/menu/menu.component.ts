import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Project} from '../../../modules/project/model/project.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {LoadProjectsAction, SelectProjectAction} from '../../../modules/project/store/actions/project.actions';
import {getProjects, getProjectsAsSelectOptions} from '../../../modules/project/store/selectors/project.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  projects$: Observable<Project[]>;
  availableProjectSelectOptions$: Observable<SelectItem[]>;
  menuItems: any[];

  constructor(private store: Store<any>) {
    this.projects$ = this.store.pipe(select(getProjects));
    this.availableProjectSelectOptions$ = this.store.pipe(select(getProjectsAsSelectOptions));

    this.menuItems = [
      {label: 'Annotate', routerLink: ['/']},
      {label: 'Classes', routerLink: ['/class/list']},
      {label: 'Images', routerLink: ['/image/list']},
      {label: 'Export', routerLink: ['/export']}
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadProjectsAction());
  }

  onSelectedProjectChange(event) {
    this.store.dispatch(new SelectProjectAction(event.value));
  }
}
