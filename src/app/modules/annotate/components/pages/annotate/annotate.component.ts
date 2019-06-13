import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../../../class/service/class.service';
import { Class } from '../../../../class/models/class.model';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  classes: Class[];
  selectedClass: Class;
  images: any[];
  selectedImage: string;

  constructor(private classService: ClassService) {
  }

  ngOnInit() {
    this.classService.findAll().subscribe(items => {
      this.classes = items;
      this.selectedClass = items[0];
    });

    this.images = [{ name: "img1.png" }, { name: "img2.png" }, { name: "img3.png" }, { name: "img4.png" }, { name: "img5.png" }, { name: "img6.png" }, { name: "img7.png" }, { name: "img8.png" }, { name: "img9.png" }];
    this.selectedImage = this.images[0];
  }
}
