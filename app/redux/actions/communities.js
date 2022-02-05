export const GET_COMMUNITIES = 'GET_COMMUNITIES';
export const COMMUNITY_INFORMATION = 'COMMUNITY_INFORMATION';
export const GET_CONTACT_DETAILS = 'GET_CONTACT_DETAILS';
export const GET_COMMUNITY_MEMBER = 'GET_COMMUNITY_MEMBER';
export const GET_COMMUNITY_EVENT = 'GET_COMMUNITY_EVENT';
export const CHECK_MAPPING = 'CHECK_MAPPING';
export const JOIN_COMMUNITY = 'JOIN_COMMUNITY';
export const LEAVE_COMMUNITY = 'LEAVE_COMMUNITY';
export const GET_COMMUNITIES_BY_USERID = 'GET_COMMUNITIES_BY_USERID';
export const GET_COMMUNITY_USER_DEVICE_TOKEN =
  'GET_COMMUNITY_USER_DEVICE_TOKEN';
export const GET_COMMUNITY_POSTS = 'GET_COMMUNITY_POSTS';

const CLIMATELINK_BASEURL = 'https://api.klimatelink.com/api/v1/';

export function getCommunities() {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `community`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('<><><><><>111111', responseJson);
        return dispatch({
          type: GET_COMMUNITIES,
          payload: responseJson,
        });
      })
      .catch(err => {
        console.log('signUp_123_error', err);
        return dispatch({
          type: GET_COMMUNITIES,
          payload: err,
        });
      });
  };
}

export function getCommunityInformation(id) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `communitydetail/fetch/` + id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('njnj', responseJson);
        return dispatch({
          type: COMMUNITY_INFORMATION,
          payload: responseJson,
        });
      })
      .catch(err => {
        console.log('signUp_123_error', err);
        return dispatch({
          type: COMMUNITY_INFORMATION,
          payload: err,
        });
      });
  };
}

export function getContactDetails(id) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `communitycontact/` + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch({
          type: GET_CONTACT_DETAILS,
          payload: responseJson,
        });
      })
      .catch(err => {
        console.log('signUp_123_error', err);
        return dispatch({
          type: GET_CONTACT_DETAILS,
          payload: err,
        });
      });
  };
}

export function getCommunityMember(id) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `communitymember/` + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch({
          type: GET_COMMUNITY_MEMBER,
          payload: responseJson,
        });
      })
      .catch(err => {
        console.log('signUp_123_error', err);
        return dispatch({
          type: GET_COMMUNITY_MEMBER,
          payload: err,
        });
      });
  };
}

export function getCommunityEvents() {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `communityevents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch({
          type: GET_COMMUNITY_EVENT,
          payload: responseJson,
        });
      })
      .catch(err => {
        console.log('signUp_123_error', err);
        return dispatch({
          type: GET_COMMUNITY_EVENT,
          payload: err,
        });
      });
  };
}

export function checkmapping(data) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `communitymember/checkmapping`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        return dispatch({
          type: CHECK_MAPPING,
          payload: responseJson,
        });
      });
  };
}

export function joinCommunity(data) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `communitymember/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch({
          type: JOIN_COMMUNITY,
          payload: responseJson,
        });
      });
  };
}

export function leaveCommunity(data) {
  console.log(data);
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `communitymember/leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseJson => {
        return dispatch({
          type: LEAVE_COMMUNITY,
          payload: responseJson,
        });
      });
  };
}

export function getUserCommunities(userId) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + 'communitymember/community/' + userId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_COMMUNITIES_BY_USERID,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_COMMUNITIES_BY_USERID_CATCH' + JSON.stringify(error));
      });
  };
}

export function getCommunityUserDeviceToken(channelId) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + 'chatmaster/community/' + channelId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(async res => {
        const body = await res;
        return dispatch({
          type: GET_COMMUNITY_USER_DEVICE_TOKEN,
          payload: body,
        });
      })
      .catch(error => {
        console.log('Error fetching device tokens' + JSON.stringify(error));
      });
  };
}

export function getCommunityPosts(communityID) {
  console.log('Action initiated');
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + 'communitypost/fetch/' + communityID,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_COMMUNITY_POSTS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('This is the error in fetching the community posts', error);
      });
  };
}
export function sendPushNotifications(arrDeviceTokens) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arrDeviceTokens),
    })
      .then(res => res.json())
      .then(response => {
        console.log('Post API response', response);
      });
  };
}

export function addCommunityPost(reqObj) {
  return async dispatch => {
  // let reqObj = {
  //   communityDetailId: communityId,
  //   memberId: memberId,
  //   heading: 'This is the post',
  //   details: 'These are the post details',
  //   attachments: 'These are the post attachments',
  // };

  console.log(
    'reqObjreqObjreqObj',
    JSON.stringify(reqObj),
  );
  const res = await fetch(CLIMATELINK_BASEURL + 'communitypost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqObj),
  })
    .then(res => res.json())
    .then(response => {
      console.log('Post community API response', response);
      return response
    })
    .catch(error => {
      console.log('This is the add community post response');
    });
  };
}

export default {
  GET_COMMUNITIES,
  COMMUNITY_INFORMATION,
  GET_CONTACT_DETAILS,
  GET_COMMUNITY_MEMBER,
  GET_COMMUNITY_EVENT,
  CHECK_MAPPING,
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
  GET_COMMUNITIES_BY_USERID,
  getCommunities,
  getCommunityInformation,
  getContactDetails,
  getCommunityMember,
  getCommunityEvents,
  checkmapping,
  joinCommunity,
  leaveCommunity,
  getUserCommunities,
  getCommunityUserDeviceToken,
  sendPushNotifications,
  getCommunityPosts,
  addCommunityPost,
};
