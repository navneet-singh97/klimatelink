import {GET_COMMUNITIES_BY_USERID} from '../actions/communities';
import {
  SIGN_UP,
  LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  OTP,
  OTP_ERROR,
  FORGOT_PWD_OTP,
  GET_USER_DETAILS,
  USER_DETAILS_ERROR,
  EDIT_PROFILE,
  USER_LOADER,
  USER_SIGN_OUT,
  REQUEST_OTP_WITH_PHONENO,
  RESEND_OTP,
  VERIFY_OTP,
  LOGIN_WITH_PHONENO,
  UPLOAD_PROFILE,
  SEND_OTP,
  OTP_VERIFICATION,
  SAVE_USER_ID,
  GET_PERSONAS,
  GET_PERSONALISE_INTERESTS,
  SEND_USER_INTERESTS,
  SEND_USER_PERSONA,
  IS_USER_REGISTERED,
  GET_PERSONALISE_CATEGORY,
  SEND_PERSONALITY_CATEGORY,
  SHOW_USER_PERSONALISE_CATEGORY,
  GET_ALL_USERS,
  SHOW_USER_PERSONALISE_INTERESTS,
  GET_REACH_OUTS,
  GET_RECOMMENDED_TAGS,
  REACH_OUTS_BY_USERID,
  GET_FOLLOWERS,
  GET_SELECTED_PERSONA,
  GET_HOME_REACH_OUTS,
  FOLLOW_USER,
  UN_FOLLOW_USER,
  CHECK_FOLLOWING,
  SHOW_LOADER,
  UPDATE_FCM_TOKEN,
  UPLOAD_IMAGE,
  GET_USER_COMMUNITIES,
} from './../actions/user';
let checkuser = false;
export default function user(state = {}, action) {
  switch (action.type) {
    case SIGN_UP:
      console.log('SIGN up payload')
      return {
        ...state,
        loader: false,
        register: action.payload,
      };
    case LOGIN:
      console.log('login action reducer',action.payload)
      return {
        ...state,
        loader: false,
        login: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPassword: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };
    case OTP:
      return {
        ...state,
        loader: false,
        otp: action.payload,
      };
    case OTP_ERROR:
      return {
        ...state,
        loader: false,
        otpError: action.payload,
      };
    case FORGOT_PWD_OTP:
      return {
        ...state,
        getOtp: action.payload,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        loader: false,
        getUserInfo: action.payload,
      };
    case USER_DETAILS_ERROR:
      return {
        ...state,
        loader: false,
        userInfoError: action.payload,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        editProfile: action.payload,
      };
    case USER_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case USER_SIGN_OUT:
      return action.payload;
    //climatex
    case REQUEST_OTP_WITH_PHONENO:
      return {
        ...state,
        requestOtpWithPhoneno: action.payload,
      };
    case RESEND_OTP:
      return {
        ...state,
        resendOtp: action.payload,
      };
    case VERIFY_OTP:
      return {
        ...state,
        verifyOtp: action.payload,
      };
    case LOGIN_WITH_PHONENO:
      return {
        ...state,
        loginWithPhoneNum: action.payload,
      };
    case UPLOAD_PROFILE:
      return {
        ...state,
        uploadProfile: action.payload,
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploadImage: action.payload,
      };
    case SEND_OTP:
      return {
        ...state,
        sendOtp: action.payload,
      };
    case OTP_VERIFICATION:
      return {
        ...state,
        otpVerification: action.payload,
      };
    case SAVE_USER_ID:
      return {
        ...state,
        userUId: action.payload,
      };
    case GET_PERSONAS:
      return {
        ...state,
        personasList: action.payload,
      };
    case GET_PERSONALISE_INTERESTS:
      return {
        ...state,
        personaliseInterests: action.payload,
      };
    case GET_PERSONALISE_CATEGORY:
      return {
        ...state,
        personaliseCategory: action.payload,
      };
    case SEND_PERSONALITY_CATEGORY:
      return {
        ...state,
        userPersonalityCategory: action.payload,
      };

    case SEND_USER_INTERESTS:
      return {
        ...state,
        userInterests: action.payload,
      };
    case SEND_USER_PERSONA:
      return {
        ...state,
        userPersonas: action.payload,
      };
    case IS_USER_REGISTERED:
      return {
        ...state,
        isUserRegistered: action.payload,
      };
    case SHOW_USER_PERSONALISE_CATEGORY:
      return {
        ...state,
        userPersonaliseCategories: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        showAllUsers: action.payload,
      };
    case SHOW_USER_PERSONALISE_INTERESTS:
      return {
        ...state,
        userPersonaliseInterests: action.payload,
      };
    case GET_REACH_OUTS:
      return {
        ...state,
        getReachOuts: action.payload,
      };
    case GET_RECOMMENDED_TAGS:
      return {
        ...state,
        getRecommendedTags: action.payload,
      };
    case REACH_OUTS_BY_USERID:
      return {
        ...state,
        getReachOutsByUserId: action.payload,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        getFollowers: action.payload,
      };
    case GET_SELECTED_PERSONA:
      return {
        ...state,
        selectedPersona: action.payload,
      };
    case GET_HOME_REACH_OUTS:
      return {
        ...state,
        getReachOutsInHome: action.payload,
      };
    case GET_USER_COMMUNITIES:
      console.log('Payload inside action is', action.payload);
      return {
        ...state,
        userCommunities: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        followUser: action.payload,
      };
    case UN_FOLLOW_USER:
      return {
        ...state,
        unFollowUser: action.payload,
      };
    case CHECK_FOLLOWING:
      return {
        ...state,
        checkFollowing: action.payload,
      };
    case SHOW_LOADER:
      return {
        ...state,
        showLoader: action.payload,
      };
    case UPDATE_FCM_TOKEN:
      return {
        ...state,
        showLoader: action.payload,
      };
  }
  return state;
}
