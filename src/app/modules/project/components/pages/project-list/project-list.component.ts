import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Project} from '../../../model/project.model';
import {select, Store} from '@ngrx/store';
import {LoadProjectsAction} from '../../../store/actions/project.actions';
import {getProjects} from '../../../store/reducers/project.reducer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;
  isAddEditDialogVisible = false;
  addEditForm: FormGroup;
  newProject: Project = {} as Project;

  constructor(private formBuilder: FormBuilder, private store: Store<any>) {
    this.projects$ = this.store.pipe(select(getProjects));
  }

  ngOnInit() {
    this.store.dispatch(new LoadProjectsAction());
    this.addEditForm = this.formBuilder.group({
      id: new FormControl(this.newProject.id),
      name: new FormControl(this.newProject.name, Validators.required),
    });
  }

  showEditAddDialog(id: string) {
    this.isAddEditDialogVisible = true;
    if (id) {
      this.projects$.pipe(
        map(projects => {
          projects.forEach((item) => {
            if (item.id === id) {
              this.addEditForm.reset(item);
            }
          });
        })
      ).subscribe();
    }
  }

  onSave() {
    // this.projectService.save(this.addEditForm.value).subscribe(() => {
    //   this.projectService.findAll().subscribe(items => this.projects = items);
    //   this.isAddEditDialogVisible = false;
    //   this.addEditForm.reset({} as Project);
    // });
  }

  onDelete(id: number) {
    // this.projectService.delete(id).subscribe(() => {
    //   this.projectService.findAll().subscribe(items => this.projects = items);
    // });
  }
}
