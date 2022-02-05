import EventEmitter from 'events';
import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RtcEngine from 'react-native-agora';
import RNCallKeep from 'react-native-callkeep';
import uuid from 'uuid';
import NavigationService from './NavigationService';

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
      PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.log(
      'savchasvchjsavjhcvsahkcvsahjcvsajhvcsajhvcjhsavcjhsavjchsavhcvsajh',
    );
    console.warn(err);
  }
};

export default class RNCallKeepHandler extends EventEmitter {
  constructor(props) {
    super(props);
    this._engine = new RtcEngine();
    this.currentCallId = null;
    this.userIntegerId = props.userIntegerId;
    this.channelName = props.channelName;
    this.route = {isSecondUser: true, ...props.route.params};
    console.log('This is the props after adding second user', props);
    this.callTitle = props.callTitle;
    this.callBody = props.callBody;
    this.callId = Math.floor(Math.random() * 1000).toString();
    this.token = '';
    this.callType = props.callType;
    // Add RNCallKeep Events
    // RNCallKeep.addEventListener(
    //   'didReceiveStartCallAction',
    //   this.onAnswerCallAction,
    // );
    RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', this.onEndCallAction);
    RNCallKeep.addEventListener(
      'didDisplayIncomingCall',
      this.onIncomingCallDisplayed,
    );
    RNCallKeep.addEventListener(
      'didPerformSetMutedCallAction',
      this.onToggleMute,
    );
    RNCallKeep.addEventListener('didToggleHoldCallAction', this.onToggleHold);
    RNCallKeep.addEventListener('didPerformDTMFAction', this.onDTMFAction);
    RNCallKeep.addEventListener(
      'didActivateAudioSession',
      this.audioSessionActivated,
    );
    this.displayIncomingCall = () => {
      RNCallKeep.displayIncomingCall(
        this.callId,
        this.callTitle,
        this.callBody,
      );
    };

    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
        this.init();
      });
    }
  }

  // Initialise RNCallKeep
  setup = () => {
    const options = {
      ios: {
        appName: 'ReactNativeWazoDemo',
        imageName: 'sim_icon',
        supportsVideo: false,
        maximumCallGroups: '1',
        maximumCallsPerCallGroup: '1',
      },
      android: {
        alertTitle: 'Permissions Required',
        alertDescription:
          'This application needs to access your phone calling accounts to make calls',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'sim_icon',
        // additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
      },
    };

    try {
      RNCallKeep.setup(options);
      RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
    } catch (err) {
      console.error('initializeCallKeep error:', err.message);
    }
  };

  init = async () => {
    this._engine = await RtcEngine.create('208b847828514d91877a2f0fab5ae939');

    await this._engine.enableAudio();
    // await this._engine.enableLocalVideo();
    await this._engine.enableVideo();
    // if ((this.callType = 'videoCall')) {
    //   // Listen for the JoinChannelSuccess callback.
    //   // This callback occurs when the local user successfully joins the channel.
    //   this._engine.addListener(
    //     'JoinChannelSuccess',
    //     (channel, uid, elapsed) => {
    //       console.log(
    //         'JoinChannelSuccess in second one',
    //         channel,
    //         uid,
    //         elapsed,
    //       );

    //       // this.setState({
    //       //     joinSucceed: true
    //       // })
    //     },
    //   );
    //   this._engine.addListener('UserJoined', (uid, elapsed) => {
    //     console.log('UserJoined in second one', uid, elapsed);
    //     // const {peerIds} = this.state
    //     // if (peerIds.indexOf(uid) === -1) {
    //     //     this.setState({
    //     //         peerIds: [...peerIds, uid]
    //     //     })
    //     // }
    //   });
    //   this._engine.addListener('Error', error => {
    //     console.log('UserOffline in second one', error);
    //     // const {peerIds} = this.state
    //     // this.setState({
    //     //     // Remove peer ID from state array
    //     //     // peerIds: peerIds.filter(id => id !== uid)
    //     // })
    //   });

    //   let res = await fetch(
    //     'https://api.klimatelink.com/agora/rtc/' +
    //       this.channelName +
    //       '/2/userAccount/' +
    //       this.userIntegerId +
    //       '/?expiry=1800',
    //     {
    //       method: 'GET',
    //       timeout: 0,
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   );

    //   const response = await res.json();
    //   console.log('Response is ', response);
    //   if (response?.rtcToken) {
    //     this.token = response.rtcToken;
    //     console.log('this is the token', this.token);
    //   }
    // }
    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess in second one', channel, uid, elapsed);

      // this.setState({
      //     joinSucceed: true
      // })
    });
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined in second one', uid, elapsed);
      // const {peerIds} = this.state
      // if (peerIds.indexOf(uid) === -1) {
      //     this.setState({
      //         peerIds: [...peerIds, uid]
      //     })
      // }
    });
    this._engine.addListener('Error', error => {
      console.log('UserOffline in second one', error);
      // const {peerIds} = this.state
      // this.setState({
      //     // Remove peer ID from state array
      //     // peerIds: peerIds.filter(id => id !== uid)
      // })
    });

    let res = await fetch(
      'https://api.klimatelink.com/agora/rtc/' +
        this.channelName +
        '/2/userAccount/' +
        this.userIntegerId +
        '/?expiry=1800',
      {
        method: 'GET',
        timeout: 0,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const response = await res.json();
    console.log('Response is ', response);
    if (response?.rtcToken) {
      this.token = response.rtcToken;
      console.log('this is the token', this.token);
    }
    // const events = [
    //   'tokenExpired',
    //   'JoinChannelSuccess',
    //   'RejoinChannelSuccess',
    //   'LeaveChannel',
    //   'LocalUserRegistered',
    //   'UserInfoUpdated',
    //   'ConnectionStateChanged',
    //   'LocalVideoStateChanged',
    //   'RemoteVideoStateChanged',
    // ];
    // events.forEach(event => {
    //   // @ts-ignore
    //   this._engine.addListener(event, evt => {
    //     console.warn(event, evt);
    //     this.emit(event, evt);
    //   });
    // });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
  };

  joinChannel = async () => {
    console.log(
      'in join channel',
      this.token,
      this.channelName.toString(),
      null,
      this.userIntegerId,
    );
    console.log('hjsabhbashvbashbvsah engine', this._engine);
    if (this.token !== '') {
      console.log('In condition');
      await this._engine
        .joinChannelWithUserAccount(
          this.token,
          this.channelName,
          this.userIntegerId.toString(),
        )
        .then(res => {
          console.log('this is the response from join channel', res);
          if (this.callType == 'voiceCall') {
            NavigationService.navigate('AgoraVoiceCall', {
              route: this.route,
            });
          } else if (this.callType == 'liveStream') {
            NavigationService.navigate('AgoraLivestream', {
              route: this.route,
            });
          } else {
            NavigationService.navigate('AgoraVideoCall', {
              route: this.route,
            });
          }

          // NavigationService.navigate('AgoraVoiceCall', {
          //   route: this.route,
          // });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // Use startCall to ask the system to start a call - Initiate an outgoing call from this point
  startCall = ({handle, localizedCallerName}) => {
    console.log('Start call');
    // Your normal start call action
    RNCallKeep.startCall(this.getCurrentCallId(), handle, localizedCallerName);
  };

  reportEndCallWithUUID = (callUUID, reason) => {
    RNCallKeep.reportEndCallWithUUID(callUUID, reason);
  };

  // Event Listener Callbacks

  didReceiveStartCallAction = data => {
    Alert.alert('ewewe');
    let {handle, callUUID, name} = data;
    console.log(handle + '---' + callUUID + '----' + name);
    // Get this event after the system decides you can start a call
    // You can now start a call from within your app
  };

  onAnswerCallAction = async data => {
    // RNCallKeep.answerIncomingCall(this.callId);
    RNCallKeep.endCall(this.callId);
    console.log('basckjabskjbcaskjcbsakjbckjasbcjksabk');
    if (this.token && this.token !== '') {
      this.joinChannel();
    }
    // RNCallKeep.updateDisplay(this.callId,this.callTitle,this.callBody)
  };

  onEndCallAction = data => {
    RNCallKeep.endCall(this.callId);
  };

  // Currently iOS only
  onIncomingCallDisplayed = data => {
    console.log('Call displayed');
    // You will get this event after RNCallKeep finishes showing incoming call UI
    // You can check if there was an error while displaying
  };

  onToggleMute = data => {
    let {muted, callUUID} = data;
    console.log(data);
    // Called when the system or user mutes a call
  };

  onToggleHold = data => {
    let {hold, callUUID} = data;
    // Called when the system or user holds a call
  };

  onDTMFAction = data => {
    let {digits, callUUID} = data;
    // Called when the system or user performs a DTMF action
  };

  audioSessionActivated = data => {
    // you might want to do following things when receiving this event:
    // - Start playing ringback if it is an outgoing call
  };

  getCurrentCallId = () => {
    if (!this.currentCallId) {
      // this.currentCallId = uuid.v4();
    }

    return this.currentCallId;
  };

  render() {
    return (
      <View style={styles.body}>
        <Text>incoming call number: {this.state.number}</Text>
        <TouchableOpacity
          onPress={() => console.log('casjchasbhcjsab')}
          style={{
            width: 200,
            height: 200,
            justifyContent: 'center',
          }}>
          <Text>answer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('casjchasbhcjsab')}
          style={{
            width: 200,
            height: 200,
            justifyContent: 'center',
          }}>
          <Text>reject</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    backgroundColor: 'honeydew',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    padding: 20,
    fontSize: 20,
  },
  button: {},
});
