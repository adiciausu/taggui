import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3/index';
import {Class, Shape} from '../../../class/models/class.model';
import {Image} from '../../../image/models/image.model';
import {Annotation} from '../../model/annotation.model';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {SaveImageAction} from '../../../image/store/actions/image.actions';

@Component({
  selector: 'app-canvas-d3',
  templateUrl: './canvas-d3.component.html',
  styleUrls: ['./canvas-d3.component.css']
})
export class CanvasD3Component implements OnInit {
  @Input() selectedClass: Class;
  @Input() classes$: Observable<Class[]>;
  @Input() selectedImage$: Observable<Image>;

  selectedImage: Image;
  classes: Class[] = [];
  svg;
  svgImage;
  rectangleStrokeWidth = 5;
  hotCornerRadius = 10;
  currentMouseCoords = [];
  annotationNodes = [];
  env = environment;

  rectangleWidth = 100;
  rectangleHeight = 100;

  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.initSVG();

    this.selectedImage$.subscribe((image: Image) => {
      this.selectedImage = image;
      if (image) {
        this.drawImage(image);
        if (this.classes.length) {
          this.drawImageAnnotations(image);
        }
      }
    });

    this.classes$.subscribe((classes: Class[]) => {
      this.classes = classes;
    });
  }

  saveClassAtCurrentMouseCorrds(clazz: Class) {
    return this.saveRectangle(this.currentMouseCoords[0] - this.rectangleWidth / 2,
      this.currentMouseCoords[1] - this.rectangleHeight / 2, this.rectangleWidth, this.rectangleHeight, clazz);
  }

  saveRectangle(x: number, y: number, width: number, height: number, clazz: Class) {
    let index = 0;
    if (this.selectedImage.annotations[clazz.id]) {
      index = this.selectedImage.annotations[clazz.id].length;
    }
    this.drawRectangle(x, y, width, height, clazz, index);

    const ann: Annotation = {
      shape: Shape.RECTANGLE,
      points: [
        {x, y},
        {x: x + width, y: y + height},
      ]
    };
    this.selectedImage.annotations[clazz.id] = this.selectedImage.annotations[clazz.id] || [];
    this.selectedImage.annotations[clazz.id].push(ann);
    this.store.dispatch(new SaveImageAction(this.selectedImage));
  }

  private drawImage(image: Image) {
    this.svg.attr('width', image.width)
    .attr('height', image.height);
    this.svgImage.attr('xlink:href', this.env.staticImageHost + '/' + image.name);
  }

  private drawImageAnnotations(image: Image) {
    // remove old
    this.annotationNodes.forEach((annotation) => annotation.remove());

    // draw new annotations
    for (const classId of Object.keys(image.annotations)) {
      // determine class
      let clazz = null;
      for (const searchedClass of this.classes) {
        if (searchedClass.id === classId) {
          clazz = searchedClass;
          break;
        }
      }

      if (!clazz) {
        console.error('Inexistent class: ' + classId + '. Check to see if annotations remained on images$ after they where deleted');
        continue;
      }

      for (const index of image.annotations[classId].keys()) {
        const annotation = image.annotations[classId][index];
        switch (annotation.shape) {
          case Shape.RECTANGLE:
            this.drawRectangle(annotation.points[0].x, annotation.points[0].y,
              annotation.points[1].x - annotation.points[0].x,
              annotation.points[1].y - annotation.points[0].y,
              clazz, index as number);
            break;
          case Shape.POLYGON:
          default:
            throw new Error('Not implemented!');

        }
      }
    }
  }

  private drawRectangle(x: number, y: number, width: number, height: number, clazz: Class, index: number) {
    if (!clazz) {
      throw new Error('No class selected');
    }

    const rectangleGroup = this.svg.append('g')
    .attr('id', clazz.name + '-' + index);

    // add rectangle
    rectangleGroup.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('stroke', 'orange')
    .attr('stroke-width', this.rectangleStrokeWidth)
    .attr('fill', clazz.color)
    .style('opacity', 0.4)
    .attr('cursor', 'move');

    this.addResizeHotcorner(rectangleGroup, width, height, 'SE', clazz, index);
    const rectangleDragBehaviour = d3.drag()
    .on('drag', (d: { x: number, y: number }) => {
      rectangleGroup.attr('transform', (datum) => {
        datum.x += d3.event.dx;
        datum.y += d3.event.dy;

        return 'translate(' + [datum.x, datum.y] + ')';
      });
    })
    .on('end', (d: { x: number, y: number }) => {
      this.selectedImage.annotations[clazz.id][index].points[0].x = d.x;
      this.selectedImage.annotations[clazz.id][index].points[0].y = d.y;
      this.selectedImage.annotations[clazz.id][index].points[1].x = d.x + width;
      this.selectedImage.annotations[clazz.id][index].points[1].y = d.y + height;
      this.store.dispatch(new SaveImageAction(this.selectedImage));
    });

    // add drag behaviour
    rectangleGroup
    .datum({x, y})
    .attr('transform', (d) => {
      return 'translate(' + [d.x, d.y] + ')';
    })
    .call(rectangleDragBehaviour);

    this.annotationNodes.push(rectangleGroup);
  }

  private initSVG() {
    this.svg = d3.select('#canvas-d3')
    .append('svg');

    // add svgImage
    this.svgImage = this.svg.append('image')
    .attr('x', 0)
    .attr('y', 0)
    .on('click', () => {
      const coords = d3.mouse(d3.event.target);
      this.saveRectangle(coords[0] - this.rectangleWidth / 2, coords[1] - this.rectangleHeight / 2, this.rectangleWidth, this.rectangleHeight, this.selectedClass);
    });

    // add zoom
    const zoom = d3.zoom()
    .scaleExtent([.5, 2])
    .on('zoom', () => {
      this.svg.attr('transform', d3.event.transform);
    });
    this.svg.call(zoom);

    // start mouse move listener
    this.svg.on('mousemove', () => {
      this.currentMouseCoords = d3.mouse(d3.event.target);
    });
  }

  private addResizeHotcorner(rectangleGroup, x: number, y: number, cssClassName: string, cls: Class, index: number) {
    const resize = d3.drag()
    .on('drag', () => {
      const rect = rectangleGroup.select('rect');
      const currentShapeOriginCoords = rect.data()[0];
      const newCoords = d3.mouse(this.svg.node());

      if (newCoords[0] > currentShapeOriginCoords.x) {
        const newWidth = newCoords[0] - currentShapeOriginCoords.x;
        rect.attr('width', newWidth);
        rectangleGroup.select('.SE')
        .attr('cx', newWidth);

        this.selectedImage.annotations[cls.id][index].points[1].x = this.selectedImage.annotations[cls.id][index].points[0].x + newWidth;
      }

      if (newCoords[1] > currentShapeOriginCoords.y) {
        const newHeight = newCoords[1] - currentShapeOriginCoords.y;
        rect.attr('height', newHeight);
        rectangleGroup.select('.SE')
        .attr('cy', newHeight);

        this.selectedImage.annotations[cls.id][index].points[1].y = this.selectedImage.annotations[cls.id][index].points[0].y + newHeight;
      }
    })
    .on('end', () => {
      this.store.dispatch(new SaveImageAction(this.selectedImage));
    });

    rectangleGroup.append('circle')
    .classed(cssClassName, true)
    .attr('fill', 'white')
    .attr('r', this.hotCornerRadius)
    .attr('cx', x)
    .attr('cy', y)
    .attr('cursor', cssClassName.toLowerCase() + '-resize')
    .call(resize);
  }
}
