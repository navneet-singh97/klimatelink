import {GET_SUBSCRIPTIONS} from './../actions/payments';

export default function payments(state = {}, action) {
  switch (action.type) {
    case GET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptionsList: action.payload,
      };
  }
  return state;
}
