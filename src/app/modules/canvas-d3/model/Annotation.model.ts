import {Point} from './Point.model';
import {Shape} from '../../class/models/class.model';

export interface Annotation {
  shape: Shape;
  points: Point[];
}
