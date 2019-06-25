import * as _ from 'lodash';
import {ClassActions, DELETE_CLASS_SUCCESS, LOAD_CLASSES_SUCCESS, SAVE_CLASS_SUCCESS} from '../actions/class.actions';
import {ClassState, intialClassState} from '../state/class.state';
import {Class} from '../../models/class.model';


export function classReducer(state: ClassState = intialClassState, action: ClassActions): ClassState {
  switch (action.type) {
    case LOAD_CLASSES_SUCCESS:
      return {
        ...state,
        classes: action.payload,
      };

    case SAVE_CLASS_SUCCESS:
      const classListStateAfterSave = _.clone(state.classes);
      const idx = classListStateAfterSave.findIndex((clazz: Class) => {
        return clazz.id === action.payload.id;
      });

      if (idx !== -1) {
        classListStateAfterSave[idx] = action.payload;
      } else {
        classListStateAfterSave.push(action.payload);
      }

      return {
        ...state,
        classes: classListStateAfterSave
      };

    case DELETE_CLASS_SUCCESS:
      let classListAfterDelete = _.clone(state.classes);
      classListAfterDelete = classListAfterDelete.filter((clazz) => {

        return clazz.id !== action.payload;
      });

      return {
        ...state,
        classes: classListAfterDelete
      };

    default:
      return state;
  }
}
