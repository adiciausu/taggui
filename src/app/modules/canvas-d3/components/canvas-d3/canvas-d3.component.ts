import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3/index';
import {Class, Shape} from '../../../class/models/class.model';
import {Image} from '../../../image/models/image.model';
import {ImageService} from '../../../image/service/image.service';
import {Annotation} from '../../model/annotation.model';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-canvas-d3',
  templateUrl: './canvas-d3.component.html',
  styleUrls: ['./canvas-d3.component.css']
})
export class CanvasD3Component implements OnInit {
  @Input() selectedClass: Class;
  @Input() classes: Class[] = [];
  @Input() selectedImage$: Observable<Image>;
  selectedImage: Image;

  svg;
  image;
  rectangleStrokeWidth = 5;
  hotCornerRadius = 10;
  currentMouseCoords = [];
  annotationNodes = [];
  env = environment;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.initSVG();
    this.selectedImage$.subscribe((image: Image) => {
      if (!image) {
        return;
      }
      this.selectedImage = image;
      this.drawImage(image);
    });
  }

  saveClassAtCurrentMouseCorrds(clazz: Class) {
    return this.saveClass(this.currentMouseCoords[0], this.currentMouseCoords[1], 100, 100, clazz);
  }

  saveClass(x: number, y: number, width: number, height: number, clazz: Class) {
    let index = 0;
    if (this.selectedImage.annotations[clazz.name]) {
      index = this.selectedImage.annotations[clazz.name].length;
    }
    this.drawRectangle(x, y, width, height, clazz, index);

    const ann: Annotation = {
      shape: Shape.RECTANGLE,
      points: [
        {x, y},
        {x: x + width, y: y + height},
      ]
    };
    this.selectedImage.annotations[clazz.name] = this.selectedImage.annotations[clazz.name] || [];
    this.selectedImage.annotations[clazz.name].push(ann);
    this.imageService.save(this.selectedImage).subscribe();
  }

  drawImage(image: Image) {
    this.svg.attr('width', image.width)
    .attr('height', image.height);
    this.image.attr('xlink:href', this.env.staticImageHost + '/' + image.name);

    // remove old annotations
    this.annotationNodes.forEach((annotation) => annotation.remove());

    // draw new annotations
    for (const className of Object.keys(image.annotations)) {
      // determine class
      let clazz = null;
      for (const searchedClass of this.classes) {
        if (searchedClass.name === className) {
          clazz = searchedClass;
          break;
        }
      }

      if (!clazz) {
        console.error('Inexistent class: ' + className + '. Check to see if annotations remained on images$ after they where deleted');
        continue;
      }

      for (const index of image.annotations[className].keys()) {
        const annotation = image.annotations[className][index];
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
      this.selectedImage.annotations[clazz.name][index].points[0].x = d.x;
      this.selectedImage.annotations[clazz.name][index].points[0].y = d.y;
      this.selectedImage.annotations[clazz.name][index].points[1].x = d.x + width;
      this.selectedImage.annotations[clazz.name][index].points[1].y = d.y + height;
      this.imageService.save(this.selectedImage).subscribe();
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

    // add image
    this.image = this.svg.append('image')
    .attr('x', 0)
    .attr('y', 0)
    .on('click', () => {
      const coords = d3.mouse(d3.event.target);
      this.saveClass(coords[0], coords[1], 100, 100, this.selectedClass);
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

  private addResizeHotcorner(rectangleGroup, x: number, y: number, cssClassName: string, clazz: Class, index: number) {
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

        this.selectedImage.annotations[clazz.name][index].points[1].x = this.selectedImage.annotations[clazz.name][index].points[0].x + newWidth;
      }

      if (newCoords[1] > currentShapeOriginCoords.y) {
        const newHeight = newCoords[1] - currentShapeOriginCoords.y;
        rect.attr('height', newHeight);
        rectangleGroup.select('.SE')
        .attr('cy', newHeight);
        this.selectedImage.annotations[clazz.name][index].points[1].y = this.selectedImage.annotations[clazz.name][index].points[0].y + newHeight;
      }
    })
    .on('end', () => {
      this.imageService.save(this.selectedImage).subscribe();
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
