export const GET_JOBS_LIST = 'GET_JOBS_LIST';

const CLIMATELINK_BASEURL = 'https://api.klimatelink.com/api/v1/';

export function getJobsList() {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `Jobs/pagination?PageNumber=${1}&PageSize=${10}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        return Promise.all([response.json(), response.headers]);
      })
      .then(([responseJson, headers]) => {
        console.log('jobs_headers_123_new,.,.,.', headers.map['x-pagination']);
        console.log('jobs_responseJson_123_new', responseJson.result);
        return dispatch({
          type: GET_JOBS_LIST,
          payload: responseJson,
        });
      })
      .catch(err => {
        console.log('signUp_123_error', err);
      });
  };
}

export default {
  GET_JOBS_LIST,
  getJobsList,
};
