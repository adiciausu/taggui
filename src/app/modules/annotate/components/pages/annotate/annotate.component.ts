import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ClassService} from '../../../../class/service/class.service';
import {Class} from '../../../../class/models/class.model';
import {CanvasD3Component} from '../../../../canvas-d3/components/canvas-d3/canvas-d3.component';
import {Image} from '../../../../image/models/image.model';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {getImageBatchForAnnotating, getSelectedImage} from '../../../../image/store/selectors/image.selector';
import {
  LoadAnnotationBatchImagesAction,
  MarkAnnotationComplete,
  NextImageAction,
  PreviousImageAction,
  SaveImageAction,
  SelectImageAction
} from '../../../../image/store/actions/image.actions';
import {LoadClassesAction} from '../../../../class/store/actions/class.actions';
import {getClasses} from '../../../../class/store/selectors/class.selector';
import {getSelectedProjectId} from '../../../../project/store/selectors/project.selector';
import {AuthService} from '../../../../auth/service/auth.service';

@Component({
  selector: 'app-annotate',
  templateUrl: './annotate.component.html',
  styleUrls: ['./annotate.component.css']
})
export class AnnotateComponent implements OnInit, OnDestroy {
  images$: Observable<Image[]>;
  images: Image[];
  selectedImage$: Observable<Image>;
  selectedImage: Image;
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
  imageSubscription: Subscription;
  classSubscription: Subscription;
  projectIdSubscription: Subscription;
  cici: Subscription;

  @ViewChild(CanvasD3Component, {static: false}) canvasd3Component: CanvasD3Component;

  constructor(private classService: ClassService, private store: Store<any>, private authService: AuthService) {
    this.smartClassStrategies = [
      {name: 'Use Google Detection API'},
      {name: 'Use my own neural network'},
      {name: 'Use OpenCV blob detection strategy'}
    ];
    this.selectedStrategy = this.smartClassStrategies[0];
  }

  ngOnInit() {
    const decodedJWT = this.authService.getDecodedJWT();
    const userId = decodedJWT.sub;
    this.images$ = this.store.pipe(select(getImageBatchForAnnotating, {userId}));
    this.selectedImage$ = this.store.pipe(select(getSelectedImage));
    this.classes$ = this.store.pipe(select(getClasses));
    this.selectedProjectId$ = this.store.pipe(select(getSelectedProjectId));

    this.cici = this.images$.subscribe((item) => {
      this.images = item;
      console.log(item);
    });
    this.imageSubscription = this.selectedImage$.subscribe((item: Image) => {
      this.selectedImage = item;
    });
    this.classSubscription = this.classes$.subscribe((items: Class[]) => {
      this.classes = items;
      if (items.length && !this.selectedClass) {
        this.selectedClass = items[0];
      }
    });
    this.projectIdSubscription = this.selectedProjectId$.subscribe((newProjectId: string) => {
      if (!newProjectId) {
        return;
      }

      if (this.selectedProjectId === newProjectId) {
        return;
      }
      this.selectedProjectId = newProjectId;

      this.store.dispatch(new LoadClassesAction(this.selectedProjectId));
      this.store.dispatch(new LoadAnnotationBatchImagesAction(this.selectedProjectId));
    });

    if (this.selectedProjectId) {
      this.store.dispatch(new LoadClassesAction(this.selectedProjectId));
      this.store.dispatch(new LoadAnnotationBatchImagesAction(this.selectedProjectId));
    }
  }

  ngOnDestroy(): void {
    console.log('onDestory');
    this.imageSubscription.unsubscribe();
    this.projectIdSubscription.unsubscribe();
    this.classSubscription.unsubscribe();
    this.cici.unsubscribe();
  }

  onSave() {
    this.store.dispatch(new SaveImageAction(this.selectedImage));
  }

  onMarkAnnotationComplete() {
    console.log('marke');
    this.store.dispatch(new MarkAnnotationComplete(this.selectedImage));
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
