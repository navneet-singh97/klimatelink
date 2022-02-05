export const GET_DATA = 'GET_DATA';

export function getData(value) {
  return async dispatch => {
    return dispatch({
      type: GET_DATA,
      payload: value,
    });
  };
}

export default {
  GET_DATA,
  getData,
};
