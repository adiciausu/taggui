import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Project} from '../../../modules/project/model/project.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getProjects} from '../../../modules/project/store/reducers/project.reducer';
import {LoadProjectsAction} from '../../../modules/project/store/actions/project.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[];
  projects$: Observable<Project[]>;
  availableProjects: SelectItem[];
  selectedProject: Project;

  constructor(private store: Store<any>) {
    this.projects$ = this.store.pipe(select(getProjects));
    this.menuItems = [
      {label: 'Annotate', routerLink: ['/']},
      {label: 'Classes', routerLink: ['/class/list']},
      {label: 'Images', routerLink: ['/image/list']},
      {label: 'Export', routerLink: ['/export']}
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadProjectsAction());
    this.projects$.pipe(
      map((projects: Project[]) => {
        const projectSelectItems: SelectItem[] = [];
        projects.forEach((project) => {
          projectSelectItems.push({label: project.name, value: project.id});
        });

        this.availableProjects = projectSelectItems;
        this.selectedProject = projects[0];
      })
    ).subscribe();
  }
}
