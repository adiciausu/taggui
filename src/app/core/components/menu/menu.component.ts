import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Project} from '../../../modules/project/model/project.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getProjects, getProjectsAsSelectOptions} from '../../../modules/project/store/reducers/project.reducer';
import {LoadProjectsAction} from '../../../modules/project/store/actions/project.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  projects$: Observable<Project[]>;
  availableProjectSelectOptions$: Observable<SelectItem[]>;

  menuItems: any[];
  selectedProject: Project;

  constructor(private store: Store<any>) {
    this.projects$ = this.store.pipe(select(getProjects));
    this.availableProjectSelectOptions$ = this.store.pipe(select(getProjectsAsSelectOptions));
    this.projects$.subscribe(console.log);

    this.menuItems = [
      {label: 'Annotate', routerLink: ['/']},
      {label: 'Classes', routerLink: ['/class/list']},
      {label: 'Images', routerLink: ['/image/list']},
      {label: 'Export', routerLink: ['/export']}
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadProjectsAction());
    // this.selectedProject = projects[0];
  }
}
