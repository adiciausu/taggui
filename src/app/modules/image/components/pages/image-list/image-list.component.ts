import {Component, OnInit} from '@angular/core';
import {Image} from '../../../models/image.model';
import {environment} from '../../../../../../environments/environment';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {DeleteImageAction, LoadImagesAction} from '../../../store/actions/image.actions';
import {getImages} from '../../../store/selectors/image.selector';
import {getSelectedProjectId} from '../../../../project/store/selectors/project.selector';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  selectedProjectId$: Observable<string>;
  selectedProjectId: string;
  images$: Observable<Image[]>;
  env = environment;

  constructor(private store: Store<any>) {
    this.images$ = this.store.select(getImages);
    this.selectedProjectId$ = this.store.pipe(select(getSelectedProjectId));
  }

  ngOnInit() {
    this.selectedProjectId$.subscribe((item: string) => {
      this.selectedProjectId = item;

      if (this.selectedProjectId) {
        this.store.dispatch(new LoadImagesAction(this.selectedProjectId));
      }
    });
  }

  onUpload() {
    this.store.dispatch(new LoadImagesAction(this.selectedProjectId));
  }

  onDelete(imageId: string) {
    this.store.dispatch(new DeleteImageAction(imageId));
  }
}
