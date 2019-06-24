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
  availableShapes: SelectItem[];
  addEditClassForm: FormGroup;
  private defaultShape = Shape.RECTANGLE;
  private defaultColor = '#FF0000';
  newClass: Class = {shape: this.defaultShape, color: this.defaultColor} as Class;
  isEdit = false;

  constructor(private classService: ClassService, private formBuilder: FormBuilder) {
    this.availableShapes = [
      {label: 'Rectangle', value: Shape.RECTANGLE},
      {label: 'Point (coming soon)', value: Shape.POINT},
      {label: 'Polygon (coming soon)', value: Shape.POLYGON}
    ];
  }

  ngOnInit() {
    this.classService.findAll().subscribe(items => this.classes = items);
    this.addEditClassForm = this.formBuilder.group({
      id: new FormControl(this.newClass.id),
      name: new FormControl(this.newClass.name, Validators.required),
      shape: new FormControl(this.newClass.shape, Validators.required),
      color: new FormControl(this.newClass.color, Validators.required)
    });
  }

  showEditAddClassDialog(classId: string) {
    this.isShowAddClassVisible = true;
    if (classId) {
      this.isEdit = true;
      const editedClass: Class = this.classes.find((item) => item.id === classId);
      this.addEditClassForm.reset(editedClass);
    } else {
      this.isEdit = false;
    }
  }

  onSaveNewClass() {
    this.classService.save(this.addEditClassForm.value).subscribe(() => {
      this.classService.findAll().subscribe(items => this.classes = items);
      this.isShowAddClassVisible = false;
      this.addEditClassForm.reset({shape: this.defaultShape, color: this.defaultColor} as Class);
    });
  }

  onDelete(classId: number) {
    this.classService.delete(classId).subscribe(() => {
      this.classService.findAll().subscribe(items => this.classes = items);
    });
  }
}
