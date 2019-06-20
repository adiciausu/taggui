import {Component, OnInit} from '@angular/core';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../service/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  images: Image[];

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.imageService.findAll().subscribe(items => this.images = items);
  }

  onUpload(event) {
    this.imageService.findAll().subscribe(items => this.images = items);
  }
}
