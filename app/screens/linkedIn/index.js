import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import LinkedInModal from '../../../lib/react-native-linkedin/lib/index';
import {useDispatch} from 'react-redux';
// import  crashlytics  from "@react-native-firebase/crashlytics";

import {
  showLoader,
  updateLoginAfterLinkedInLogin,
} from '../../redux/actions/user';

const LinkedInLogin = props => {
  //console.log("=======", props)
  const linkedRef = useRef();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const dispatch = useDispatch();

  // crashlytics().log("app crashed")

  // useEffect(async() => {
  //  await fetch(`https://www.tehclimatelink.com/login-success/auth/v2/authorization?response_type=code&client_id=8613e6z8ra2rpf&redirect_uri=www.climatelink.com/login-success&scope=r_liteprofile%20r_emailaddress%20w_remember_social`,{
  //      method:'GET',
  //      headers:{
  //          Accept:'application/json'
  //      }
  //  }).then((res)=>{
  //         console.log(res);
  //     }).catch(err => {console.log(err)} )
  // }, [])

  const fetchDetails_V1 = async ({access_token}) => {
    // console.log('AAAAAAAAAAAAAAAAA', access_token);
    dispatch(showLoader(true));
    await fetch('https://api.linkedin.com/v2/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
      .then(async response => {
        const profileResponse = await response.json();
        await fetch(
          'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          },
        )
          .then(async response2 => {
            const emailResponse = await response2.json();
            console.log(
              emailResponse,
              'emailResponseemailResponseemailResponseemailResponse',
            );
            await fetch(
              'https://api.klimatelink.com/api/v1/user/sociallogin',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  provider: 'LinkedIn',
                  providerId: profileResponse.id,
                  email: emailResponse.elements[0]['handle~'].emailAddress,
                }),
              },
            )
              .then(async response3 => {
                const loginResponse = await response3.json();
                await dispatch(showLoader(false));
                if (loginResponse.result.isProfileMissing) {
                  props.navigation.push('EditProfile_V1', {
                    user: loginResponse,
                    isSocialLogin: true,
                    provider: 'LinkedIn',
                    providerId: profileResponse.id,
                    email: emailResponse.elements[0]['handle~'].emailAddress,
                    firstName: profileResponse.localizedFirstName,
                    lastName: profileResponse.localizedLastName,
                  });
                } else {
                  await dispatch(updateLoginAfterLinkedInLogin(loginResponse));
                  await dispatch(showLoader(false));
                  props.navigation.push('Main', {
                    navigateFrom: 'Social Login',
                    userId: loginResponse.result.uid,
                  });
                }
              })
              .catch(err => {
                console.log(err);
                dispatch(showLoader(false));
              });
          })
          .catch(err => {
            console.log(err);
            dispatch(showLoader(false));
          });
      })
      .catch(err => {
        console.log(err);
        dispatch(showLoader(false));
      });
  };

  const fetchDetails = async ({access_token}) => {
    try {
      const response = await fetch('https://api.linkedin.com/v2/me', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });
      const payload = await response.json();
      setFirstName(payload.localizedFirstName);
      setLastName(payload.localizedLastName);
      setId(payload.id);
      const response2 = await fetch(
        'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );
      const emailPayload = await response2.json();
      if (emailPayload) {
        //console.log("emailPayload", emailPayload.elements[0]["handle~"].emailAddress)
        setEmail(emailPayload.elements[0]['handle~'].emailAddress);
      }
      //navigation.navigate("Dashboard");
      if (email != '') {
        const loginResponse = await fetch(
          'https://api.theclimatelink.com/api/v1/user/sociallogin',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              provider: 'LinkedIn',
              providerId: id,
              email: email,
            }),
          },
        );
        const loginPayload = await loginResponse.json();
        console.log('payload', loginPayload);
        if (loginPayload.result.isProfileMissing) {
          props.navigation.push('EditProfile_V1', {
            user: loginPayload,
            isSocialLogin: true,
            provider: 'LinkedIn',
            providerId: id,
            email,
            firstName,
            lastName,
          });
        } else {
          await updateLoginAfterLinkedInLogin(loginPayload);
          props.navigation.push('Main', {
            navigateFrom: 'Social Login',
            userId: loginPayload.result.uid,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{alignItems: 'center', alignContent: 'center'}}>
      <LinkedInModal
        ref={linkedRef}
        clientID="77892ptmcn1bg9"
        clientSecret="5m5XnruoeizfJP47"
        redirectUri="https://www.theklimatelink.com/login-success"
        onSuccess={aa => {
          console.log(aa, 'token==================');
          fetchDetails_V1(aa);
        }}
        onSignIn={() => {
          console.log('dsd');
        }}
        onError={err => console.log(err, 'errors')}
        shouldGetAccessToken={true}
      />
    </View>
  );
};
//8613e6z8ra2rpf/ocFZFbe8eXtd4uAE
export default LinkedInLogin;
