
import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import { ClassService } from '../../../../class/service/class.service';
import { Class } from '../../../../class/models/class.model';
import {CanvasD3Component} from '../../../../canvas-d3/components/canvas-d3/canvas-d3.component';

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
  hotkeysDialogVisible: boolean;
  hintMessage: string;

  @ViewChild(CanvasD3Component, {static: false}) canvasd3Component: CanvasD3Component;

  constructor(private classService: ClassService) {
  }

  ngOnInit() {
    this.classService.findAll().subscribe(items => {
      this.classes = items;
      this.selectedClass = items[0];
    });

    this.images = [{ name: 'img1.png' }, { name: 'img2.png' }, { name: 'img3.png' }, { name: 'img4.png' }, { name: 'img5.png' },
      { name: 'img6.png' }, { name: 'img7.png' }, { name: 'img8.png' }, { name: 'img9.png' }];
    this.selectedImage = this.images[0];
  }

  onConfigureImagesHotkeys() {
    this.hotkeysDialogVisible = true;
  }

  onConfigureClasssesHotkeys() {
    this.hotkeysDialogVisible = true;
  }

  onMouseEnter() {
    this.hintMessage = 'press DEL to delete box under cursor';
  }

  onMouseLeave() {
    this.hintMessage = '';
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.key <= 0) || (event.key > 9) || !(this.classes[event.key - 1])) {
      return;
    }

    this.selectedClass = this.classes[event.key - 1];
    this.canvasd3Component.drawClassAtCurrentMouseCorrds(this.selectedClass);
  }
}
