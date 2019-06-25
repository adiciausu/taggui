import {Component, OnInit} from '@angular/core';
import {Class, Shape} from '../../../models/class.model';
import {SelectItem} from 'primeng/api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {DeleteClassAction, LoadClassesAction, SaveClassAction} from '../../../store/actions/class.actions';
import {Observable} from 'rxjs';
import {getClasses} from '../../../store/selectors/class.selector';
import {getSelectedProjectId} from '../../../../project/store/selectors/project.selector';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {
  classes$: Observable<Class[]>;
  classes: Class[];
  selectedProjectId$: Observable<string>;
  selectedProjectId: string;
  isShowAddClassVisible = false;
  availableShapes: SelectItem[];
  addEditClassForm: FormGroup;
  isEdit = false;
  private defaultShape = Shape.RECTANGLE;
  private defaultColor = '#FF0000';
  newClass: Class = {shape: this.defaultShape, color: this.defaultColor} as Class;

  constructor(private store: Store<any>, private formBuilder: FormBuilder) {
    this.classes$ = this.store.pipe(select(getClasses));
    this.selectedProjectId$ = this.store.pipe(select(getSelectedProjectId));
    this.availableShapes = [
      {label: 'Rectangle', value: Shape.RECTANGLE},
      {label: 'Point (coming soon)', value: Shape.POINT},
      {label: 'Polygon (coming soon)', value: Shape.POLYGON}
    ];
  }

  ngOnInit() {
    this.classes$.subscribe((items: Class[]) => {
      this.classes = items;
    });
    this.selectedProjectId$.subscribe((item: string) => {
      this.selectedProjectId = item;
      if (!this.selectedProjectId) {
        return;
      }

      this.newClass.projectId = this.selectedProjectId;
      this.store.dispatch(new LoadClassesAction(this.selectedProjectId));
    });

    this.addEditClassForm = this.formBuilder.group({
      id: new FormControl(this.newClass.id),
      name: new FormControl(this.newClass.name, Validators.required),
      shape: new FormControl(this.newClass.shape, Validators.required),
      color: new FormControl(this.newClass.color, Validators.required),
      projectId: new FormControl(this.newClass.projectId, Validators.required)
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
    this.store.dispatch(new SaveClassAction(this.addEditClassForm.value));
    this.isShowAddClassVisible = false;
    this.addEditClassForm.reset({shape: this.defaultShape, color: this.defaultColor, projectId: this.selectedProjectId} as Class);
  }

  onDelete(classId: string) {
    this.store.dispatch(new DeleteClassAction(classId));
  }
}
