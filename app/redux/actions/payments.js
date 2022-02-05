import resToBody from './../resToBody/resToBody';
export const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS';

const CLIMATELINK_BASEURL = 'https://api.klimatelink.com/api/v1/';

export function getSubscriptions() {
  // console.log('getPersonas_actions');
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'payments/subscriptions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_SUBSCRIPTIONS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_PERSONAS_CATCH' + JSON.stringify(error));
      });
  };
}

export default {
  GET_SUBSCRIPTIONS,
  getSubscriptions,
};
