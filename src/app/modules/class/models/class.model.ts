export enum Shape {
  RECTANGLE = 'RECTANGLE',
  POLYGON = 'POLYGON',
  POINT = 'POINT',
}

export interface Class {
  id: string;
  name: string;
  shape: Shape;
  color: string;
}
