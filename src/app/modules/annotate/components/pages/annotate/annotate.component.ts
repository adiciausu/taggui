import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../../../../class/service/class.service';
import {Class} from '../../../../class/models/class.model';
import {CanvasD3Component} from '../../../../canvas-d3/components/canvas-d3/canvas-d3.component';
import {Image} from '../../../../image/models/image.model';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getImages, getSelectedImage, getSelectedImageIndex} from '../../../../image/store/selectors/image.selector';
import {
  LoadImagesAction,
  NextImageAction,
  PreviousImageAction,
  SelectImageAction
} from '../../../../image/store/actions/image.actions';
import {LoadClassesAction} from '../../../../class/store/actions/class.actions';
import {getClasses} from '../../../../class/store/selectors/class.selector';
import {getSelectedProjectId} from '../../../../project/store/selectors/project.selector';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit {
  images$: Observable<Image[]>;
  selectedImage$: Observable<Image>;
  selectedImage: Image;
  selectedImageIndex$: Observable<number>;
  classes$: Observable<Class[]>;
  classes: Class[] = [];
  selectedClass: Class;
  selectedProjectId$: Observable<string>;
  selectedProjectId: string;

  hotkeysDialogVisible: boolean;
  hintMessage: string;
  smartClassStrategies: any[];
  selectedStrategy: string;
  strategySelectionVisibile: boolean;

  @ViewChild(CanvasD3Component, {static: false}) canvasd3Component: CanvasD3Component;

  constructor(private classService: ClassService, private store: Store<any>) {
    this.images$ = this.store.pipe(select(getImages));
    this.selectedImage$ = this.store.pipe(select(getSelectedImage));
    this.selectedImageIndex$ = this.store.pipe(select(getSelectedImageIndex));
    this.classes$ = this.store.pipe(select(getClasses));
    this.selectedProjectId$ = this.store.pipe(select(getSelectedProjectId));

    this.smartClassStrategies = [
      {name: 'Use Google Detection API'},
      {name: 'Use my own neural network'},
      {name: 'Use OpenCV blob detection strategy'}
    ];
    this.selectedStrategy = this.smartClassStrategies[0];
  }

  ngOnInit() {
    this.selectedProjectId$.subscribe((item: string) => {
      if (!item) {
        return;
      }
      this.selectedProjectId = item;
      this.store.dispatch(new LoadClassesAction(this.selectedProjectId));
      this.store.dispatch(new LoadImagesAction(this.selectedProjectId));
    });
    this.selectedImage$.subscribe((item: Image) => {
      this.selectedImage = item;
    });
    this.classes$.subscribe((items: Class[]) => {
      this.classes = items;
      if (items.length && !this.selectedClass) {
        this.selectedClass = items[0];
      }
    });
  }

  onSelectImage(event) {
    const newImage: Image = event.value as Image;
    this.selectImage(newImage.id);
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
      this.store.dispatch(new NextImageAction());
      return;
    }

    if (event.keyCode === 113) { // q key
      this.store.dispatch(new PreviousImageAction());
      return;
    }

    if (this.handleDigit(event.keyCode)) {
      return;
    }
  }

  private selectImage(id: string) {
    this.store.dispatch(new SelectImageAction(id));
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
