import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Project} from '../../../modules/project/model/project.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {LoadProjectsAction, SelectProjectAction} from '../../../modules/project/store/actions/project.actions';
import {
  getProjects,
  getProjectsAsSelectOptions,
  getSelectedProjectId
} from '../../../modules/project/store/selectors/project.selector';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-logged',
  templateUrl: './menu-logged.component.html',
  styleUrls: ['./menu-logged.component.css']
})
export class MenuLoggedComponent implements OnInit {
  projects$: Observable<Project[]>;
  availableProjectSelectOptions$: Observable<SelectItem[]>;
  selectedProjectId$: Observable<string>;
  selectedProjectId: string;
  menuItems: any[];

  constructor(private store: Store<any>, private router: Router) {
    this.projects$ = this.store.pipe(select(getProjects));
    this.availableProjectSelectOptions$ = this.store.pipe(select(getProjectsAsSelectOptions));
    this.selectedProjectId$ = this.store.pipe(select(getSelectedProjectId));

    this.menuItems = [
      {label: 'Annotate', routerLink: ['/']},
      {label: 'Classes', routerLink: ['/class/list']},
      {label: 'Images', routerLink: ['/image/list']},
      {label: 'Export', routerLink: ['/export']}
    ];
  }

  ngOnInit(): void {
    this.selectedProjectId$.subscribe((item) => {
      this.selectedProjectId = item;
    });
    this.store.dispatch(new LoadProjectsAction());
  }

  onSelectedProjectChange(event) {
    this.store.dispatch(new SelectProjectAction(event.value));
  }

  onLogout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
