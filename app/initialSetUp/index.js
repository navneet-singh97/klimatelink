import React, {useEffect, Component} from 'react';
import {View} from 'react-native';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import RNCallKeep from 'react-native-callkeep';
import RNCallKeepHandler from './RNCallKeepHandler';
// import {CONSTANTS as CK_CONSTANTS, RNCallKeep} from 'react-native-callkeep';
import RtmAdapter from '../screens/agora/rtm-adapter';
import {v4 as uuidv4} from 'uuid';
import {cred} from '../screens/agora/credentials';
import RtcAdapter from '../screens/agora/rtc-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from './NavigationService';
// import invokeApp from 'react-native-invoke-app';

function setCallKeep(remoteMessage) {
  let message = remoteMessage;
  console.log('This is the remote message', remoteMessage);
  console.log('This is the liveStreamliveStream message', remoteMessage);

  if (message.data.additionalProp1 == 'voiceCall') {
    let additionalData = JSON.parse(remoteMessage.data.additionalProp4);
    let callKeepHandler = new RNCallKeepHandler({
      userIntegerId: message.data.additionalProp2,
      channelName: remoteMessage.data.additionalProp3,
      callTitle: message.notification.title,
      callBody: message.notification.body,
      route: additionalData,
      callType: message.data.additionalProp1,
    });
    callKeepHandler.setup();
    callKeepHandler.displayIncomingCall();
  } else if (message.data.additionalProp1 == 'liveStream') {
    const dd = JSON.parse(remoteMessage.data.additionalProp4);
    console.log('dddddd', dd);
    // NavigationService.navigate('AgoraLivestream', {
    //   myName: dd.name,
    //   myIntegerID: dd.id,
    //   channelName: message.data.additionalProp3,
    //   isSecondUser: true,
    // });
  }
  // const yourObject = {route: 'Dashboard'};
  // invokeApp({
  //   data: yourObject,
  // });
  // } else if (message.data.additionalProp1 == 'videoCall') {
  //   let additionalData = JSON.parse(remoteMessage.data.additionalProp4);
  //   let callKeepHandler = new RNCallKeepHandler({
  //     userIntegerId: message.data.additionalProp2,
  //     channelName: remoteMessage.data.additionalProp3,
  //     callTitle: message.notification.title,
  //     callBody: message.notification.body,
  //     route: additionalData,
  //     callType: message.data.additionalProp1,
  //   });
  //   callKeepHandler.setup();
  //   callKeepHandler.displayIncomingCall();
  // }
}
// async function enterIntoAgora() {
//   // agorainit = async () => {

//   let uuid = uuidv4();

//   let client = new RtmAdapter();
//   let clientRTC = new RtcAdapter();

//   try {
//     const response = await fetch(
//       'https://api.theclimatelink.com//agora/rtm/' + uuid + '/',
//       {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     const responseJson = await response.json();

//     console.log(JSON.stringify(responseJson, null, 1), 'resssss');
//     if (responseJson?.rtmToken) {
//       cred.agora_app_token = responseJson.rtmToken;
//       client.login(uuid, responseJson.rtmToken).then(() => {
//         console.log('login success');
//       });
//       clientRTC.login(uuid, responseJson.rtmToken).then(async () => {
//         clientRTC = await RtcEngine.create('208b847828514d91877a2f0fab5ae939');
//       });
//     }
//   } catch (err) {
//     console.log(err, 'init error');
//     alert('Something went wrong. Please try later');
//   }
//   // };
//   clientRTC.addListener('UserJoined', (uid, elapsed) => {
//     console.log('UserJoined', uid, elapsed);
//     Alert.alert('herer');
//     // const {peerIds} = this.state;
//     // if (peerIds.indexOf(uid) === -1) {
//     //   this.setState({
//     //     peerIds: [...peerIds, uid],
//     //   });
//     // }
//   });
//   clientRTC.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
//     // console.log('JoinChannelSuccess', channel, uid, elapsed);
//   });
// }

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    //console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'the old token');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('bcsahbckhjsabchksabckhasbkchbsakjcsa', fcmToken);
      if (fcmToken) {
        console.log(fcmToken, 'the new genrated token');
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error in fcmToken');
      //   showError(error.message);
    }
  }
};

function FirebaseSetUp() {
  requestUserPermission();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setCallKeep(remoteMessage);
    });
    const backgroundHandler = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        setCallKeep(remoteMessage);
      },
    );
    return unsubscribe;
  }, []);

  return <View />;
}

export default FirebaseSetUp;
// export default setCallKeep;

// enterIntoAgora();
