import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuItems: any[];

  constructor() {
    this.menuItems = [
      { label: 'Annotate', routerLink: ['/'] },
      { label: 'Classes', routerLink: ['/class/list'] },
      { label: 'Images', routerLink: ['/image/list'] },
      { label: 'Export', routerLink: ['/export'] }
    ];
  }
}
