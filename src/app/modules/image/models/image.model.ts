import {Annotation} from '../../canvas-d3/model/annotation.model';

export enum ImageStatus {
  PROCESSING = 'PROCESSING',
  FINISHED = 'FINISHED',
  PENDING = 'PENDING'
}

export interface Image {
  id: string;
  name: string;
  width: number;
  height: number;
  annotations: { [className: string]: Annotation[] };
  status: ImageStatus;
  processorUserId: string;
  projectId: string;
}
