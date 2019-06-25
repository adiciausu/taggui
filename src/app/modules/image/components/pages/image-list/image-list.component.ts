import {Component, OnInit} from '@angular/core';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../service/image.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: Image[];
  env = environment;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.imageService.findAll().subscribe(items => this.images = items);
  }

  onUpload() {
    this.imageService.findAll().subscribe(items => this.images = items);
  }

  onDelete(imageId: string) {
    this.imageService.delete(imageId).subscribe(() => {
      this.imageService.findAll().subscribe(items => this.images = items);
    });
  }
}
