import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../../service/project.service';
import {Project} from '../../../model/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  isAddEditDialogVisible = false;
  addEditForm: FormGroup;
  newProject: Project = {} as Project;

  constructor(private projectService: ProjectService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.projectService.findAll().subscribe(items => this.projects = items);
    this.addEditForm = this.formBuilder.group({
      id: new FormControl(this.newProject.id),
      name: new FormControl(this.newProject.name, Validators.required),
    });
  }

  showEditAddDialog(id: string) {
    this.isAddEditDialogVisible = true;
    if (id) {
      const editedItem: Project = this.projects.find((item) => item.id === id);
      this.addEditForm.reset(editedItem);
    }
  }

  onSave() {
    this.projectService.save(this.addEditForm.value).subscribe(() => {
      this.projectService.findAll().subscribe(items => this.projects = items);
      this.isAddEditDialogVisible = false;
      this.addEditForm.reset({} as Project);
    });
  }

  onDelete(id: number) {
    this.projectService.delete(id).subscribe(() => {
      this.projectService.findAll().subscribe(items => this.projects = items);
    });
  }
}
