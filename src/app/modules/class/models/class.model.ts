export enum Shape {
  RECTANGLE = 'RECTANGLE',
  POLYGON = 'POLYGON'
}

export interface Class {
  id: string;
  name: string;
  shape: Shape;
  color: string;
}
