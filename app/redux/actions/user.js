import resToBody from './../resToBody/resToBody';
import {GET_COMMUNITIES_BY_USERID} from './communities';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const OTP = 'OTP';
export const OTP_ERROR = 'OTP_ERROR';
export const SHOW_LOADER = 'SHOW_LOADER';

export const FORGOT_PWD_OTP = 'FORGOT_PWD_OTP';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const USER_LOADER = 'USER_LOADER';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const USER_DETAILS_ERROR = 'USER_DETAILS_ERROR';

export const USER_SIGN_OUT = 'USER_SIGN_OUT';

export const REQUEST_OTP_WITH_PHONENO = 'REQUEST_OTP_WITH_PHONENO';
export const RESEND_OTP = 'RESEND_OTP';
export const VERIFY_OTP = 'VERIFY_OTP';
export const LOGIN_WITH_PHONENO = 'LOGIN_WITH_PHONENO';
export const UPDATE_FCM_TOKEN = 'UPDATE_FCM_TOKEN';
export const UPLOAD_PROFILE = 'UPLOAD_PROFILE';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const SEND_OTP = 'SEND_OTP';
export const OTP_VERIFICATION = 'OTP_VERIFICATION';

export const SAVE_USER_ID = 'SAVE_USER_ID';

export const GET_PERSONAS = 'GET_PERSONAS';
export const GET_PERSONALISE_INTERESTS = 'GET_PERSONALISE_INTERESTS';
export const SEND_USER_INTERESTS = 'SEND_USER_INTERESTS';
export const SEND_USER_PERSONA = 'SEND_USER_PERSONA';
export const IS_USER_REGISTERED = 'IS_USER_REGISTERED';
export const GET_PERSONALISE_CATEGORY = 'GET_PERSONALISE_CATEGORY';
export const SEND_PERSONALITY_CATEGORY = 'SEND_PERSONALITY_CATEGORY';

export const SHOW_USER_PERSONALISE_CATEGORY = 'SHOW_USER_PERSONALISE_CATEGORY';

export const SHOW_USER_PERSONALISE_INTERESTS =
  'SHOW_USER_PERSONALISE_INTERESTS';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_REACH_OUTS = 'GET_REACH_OUTS';
export const GET_RECOMMENDED_TAGS = 'GET_RECOMMENDED_TAGS';
export const REACH_OUTS_BY_USERID = 'REACH_OUTS_BY_USERID';
export const GET_FOLLOWERS = 'GET_FOLLOWERS';
export const GET_SELECTED_PERSONA = 'GET_SELECTED_PERSONA';
export const GET_HOME_REACH_OUTS = 'GET_HOME_REACH_OUTS';

export const FOLLOW_USER = 'FOLLOW_USER';
export const UN_FOLLOW_USER = 'UN_FOLLOW_USER';
export const CHECK_FOLLOWING = 'CHECK_FOLLOWING';
export const GET_USER_COMMUNITIES = 'GET_USER_COMMUNITIES';

const CLIMATELINK_BASEURL = 'https://api.klimatelink.com/api/v1/';

export function signUp(userObj) {
  console.log('registration_action' + JSON.stringify(userObj));
  return async dispatch => {
    // dispatch({
    //   type: USER_LOADER,
    //   payload: true,
    // });
    const res = await fetch(CLIMATELINK_BASEURL + `user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        dateOfBirth: userObj.dateOfBirth,
        gender: userObj.gender, // 0 - Male,1 - Female
        email: userObj.email,
        phoneNumber: userObj.phoneNumber,
        phoneNumberCode: userObj.phoneNumberCode,
        password: userObj.password,
        isAcceptedTc: userObj.isAcceptedTc,
        emailConfirmed: false,
        phoneNumberConfirmed: false,
        userName: userObj.userName,
        about: userObj.about,
        address: userObj.address,
        profilePicPath: userObj.profilePicPath,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('signUp=====', responseJson);
        return dispatch({
          type: SIGN_UP,
          payload: responseJson,
        });
      })
      .catch(err => {
        console.log('signUp_123_error', err);
        return dispatch({
          type: SIGN_UP,
          payload: err,
        });
      });
    // const body = await resToBody(res);
    // console.log("signUp_123:", body);
    // return dispatch({
    //   type: SIGN_UP,
    //   payload: body,
    // });
  };
}

export function logIn(data) {
  console.log('login_action:', data);
  return async dispatch => {
    // dispatch({
    //   type: USER_LOADER,
    //   payload: true,
    // });
    const res = await fetch(CLIMATELINK_BASEURL + `user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberCode: data.phoneNumberCode,
        phoneNumber: data.phoneNumber,
        password: data.password,
      }),
    });
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: LOGIN,
      payload: body,
    });
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   return dispatch({
    //     type: LOGIN,
    //     payload: responseJson,
    //   });
    // })
    // .catch((err) => {
    //   return dispatch({
    //     type: LOGIN,
    //     payload: "error",
    //   });
    //   console.log("login_error", err);
    // });
  };
}

