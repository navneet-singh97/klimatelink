import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Platform,
  View,
  PermissionsAndroid,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Share,
  ScrollView,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  RtcEngineContext,
  ChannelProfile,
  ClientRole,
  VideoRemoteState,
} from 'react-native-agora';
import {connect} from 'react-redux';
import {Header} from '../../components/header';
import user, {
  uploadProfile,
  uploadImage,
  onEditProfile,
  getUserDetails,
  updateLoginAfterLinkedInLogin,
} from './../../redux/actions/user';
import {sendPushNotifications} from './../../redux/actions/communities';
import {cred} from './credentials';
import {ActivityIndicator} from 'react-native';
import {colors} from 'react-native-elements';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const videoStateMessage = state => {
  switch (state) {
    case VideoRemoteState.Stopped:
      return 'Video turned off by Host';

    case VideoRemoteState.Frozen:
      return 'Connection Issue, Please Wait';

    case VideoRemoteState.Failed:
      return 'Network Error';
  }
};

async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

class AgoraLivestream extends React.Component {
  constructor(props) {
    super(props);
    this._engine = new RtcEngine();
    this.state = {
      isSecondUser: this.props.route?.params?.isSecondUser || false,
      myName: this.props.route?.params?.isSecondUser
        ? this.props.user
        : this.props.route.params.myName,
      channelId:
        this.props.route.params.channelName ||
        Math.floor(Math.random() * 100000000).toString(),
      openMicrophone: true,
      enableSpeakerphone: true,
      joinSucceed: this.props.route?.params?.isSecondUser ? true : false,
      peerIds: [],
      curTime: new Date().toLocaleString(),
      fcmToken: this.props.route.params.fcmToken,
      userIntegerId: this.props.route.params.userIntegerId,
      userName: this.props.route.params.name,
      myIntegerID: this.props.route.params.myIntegerID,
      isBroadcaster: this.props.route.params.type === 'create',
      broadcasterVideoState: VideoRemoteState.Decoding,
    };
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
        this.init();
      });
    } else if (Platform.OS == 'ios') {
      this.init();
    }
  }

  onShare = async () => {
    try {
      this._engine.leaveChannel();
      this.props.navigation.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };
  // Other code. See step 5 to step 9.
  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.peerIds.length > 0) {
    }
    if (prevState.peerIds.length > 0 && this.state.peerIds.length == 0) {
      this._engine.leaveChannel();
    }
  }

  componentWillUnmount() {}

  init = async () => {
    this._engine = await RtcEngine.create(cred.agora_AppID);
    await this._engine.enableAudio();
    await this._engine.enableVideo();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    if (this.state.isBroadcaster) {
      this._engine.setClientRole(ClientRole.Broadcaster);
    }
    if (this.state.isSecondUser) {
      console.log('this.state.isSecondUser', this.state.isSecondUser);
      await this._engine.setClientRole(ClientRole.Audience);
      await this._engine.enableLocalVideo(true);
    }

    this._engine.addListener('RemoteVideoStateChanged', (uid, state) => {
      if (uid !== this.state.myIntegerID)
        this.setState({broadcasterVideoState: state});
    });

    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      const {peerIds} = this.state;
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          peerIds: [...peerIds, uid],
        });
      }
    });
    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        peerIds: peerIds.filter(id => id !== uid),
      });
      this._leaveChannel();
    });

    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      this.setState({
        joinSucceed: true,
      });
    });

    if (!this.state.isSecondUser) alert('Channel' + this.state.channelId);

    // console.log('Before api call in first', this.state.myIntegerID);

    let isPublisher = this.state.isSecondUser
      ? '/2/userAccount/'
      : '/1/userAccount/';

    console.log(
      'LINKKKKKK_+++++',
      this.state.channelId,
      isPublisher,
      this.state.myIntegerID,
    );

    const response = await fetch(
      'https://api.klimatelink.com/agora/rtc/' +
        this.state.channelId +
        isPublisher +
        this.state.myIntegerID +
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
    const responseJson = await response.json();
    console.log('Response from the api is', responseJson);
    if (responseJson?.rtcToken) {
      this._joinChannel(responseJson?.rtcToken)
        .then(res => {
          let fcmArray = [];
          // console.log('Response from the api is', res);
          // fcmArray.push({
          //   deviceToken:
          //     'cmMPbIn7SkyEsLrd2qAymx:APA91bHyy8mWwGx_W6NmEODdQi9DVYmXojc0fjsAt2fZJFiH4tqn4vrf01dEsdkd0DKgBUKxLTNJ0-s15Ufuf6ho0eZl5TEpFpaeMXAGFyIigVBV9Z_V23wPb08KVz5A1xYsO4Tlz5wq',
          //   title: this.state.myName + ' is calling you',
          //   body: 'Video Call from ' + this.state.myName + '(KlimateX)',
          //   data: {
          //     additionalProp1: 'liveStream',
          //     additionalProp2: this.state.userIntegerId,
          //     additionalProp3: this.state.channelId,
          //     additionalProp4: JSON.stringify({
          //       name: 'Vishal Sharma',
          //       id: 120,
          //     }),
          //     // additionalProp5: responseJson?.rtcToken,
          //   },
          // });
          // this.props.sendPushNotifications(fcmArray);
          // if (this.props.route.params.array) {
          //   this.props.route.params.array.map(item => {
          //     if (item.fcmToken) {
          //       fcmArray.push({
          //         deviceToken: item.fcmToken,
          //         title: this.state.myName + ' is calling you',
          //         body: 'Video Call from ' + this.state.myName + '(KlimateX)',
          //         data: {
          //           additionalProp1: 'liveStream',
          //           additionalProp2: this.state.userIntegerId,
          //           additionalProp3: this.state.channelId,
          //           additionalProp4: JSON.stringify({
          //             name: item.name,
          //             id: item.id,
          //           }),
          //         },
          //       });
          //     }
          //   });
          //   /**
          //    * Push Notification
          //    */
          //   // this.props.sendPushNotifications(fcmArray);
          // }
        })
        .catch(error => {
          console.log('This is the join channel error', error);
        });
    }
    // }
  };

  onSwitchCamera = () => {
    this._engine.switchCamera();
  };

  _joinChannel = async token => {
    console.log(
      'Started to join channel',
      token,
      this.state.channelId,
      null,
      this.state.myIntegerID,
    );
    return this._engine.joinChannel(
      token,
      this.state.channelId,
      null,
      this.state.myIntegerID,
    );
  };

  // Turn the microphone on or off.
  _switchMicrophone = () => {
    const {openMicrophone} = this.state;
    this._engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        this.setState({openMicrophone: !openMicrophone});
      })
      .catch(err => {
        console.warn('enableLocalAudio', err);
      });
  };

  // Switch the audio playback device.
  _switchSpeakerphone = () => {
    const {enableSpeakerphone} = this.state;
    this._engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        this.setState({enableSpeakerphone: !enableSpeakerphone});
      })
      .catch(err => {
        console.warn('setEnableSpeakerphone', err);
      });
  };

  renderHost = () =>
    this.state.broadcasterVideoState === VideoRemoteState.Decoding ? (
      <RtcRemoteView.SurfaceView
        uid={1}
        style={styles.fullscreen}
        channelId={this.state.channelId}
      />
    ) : (
      <View style={styles.broadcasterVideoStateMessage}>
        <Text style={styles.broadcasterVideoStateMessageText}>
          {videoStateMessage(this.state.broadcasterVideoState)}
        </Text>
      </View>
    );

  _renderRemoteVideos = () => {
    console.log('_renderRemoteVideos_renderRemoteVideos');
    const {peerIds} = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={styles.remoteContainerContent}
        horizontal={true}>
        {peerIds.map(value => {
          console.log('valuevalue', value);
          return (
            <RtcRemoteView.SurfaceView
              style={styles.fullscreen}
              uid={value}
              channelId={this.state.channelId}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };

  renderLocal = () => {
    console.log('renderLocal==========================');
    return (
      <RtcLocalView.SurfaceView
        renderMode={VideoRenderMode.Hidden}
        style={styles.fullscreen}
        channelId={this.state.channelId}
      />
    );
  };

  render() {
    const {openMicrophone, enableSpeakerphone, peerIds} = this.state;
    return (
      <View style={styles.container}>
        {!this.state.joinSucceed ? (
          <>
            <ActivityIndicator size={60} color="#222" />
            <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
          </>
        ) : (
          <>
            {/* {this.state.isBroadcaster ? this.renderLocal() : this.renderHost()} */}
            {this.state.isBroadcaster ? this.renderLocal() : <></>}
            {this._renderRemoteVideos()}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={this.onShare}>
                <Text style={styles.buttonText}>
                  {this.state.isSecondUse ? 'Exit' : 'End Live Stream'}
                </Text>
              </TouchableOpacity>
              {!this.state.isSecondUser && (
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onSwitchCamera}>
                  <Text style={styles.buttonText}>Switch Camera</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    );
  }

  //   _renderVideos = () => {
  //     const {joinSucceed} = this.state;
  //     return joinSucceed ? (
  //       <View style={styles.fullView}>
  //         <RtcLocalView.SurfaceView
  //           style={styles.max}
  //           // channelId={this.state.channelName}
  //           channelId={this.state.channelId}
  //           renderMode={VideoRenderMode.Hidden}
  //         />
  //         {this._renderRemoteVideos()}
  //       </View>
  //     ) : null;
  //   };

  //   _renderRemoteVideos = () => {
  //     const {peerIds} = this.state;
  //     return (
  //       <ScrollView
  //         style={styles.remoteContainer}
  //         contentContainerStyle={{paddingHorizontal: 2.5}}
  //         horizontal={true}>
  //         {peerIds.map((value, index, array) => {
  //           return (
  //             <>
  //               <RtcRemoteView.SurfaceView
  //                 style={styles.remote}
  //                 uid={value}
  //                 channelId={this.state.channelId}
  //                 renderMode={VideoRenderMode.Hidden}
  //                 zOrderMediaOverlay={true}
  //               />
  //             </>
  //           );
  //         })}
  //       </ScrollView>
  //     );
  //   };

  _leaveChannel = async () => {
    console.log('test');
    let a = await this._engine?.leaveChannel();
    // await this._engine.destroy();
    console.log('hello', a);
    this.props.navigation.goBack();
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'black',
  },
  fullscreen: {
    width: dimensions.width,
    height: dimensions.height,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    width: 150,
    backgroundColor: '#fff',
    marginBottom: 50,
    paddingVertical: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 17,
  },
  broadcasterVideoStateMessage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  remoteContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 5,
  },
  broadcasterVideoStateMessageText: {
    color: '#fff',
    fontSize: 20,
  },
  remoteContainerContent: {
    paddingHorizontal: 2.5,
  },
});
export default connect(
  state => ({
    user: state.user,
  }),
  {
    uploadProfile,
    uploadImage,
    onEditProfile,
    getUserDetails,
    updateLoginAfterLinkedInLogin,
    sendPushNotifications,
  },
)(AgoraLivestream);
