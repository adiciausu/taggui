import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3/index';

@Component({
  selector: 'app-canvas-d3',
  templateUrl: './canvas-d3.component.html',
  styleUrls: ['./canvas-d3.component']
})
export class CanvasD3Component implements OnInit {
  svg;
  rectangleStrokeWidth = 5;

  constructor() {
  }

  ngOnInit() {
    this.initSVG(800, 468);
  }

  initSVG(width: number, height: number) {
    this.svg = d3.select('#canvas-d3')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // add image
    this.svg.append('image')
      .attr('x', 0)
      .attr('y', 0)
      .attr('xlink:href', 'https://dz5vhvq2e26ss.cloudfront.net/media/image/7595667854e9da321.01809399.jpg')
      .on('click', () => {
        const coords = d3.mouse(d3.event.target);
        this.drawRectangle(coords[0], coords[1], 100, 100);
      });

    // add zoom
    const zoom = d3.zoom()
      .scaleExtent([.5, 2])
      .on('zoom', () => {
        this.svg.attr('transform', d3.event.transform);
      });

    this.svg.call(zoom);
  }

  addResizeHotspot(rectangleGroup, x: number, y: number, className: string) {
    const resize = d3.drag().on('drag', (d) => {
      const rect = rectangleGroup.select('rect');

      if (d3.event.x > rect.attr('x')) {
        const newWidth = d3.event.x - rect.attr('x');
        rect.attr('width', newWidth);
        rectangleGroup.select('.SE')
          .attr('cx', newWidth)
        rectangleGroup.select('.NE')
          .attr('cx', newWidth)
      } else {
        // const newWidth = rect.attr('x') - d3.event.x;
        // rect.attr('width', newWidth);
        // rect.attr('x', d3.event.x);
        //
        // rectangleGroup.select('.SE')
        //   .attr('cx', 0);
        // rectangleGroup.select('.NE')
        //   .attr('cx', 0);
      }

      if (d3.event.y > rect.attr('y')) {
        const newHeight = d3.event.y - rect.attr('y');

        rect.attr('height', newHeight);
        rectangleGroup.select('.SE')
          .attr('cy', newHeight);
        rectangleGroup.select('.SW')
          .attr('cy', newHeight)
      } else {
        //
      }
    });

    rectangleGroup.append('circle')
      .classed(className, true)
      .attr('fill', 'white')
      .attr('r', this.rectangleStrokeWidth > 1 ? this.rectangleStrokeWidth - 1 : 1)
      .attr('cx', x)
      .attr('cy', y)
      .attr('cursor', className.toLowerCase() + '-resize')
      .call(resize);
  }


  drawRectangle(x: number, y: number, width: number, height: number) {
    const rectangleGroup = this.svg.append('g');

    // add rectangle
    rectangleGroup.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('stroke', 'orange')
      .attr('stroke-width', this.rectangleStrokeWidth)
      .attr('fill', '#2378ae')
      .style('opacity', 0.4)
      .attr('cursor', 'move');

    // add rectangle resize hotspots
    this.addResizeHotspot(rectangleGroup, 0, 0, 'NW');
    this.addResizeHotspot(rectangleGroup, width, 0, 'NE');
    this.addResizeHotspot(rectangleGroup, 0, height, 'SW');
    this.addResizeHotspot(rectangleGroup, width, height, 'SE');

    // add drag behaviour
    rectangleGroup
      .datum({x: x, y: y})
      .attr('transform',  (d) => {
        return 'translate(' + [d.x, d.y] + ')';
      })
      .call(
        d3.drag()
          .on('drag', (d: {x: number, y: number}) => {
            rectangleGroup.attr('transform', (datum) => {
              datum.x += d3.event.dx;
              datum.y += d3.event.dy;

              return 'translate(' + [datum.x, datum.y] + ')';
            });
          })
      );
  }
}