export function onOtp(userId, otp, tokenCode) {
  console.log('user_id', userId);
  return async dispatch => {
    dispatch({
      type: USER_LOADER,
      payload: true,
    });
    const res = await fetch(CONSENTWALLETURL + `api/User/otpcheck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: tokenCode,
        otp: otp,
        userid: userId,
      }),
    });
    // .then(async (response) => await response.json())
    // .then(async (responseJson) => {
    //   return await dispatch({
    //     type: OTP,
    //     payload: responseJson,
    //   });
    // })
    // .catch((error) => {
    //   console.log("OTP_API_CATCH" + JSON.stringify(error));

    //   return dispatch({
    //     type: OTP_ERROR,
    //     payload: error,
    //   });
    // });
    const body = await resToBody(res);
    return await dispatch({
      type: OTP,
      payload: body,
    });
  };
}

export function forgotPwdOtp(data) {
  return async dispatch => {
    return dispatch({
      type: FORGOT_PWD_OTP,
      payload: data,
    });
  };
}
export function getUserDetails(userId) {
  console.log('getUserDetails_actions');
  return async dispatch => {
    const res = await fetch(
      'https://api.theclimatelink.com/api/v1/user/' + userId,
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
          type: GET_USER_DETAILS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_USER_DETAILS_CATCH' + JSON.stringify(error));
        return dispatch({
          type: USER_DETAILS_ERROR,
          payload: error,
        });
      });
  };
}

export function onEditProfile(userObj) {
  console.log('userObj', userObj);
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: userObj.userID,
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        dateOfBirth: userObj.dateOfBirth,
        gender: userObj.gender,
        email: userObj.email,
        userName: userObj.userName,
        about: userObj.about,
        address: userObj.address,
        profilePicPath: userObj.profilePicPath,
        jobTitle: userObj.job,
        companyName: userObj.companyName,
        isSocialLogin: userObj.isSocialLogin,
        provider: userObj.provider,
        providerId: userObj.providerId,
        phoneNumber: userObj.phoneNumber,
        phoneNumberCode: userObj.phoneNumberCode,
      }),
    });

    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: EDIT_PROFILE,
      payload: body,
    });
  };
}

export function updateLoginAfterLinkedInLogin(user) {
  //console.log("user=======", user)
  return async dispatch => {
    return dispatch({
      type: SIGN_UP,
      payload: user,
    });
  };
}

export function showLoader(data) {
  return async dispatch => {
    return dispatch({
      type: SHOW_LOADER,
      payload: data,
    });
  };
}

export function signOut() {
  return async dispatch => {
    return dispatch({
      type: USER_SIGN_OUT,
      payload: {},
    });
  };
}

//new methods for climatex app

export function requestOtpWithPhoneno(phoneNumberWithCode) {
  console.log('requestOtpWithPhoneno_API', phoneNumberWithCode);
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `notification/twilio/sendsms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumberWithCode: phoneNumberWithCode,
        }),
      },
    );
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: REQUEST_OTP_WITH_PHONENO,
      payload: body,
    });
  };
}

export function resendOtp(data) {
  console.log('resendOtp_123', data);
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `notification/twilio/sendsms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumberWithCode: data.phoneNumberWithCode,
        }),
      },
    );
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: RESEND_OTP,
      payload: body,
    });
  };
}

export function verifyOtp(data) {
  console.log('signup_otp_verify', data);
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `notification/twilio/verifysms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumberWithCode: data.phoneNumberWithCode,
          token: data.otpValue,
        }),
      },
    );
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: VERIFY_OTP,
      payload: body,
    });
  };
}

