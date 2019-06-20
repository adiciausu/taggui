import {Annotation} from '../../canvas-d3/model/annotation.model';

export interface Image {
  id: string;
  name: string;
  width: number;
  height: number;
  annotations: { [className: string]: Annotation[] };
}
