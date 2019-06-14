import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3/index';
import {Class} from '../../../class/models/class.model';
import {Image} from '../../../image/models/image.model';

@Component({
  selector: 'app-canvas-d3',
  templateUrl: './canvas-d3.component.html',
  styleUrls: ['./canvas-d3.component.css']
})
export class CanvasD3Component implements OnInit {
  @Input() selectedClass: Class;
  @Input() selectedImage: Image;

  svg;
  image;
  rectangleStrokeWidth = 5;
  hotCornerRadius = 10;
  currentMouseCoords = [];
  annotations = [];

  constructor() {
  }

  ngOnInit() {
    this.initSVG();
    this.drawImage(this.selectedImage);
  }

  drawClassAtCurrentMouseCorrds(clazz: Class) {
    return this.drawClass(this.currentMouseCoords[0], this.currentMouseCoords[1], 100, 100, clazz);
  }

  // only rectangle implemented
  drawClass(x: number, y: number, width: number, height: number, clazz: Class) {
    if (!clazz) {
      throw new Error('No class selected');
    }

    const rectangleGroup = this.svg.append('g');

    // add rectangle
    rectangleGroup.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('stroke', 'orange')
    .attr('stroke-width', this.rectangleStrokeWidth)
    .attr('fill', clazz.color)
    .style('opacity', 0.4)
    .attr('cursor', 'move');

    this.addResizeHotcorner(rectangleGroup, width, height, 'SE');

    // add drag behaviour
    rectangleGroup
    .datum({x: x, y: y})
    .attr('transform', (d) => {
      return 'translate(' + [d.x, d.y] + ')';
    })
    .call(
      d3.drag()
      .on('drag', (d: { x: number, y: number }) => {
        rectangleGroup.attr('transform', (datum) => {
          datum.x += d3.event.dx;
          datum.y += d3.event.dy;

          return 'translate(' + [datum.x, datum.y] + ')';
        });
      })
    );

    this.annotations.push(rectangleGroup);
  }

  drawImage(image: Image) {
    this.svg.attr('width', image.width)
    .attr('height', image.height);
    this.image.attr('xlink:href', image.path);
    this.annotations.forEach((annotation) => annotation.remove());
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
      this.drawClass(coords[0], coords[1], 100, 100, this.selectedClass);
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

  private addResizeHotcorner(rectangleGroup, x: number, y: number, className: string) {
    const resize = d3.drag().on('drag', () => {
      const rect = rectangleGroup.select('rect');
      const currentShapeOriginCoords = rect.data()[0];
      const newCoords = d3.mouse(this.svg.node());

      if (newCoords[0] > currentShapeOriginCoords.x) {
        const newWidth = newCoords[0] - currentShapeOriginCoords.x;
        rect.attr('width', newWidth);
        rectangleGroup.select('.SE')
        .attr('cx', newWidth);
      }

      if (newCoords[1] > currentShapeOriginCoords.y) {
        const newHeight = newCoords[1] - currentShapeOriginCoords.y;
        rect.attr('height', newHeight);
        rectangleGroup.select('.SE')
        .attr('cy', newHeight);
      }

    });

    rectangleGroup.append('circle')
    .classed(className, true)
    .attr('fill', 'white')
    .attr('r', this.hotCornerRadius)
    .attr('cx', x)
    .attr('cy', y)
    .attr('cursor', className.toLowerCase() + '-resize')
    .call(resize);
  }
}