export function loginWithPhoneNo(data) {
  console.log('loginWithPhoneNo_action:', data);
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumberCode: data.phoneNumberCode,
        phoneNumber: data.phoneNumber,
        password: '', // value not needed
      }),
    });
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: LOGIN_WITH_PHONENO,
      payload: body,
    });
  };
}

export async function updateFcmToken(data) {
  console.log('fcmToken', data);
  const res = await fetch(CLIMATELINK_BASEURL + `user/fcm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: data.userId,
      fcmToken: data.fcmToken,
    }),
  });
  const body = await resToBody(res);
  console.log('DDDDDDD', body);
  return body;
}

export function isUserRegistered(value) {
  return async dispatch => {
    return dispatch({
      type: IS_USER_REGISTERED,
      payload: value,
    });
  };
}

export function uploadProfile(base64File) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `fileupload/b64`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: 'ProfilePic', //keep - ProfilePic
        imageB64: base64File, // base64 converted image
        folderId: 0, // pass zero
      }),
    });
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: UPLOAD_PROFILE,
      payload: body,
    });
  };
}
export function uploadImage(imagePath) {
  return async dispatch => {
    console.log('Image path is ', imagePath);
    const res = await fetch(CLIMATELINK_BASEURL + `fileupload/b64`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName:'Image.png',
        imageB64: imagePath,
        folderId: 1,
      }),
    });
    const body = await resToBody(res);
    console.log('Image upload response==========', body);
    return dispatch({
      type: UPLOAD_IMAGE,
      payload: body,
    });
  };
}

export function sendOtp(phoneNumberWithCode) {
  console.log('sendOtp_API', phoneNumberWithCode);

  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `notification/twilio/sendsms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumberWithCode: phoneNumberWithCode,
        }),
      },
    );
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: SEND_OTP,
      payload: body,
    });
  };
}

export function otpVerification(data) {
  console.log('otpVerification_fgtpwd', data);
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `notification/twilio/verifysms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumberWithCode: data.phoneNumberWithCode,
          token: data.otpValue,
        }),
      },
    );
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: OTP_VERIFICATION,
      payload: body,
    });
  };
}

export function resetPassword(data) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `user/forgetpassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber: data.phoneNumber,
        newPassword: data.newPassword,
      }),
    });
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: RESET_PASSWORD,
      payload: body,
    });
  };
}

export function forgotPassword(data) {
  return async dispatch => {
    return dispatch({
      type: FORGOT_PASSWORD,
      payload: data,
    });
  };
}

export function saveUserId(data) {
  return async dispatch => {
    return dispatch({
      type: SAVE_USER_ID,
      payload: data,
    });
  };
}

export function getPersonas() {
  // console.log('getPersonas_actions');
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'personas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_PERSONAS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_PERSONAS_CATCH' + JSON.stringify(error));
      });
  };
}

export function getPersonaliseInterests() {
  // console.log('getPersonas_actions');
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'interests', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_PERSONALISE_INTERESTS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_PERSONALISE_INTERESTS_CATCH' + JSON.stringify(error));
      });
  };
}

export function sendUserInterests(data) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `user-interests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.userId,
        subInterestId: data.subInterestId,
      }),
    });
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: SEND_USER_INTERESTS,
      payload: body,
    });
  };
}

export function sendUserPersona(data) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `user-persona`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.userId,
        personaId: data.personaId,
      }),
    });
    const body = await resToBody(res);
    // console.log("Login_123:", body)
    return dispatch({
      type: SEND_USER_PERSONA,
      payload: body,
    });
  };
}

export function getPersonaliseCategory() {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `personalise-category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_PERSONALISE_CATEGORY,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_PERSONALISE_CATEGORY_CATCH' + JSON.stringify(error));
      });
  };
}

