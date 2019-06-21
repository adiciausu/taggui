import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../../../../class/service/class.service';
import {Class} from '../../../../class/models/class.model';
import {CanvasD3Component} from '../../../../canvas-d3/components/canvas-d3/canvas-d3.component';
import {ImageService} from '../../../../image/service/image.service';
import {Image} from '../../../../image/models/image.model';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  classes: Class[] = [];
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
    this.imageService.findAll().subscribe(images => {
      this.images = images;
      this.selectedImage = this.images[0];
      this.selectedImageIndex = 0;
      this.classService.findAll().subscribe(classes => {
        this.classes = classes;
        this.selectedClass = this.classes[0];

        if (this.selectedImage != null) {
          this.canvasd3Component.drawImage(this.selectedImage);
        }
      });
    });
  }

  onSelectImage(event) {
    const newImage: Image = event.value as Image;
    const imageIndex: number = this.images.findIndex((image) => image.id === newImage.id);
    this.selectImageIndex(imageIndex);
    this.smartClassStrategies = [
      {name: 'Use Google Detection API'},
      {name: 'Use my own neural network'},
      {name: 'Use OpenCV blob detection strategy'}
    ];
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
      this.canvasd3Component.saveClassAtCurrentMouseCorrds(this.selectedClass);

      return true;
    }
  }
}
