import {
  GET_COMMUNITIES,
  COMMUNITY_INFORMATION,
  GET_CONTACT_DETAILS,
  GET_COMMUNITY_MEMBER,
  GET_COMMUNITY_EVENT,
  CHECK_MAPPING,
  JOIN_COMMUNITY,
  LEAVE_COMMUNITY,
  GET_COMMUNITIES_BY_USERID,
  GET_COMMUNITY_USER_DEVICE_TOKEN,
  GET_COMMUNITY_POSTS
} from '../actions/communities';

export default function communities(state = {}, action) {
  switch (action.type) {
    case GET_COMMUNITIES:
      console.log("<><><><><><>66666", action.payload)
      return {
        ...state,
        communities: action.payload,
      };
    case COMMUNITY_INFORMATION:
      return {
        ...state,
        communityInformation: action.payload,
      };
    case GET_CONTACT_DETAILS:
      return {
        ...state,
        contactDetails: action.payload,
      };
    case GET_COMMUNITY_MEMBER:
      return {
        ...state,
        communityMember: action.payload,
      };
    case GET_COMMUNITY_EVENT:
      return {
        ...state,
        communityEvents: action.payload,
      };
    case CHECK_MAPPING:
      return {
        ...state,
        checkMapping: action.payload,
      };
    case JOIN_COMMUNITY:
      return {
        ...state,
        joinCommunityDetails: action.payload,
      };
    case LEAVE_COMMUNITY:
      return {
        ...state,
        leaveCommunityDetails: action.payload,
      };
    case GET_COMMUNITIES_BY_USERID:
      return {
        ...state,
        getCommunitiesByUserId: action.payload,
      };
      case GET_COMMUNITY_USER_DEVICE_TOKEN:
        return {
          ...state,
          getCommunityUserDeviceToken:action.payload
        }
        case GET_COMMUNITY_POSTS:
          return {
            ...state,
            communityPosts:action.payload
          }
  }
  return state;
}
