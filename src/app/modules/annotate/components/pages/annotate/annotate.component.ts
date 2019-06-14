import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../../../../class/service/class.service';
import {Class} from '../../../../class/models/class.model';
import {CanvasD3Component} from '../../../../canvas-d3/components/canvas-d3/canvas-d3.component';
import {ImageService} from '../../../service/image.service';
import {Image} from '../../../../image/models/image.model';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  classes: Class[];
  selectedClass: Class;

  images: Image[];
  selectedImage: Image;
  selectedImageIndex: number;

  hotkeysDialogVisible: boolean;
  hintMessage: string;
  smartClassStrategies: any[];
  selectedStrategy: string;
  strategySelectionVisibile: boolean;

  @ViewChild(CanvasD3Component, {static: false}) canvasd3Component: CanvasD3Component;

  constructor(private classService: ClassService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.classService.findAll().subscribe(items => {
      this.classes = items;
      this.selectedClass = this.classes[0];
    });

    this.imageService.findBach().subscribe(items => {
      this.images = items;
      this.selectedImage = this.images[0];
      this.selectedImageIndex = 0;
    });
  }

  onSelectImage(event) {
    const newImage: Image = event.value as Image;
    const imageIndex = this.images.findIndex((image) => image.path === newImage.path);
    this.selectImageIndex(imageIndex);
    this.smartClassStrategies = [{name: 'Use Google Detection API'}, {name: 'Use my own neural network'}, {name: 'Use OpenCV blob detection strategy'}];
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
    if (event.keyCode === 101) { // e key
      if (!this.images[this.selectedImageIndex + 1]) {
        return;
      }
      this.selectImageIndex(this.selectedImageIndex + 1);
      return;
    }

    if (event.keyCode === 113) { // q key
      if (this.selectedImageIndex <= 0) {
        return;
      }
      this.selectImageIndex(this.selectedImageIndex - 1);
      return;
    }

    if (this.handleDigit(event.keyCode)) {
      return;
    }
  }

  private selectImageIndex(index: number) {
    this.selectedImage = this.images[index];
    this.selectedImageIndex = index;
    this.canvasd3Component.drawImage(this.selectedImage);
  }

  private handleDigit(keyCode) {
    const digit = keyCode - 48;
    if (digit > 0 && digit < 9 && this.classes[digit - 1]) {
      this.selectedClass = this.classes[digit - 1];
      this.canvasd3Component.drawClassAtCurrentMouseCorrds(this.selectedClass);

      return true;
    }
  }
}
