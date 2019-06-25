import {Class} from '../../models/class.model';

export interface ClassState {
  classes: Class[];
}

export const intialClassState: ClassState = {
  classes: [],
};
