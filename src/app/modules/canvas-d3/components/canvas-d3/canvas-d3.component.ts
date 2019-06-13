import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'app-canvas-d3',
  templateUrl: './canvas-d3.component.html',
  styleUrls: ['./canvas-d3.component.scss']
})
export class CanvasD3Component implements OnInit {
  svg;
  imageSVG;

  constructor() {
  }

  ngOnInit() {
    this.initSVG();
  }

  initSVG() {
    this.svg = d3.select('#canvas-d3')
    .append('svg')
    .attr('width', 800)
    .attr('height', 468);

    this.imageSVG = this.svg.append('svg:image')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 800)
    .attr('height', 468)
    .attr('xlink:href', 'https://dz5vhvq2e26ss.cloudfront.net/media/image/7595667854e9da321.01809399.jpg')
    .on('click', () => {
      const coords = d3.mouse(d3.event.target);

      this.drawRectangle(coords[0], coords[1]);
    });
  }

  drawRectangle(x: number, y: number) {
    const rectangle = this.svg.append('rect');

    rectangle.attr('width', 100)
    .attr('height', 100)
    .attr('x', x)
    .attr('y', y)
    .attr('stroke', '#2378ae')
    .attr('stroke-width', 10)
    .attr('fill', 'transparent')
    .call(
      d3.drag()
      .on('start', () => {
        console.log(d3.event.x);
        rectangle.attr('stroke-width', 5);
      })
      .on('drag', () => {
        rectangle.attr('x', d3.event.x);
        rectangle.attr('y', d3.event.y);
      })
      .on('end', (() => {
        rectangle.attr('stroke-width', 10);
      })));
  }
}
