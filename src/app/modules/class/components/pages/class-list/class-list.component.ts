import {Component, OnInit} from '@angular/core';
import {ClassService} from '../../../service/class.service';
import {Class, Shape} from '../../../models/class.model';
import {SelectItem} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes: Class[];
  isShowAddClassVisible = false;
  newClass: Class = {} as Class;
  availableShapes: SelectItem[];
  addClassForm: FormGroup;

  constructor(private classService: ClassService, private formBuilder: FormBuilder) {
    this.availableShapes = [
      {label: 'Rectangle', value: Shape.RECTANGLE},
      {label: 'Polygon (coming soon)', value: Shape.POLYGON}
    ];
  }

  ngOnInit() {
    this.classService.findAll().subscribe(items => this.classes = items);
    this.addClassForm = this.formBuilder.group({
      name: new FormControl(this.newClass.name, Validators.required),
      shape: new FormControl(this.newClass.shape, Validators.required),
      color: new FormControl(this.newClass.color, Validators.required)
    });
  }

  showAddClassDialog() {
    this.isShowAddClassVisible = true;
  }

  onSaveNewClass() {
    this.classService.save(this.addClassForm.value).subscribe(() => {
      this.classService.findAll().subscribe(items => this.classes = items);
      this.isShowAddClassVisible = false;
    });
  }

  onDelete(classId: number) {
    this.classService.delete(classId).subscribe(() => {
      this.classService.findAll().subscribe(items => this.classes = items);
    });
  }
}
