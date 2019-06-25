import {Component, OnInit} from '@angular/core';
import {Image} from '../../../models/image.model';
import {environment} from '../../../../../../environments/environment';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {DeleteImageAction, LoadImagesAction} from '../../../store/actions/image.actions';
import {getImages} from '../../../store/selectors/image.selector';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images$: Observable<Image[]>;
  env = environment;

  constructor(private store: Store<any>) {
    this.images$ = this.store.select(getImages)
  }

  ngOnInit() {
    this.store.dispatch(new LoadImagesAction());
  }

  onUpload() {
    this.store.dispatch(new LoadImagesAction());
  }

  onDelete(imageId: string) {
    this.store.dispatch(new DeleteImageAction(imageId));
  }
}