export function sendUserPersonalityCategory(data) {
  console.log('sendUserPersonalityCategory', data);
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `user-personalisecategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await resToBody(res);
    console.log('SEND_PERSONALITY_CATEGORY:', body);
    return dispatch({
      type: SEND_PERSONALITY_CATEGORY,
      payload: body,
    });
  };
}

export function showUserPersonaliseCategory(userId) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `user-personalisecategory/fetch/` + userId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const body = await resToBody(res);
    console.log('SEND_PERSONALITY_CATEGORY:', body);
    return dispatch({
      type: SHOW_USER_PERSONALISE_CATEGORY,
      payload: body,
    });
  };
}

export function showUserPersonaliseInterests(userId) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `user-interests/user/` + userId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const body = await resToBody(res);
    console.log('SEND_PERSONALITY_INTERESTS:', body);
    return dispatch({
      type: SHOW_USER_PERSONALISE_INTERESTS,
      payload: body,
    });
  };
}

export function getAllUsers() {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_ALL_USERS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_ALL_USERS_CATCH' + JSON.stringify(error));
      });
  };
}

export function getReachOuts() {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'reach_outs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_REACH_OUTS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_REACH_OUTS_CATCH' + JSON.stringify(error));
      });
  };
}

export function getRecommendedTags() {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'tags', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: GET_RECOMMENDED_TAGS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_REACH_OUTS_CATCH' + JSON.stringify(error));
      });
  };
}

export function reachOutByUserId(userId) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'reach_outs/user/' + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        return dispatch({
          type: REACH_OUTS_BY_USERID,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_REACH_OUTS_BYID_CATCH' + JSON.stringify(error));
      });
  };
}

export function getUserFollowers(userId) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + 'interactions/followers/' + userId,
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
          type: GET_FOLLOWERS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_FOLLOWERS_CATCH' + JSON.stringify(error));
      });
  };
}

export function getSelectedPersona(userId) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `user-persona/user/` + userId,
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
          type: GET_SELECTED_PERSONA,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_ALL_USERS_CATCH' + JSON.stringify(error));
      });
  };
}

export function getHomeReachOuts(guid) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + 'hot_matches/user/' + guid, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(async response => {
        const body = await response;
        console.log('bodybodybodybodybody',body)
        return dispatch({
          type: GET_HOME_REACH_OUTS,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_HOME_REACH_OUTS_CATCH' + JSON.stringify(error));
      });
  };
}

export function getUserCommunities(guid) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + 'communitymember/community/' + guid,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(async response => {
        const body = await response.result;
        return dispatch({
          type: GET_USER_COMMUNITIES,
          payload: body,
        });
      })
      .catch(error => {
        console.log('GET_HOME_REACH_OUTS_CATCH' + JSON.stringify(error));
      });
  };
}

export function followUser(data) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `interactions/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerId: data.followerId,
        followingId: data.followingId,
      }),
    });
    const body = await resToBody(res);

    return dispatch({
      type: FOLLOW_USER,
      payload: body,
    });
  };
}

export function unFollowUser(data) {
  return async dispatch => {
    const res = await fetch(CLIMATELINK_BASEURL + `interactions/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerId: data.followerId,
        followingId: data.followingId,
      }),
    });
    const body = await resToBody(res);

    return dispatch({
      type: UN_FOLLOW_USER,
      payload: body,
    });
  };
}

export function checkFollowing(data) {
  return async dispatch => {
    const res = await fetch(
      CLIMATELINK_BASEURL + `interactions/checkfollowing`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followerId: data.followerId,
          followingId: data.followingId,
        }),
      },
    );
    const body = await resToBody(res);

    return dispatch({
      type: CHECK_FOLLOWING,
      payload: body,
    });
  };
}

export default {
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
  SHOW_USER_PERSONALISE_INTERESTS,
  GET_ALL_USERS,
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
  signUp,
  logIn,
  forgotPassword,
  resetPassword,
  onOtp,
  forgotPwdOtp,
  getUserDetails,
  onEditProfile,
  requestOtpWithPhoneno,
  resendOtp,
  verifyOtp,
  loginWithPhoneNo,
  uploadProfile,
  sendOtp,
  otpVerification,
  saveUserId,
  getPersonas,
  getPersonaliseInterests,
  isUserRegistered,
  sendUserInterests,
  sendUserPersona,
  getPersonaliseCategory,
  sendUserPersonalityCategory,
  showUserPersonaliseCategory,
  showUserPersonaliseInterests,
  getAllUsers,
  getReachOuts,
  getRecommendedTags,
  reachOutByUserId,
  getUserFollowers,
  getSelectedPersona,
  getHomeReachOuts,
  followUser,
  unFollowUser,
  checkFollowing,
  updateLoginAfterLinkedInLogin,
  showLoader,
  updateFcmToken,
  uploadImage,
  getUserCommunities,
};
