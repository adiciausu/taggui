export enum Shape {
  RECTANGLE = 'RECTANGLE',
  POLYGON = 'POLYGON'
}

export interface Class {
  id: number;
  name: string;
  shape: Shape;
  color: string;
}
