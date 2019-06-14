
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { CanvasD3Component } from '../../../../canvas-d3/components/canvas-d3/canvas-d3.component';
import { Class } from '../../../../class/models/class.model';
import { ClassService } from '../../../../class/service/class.service';

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
  smartClassStrategies: any[];
  selectedStrategy: string;
  strategySelectionVisibile: boolean;

  @ViewChild(CanvasD3Component, { static: false }) canvasd3Component: CanvasD3Component;

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

    this.smartClassStrategies = [{ name: "Use Google Detection API" }, { name: "Use my own neural network" }, { name: "Use OpenCV blob detection strategy" }];

    this.selectedStrategy = this.smartClassStrategies[0];
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

  onSelectStrategy(strategy) {
    this.strategySelectionVisibile = true;

  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const digit = event.keyCode - 48;
    if ((digit <= 0) || (digit > 9) || !(this.classes[digit - 1])) {
      return;
    }

    this.selectedClass = this.classes[digit - 1];
    this.canvasd3Component.drawClassAtCurrentMouseCorrds(this.selectedClass);
  }
}
