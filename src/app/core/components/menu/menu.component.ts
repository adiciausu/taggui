import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../modules/project/service/project.service';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[];
  availableProjects: SelectItem[];

  constructor(private projectService: ProjectService) {
    this.menuItems = [
      {label: 'Annotate', routerLink: ['/']},
      {label: 'Classes', routerLink: ['/class/list']},
      {label: 'Images', routerLink: ['/image/list']},
      {label: 'Export', routerLink: ['/export']}
    ];
  }

  ngOnInit(): void {
    this.projectService.findAll().subscribe((projects) => {
      const projectSelectItems: SelectItem[] = [];
      projects.forEach((project) => {

        projectSelectItems.push({label: project.name, value: project.id});
      });

      this.availableProjects = projectSelectItems;
    });
  }
}
