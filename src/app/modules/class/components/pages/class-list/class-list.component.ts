import {Component, OnInit} from '@angular/core';
import {ClassService} from '../../../service/class.service';
import {Class} from '../../../models/class.model';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: Class[];

  constructor(private classService: ClassService) {
  }

  ngOnInit() {
    this.classService.findAll().subscribe(items => this.classes = items);
  }
}
