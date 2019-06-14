import {Component, OnInit} from '@angular/core';
import {ClassService} from '../../../service/class.service';
import {Image} from '../../../models/image.model';
import {ImageService} from '../../../../annotate/service/image.service';

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
    this.imageService.findBach().subscribe(items => this.images = items);
  }
}
