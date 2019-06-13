export enum Shape {
  RECTANGLE,
  POLYGON
}

export interface Class {
  id: number;
  name: string;
  shape: Shape;
  color: string;
}
