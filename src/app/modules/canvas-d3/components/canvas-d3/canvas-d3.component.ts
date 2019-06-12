import {Component, OnInit} from "@angular/core";
import * as d3 from "d3/index";

@Component({
  selector: 'app-canvas-d3',
  templateUrl: './canvas-d3.component.html',
  styleUrls: ['./canvas-d3.component.scss']
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
    this.svg.append('svg:image')
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

  addResizeHotspot(rectangleGroup, x: number, y: number) {
    rectangleGroup.append('circle')
      .attr('fill', 'white')
      .attr('r', this.rectangleStrokeWidth > 1 ? this.rectangleStrokeWidth - 1 : 1)
      .attr('cx', x)
      .attr('cy', y);

    return rectangleGroup;
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
      .style("opacity", 0.4)
      .attr("cursor", "move");

    // add rectangle resize hotspots
    this.addResizeHotspot(rectangleGroup, 0, 0);
    this.addResizeHotspot(rectangleGroup, width, 0);
    this.addResizeHotspot(rectangleGroup, 0, height);
    this.addResizeHotspot(rectangleGroup, width, height);

    // add drag behaviour
    rectangleGroup
      .datum({x: x, y: y})
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")";
      })
      .call(
        d3.drag()
          .on('start', () => {
          })
          .on('drag', (d: {x: number, y: number}) => {
            rectangleGroup.attr("transform", function (d) {
              d.x += d3.event.dx;
              d.y += d3.event.dy;

              return "translate(" + [d.x, d.y] + ")"
            })
          })
          .on('end', (() => {
          })));
  }
}
