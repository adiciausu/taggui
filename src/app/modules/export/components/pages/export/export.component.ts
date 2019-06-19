import {Component, OnInit} from '@angular/core';
import {ImageService} from "../../../../image/service/image.service";
import {Image} from "../../../../image/models/image.model";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  jsonContent: string;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.imageService.findAll().subscribe((images: Image[]) => {
      this.jsonContent = JSON.stringify(images, null, 2);
    })
  }
}
