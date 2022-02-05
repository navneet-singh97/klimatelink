import {GET_DATA} from '../actions/initial';

export default function initial(state = {}, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        newState: action.payload,
      };
  }
  return state;
}
