import {GET_JOBS_LIST} from '../actions/jobs';

export default function jobs(state = {}, action) {
  switch (action.type) {
    case GET_JOBS_LIST:
      return {
        ...state,
        jobsList: action.payload,
      };
  }
  return state;
}
