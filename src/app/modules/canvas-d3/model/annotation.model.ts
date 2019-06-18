import {Point} from './point.model';
import {Shape} from '../../class/models/class.model';

export interface Annotation {
  shape: Shape;
  points: Point[];
}
