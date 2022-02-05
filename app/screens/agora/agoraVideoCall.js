import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import {
  Platform,
  Button,
  TextInput,
  View,
  PermissionsAndroid,
  Image,
  Text,
  ScrollView,
} from 'react-native';
// Import the RtcEngine class into your project.

import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
} from 'react-native-agora';
import {connect} from 'react-redux';
import {Header} from '../../components/header';
import {cred} from './credentials';
// Import the UI styles.
import styles from './styles';
import user, {
  uploadProfile,
  uploadImage,
  onEditProfile,
  getUserDetails,
  updateLoginAfterLinkedInLogin,
} from './../../redux/actions/user';
import {sendPushNotifications} from './../../redux/actions/communities';
import Sound from 'react-native-sound';

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
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
    console.warn(err);
  }
};

// const request = (
//    PERMISSIONS.IOS.CAMERA
// ).then(result => {
//   setPermissionResult(result);
//   console.log(result);
// });

var ring = new Sound('bell.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  console.log('This is sound', error);
  // when loaded successfully
  // console.log(
  //   'duration in seconds: ' +
  //     whoosh.getDuration() +
  //     'number of channels: ' +
  //     whoosh.getNumberOfChannels(),
  // );
});

class AgoraVideoCall extends React.Component {
  constructor(props) {
    super(props);
    this._engine = new RtcEngine();
    this.state = {
      isSecondUser: this.props.route?.params?.route?.isSecondUser || false,
      myName: this.props.route?.params?.route?.isSecondUser
        ? this.props.route?.params?.route.myName
        : this.props.route.params.myName,
      channelId: Math.floor(Math.random() * 100000000).toString(),
      openMicrophone: true,
      enableSpeakerphone: true,
      joinSucceed: this.props.route?.params?.route?.isSecondUser ? true : false,
      peerIds: [],
      curTime: new Date().toLocaleString(),
      fcmToken: this.props.route.params.fcmToken,
      userIntegerId: this.props.route.params.userIntegerId,
      userName: this.props.route.params.name,
      myIntegerID: this.props.route.params.myIntegerID,
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
  // Other code. See step 5 to step 9.
  componentDidMount() {
    if (!this.state.isSecondUser) {
      ring.setVolume(0.02);
      ring.setNumberOfLoops(-1);
      ring.play(success => {
        console.log('Sound play response', success);
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.peerIds.length > 0) {
      ring.stop(sac => {
        console.log('Stopped', sac);
      });
    }
    if (prevState.peerIds.length > 0 && this.state.peerIds.length == 0) {
      this._leaveChannel();
    }
  }

  componentWillUnmount() {
    ring.stop();
  }

  init = async () => {
    // if(!this.state.isSecondUser){
    this._engine = await RtcEngine.create('208b847828514d91877a2f0fab5ae939');
    await this._engine.enableAudio();
    await this._engine.enableVideo();
    if (this.state.isSecondUser) {
      await this._engine.enableLocalVideo();
    }
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      const {peerIds} = this.state;
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          peerIds: [...peerIds, uid],
        });
        ring.stop();
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

    console.log('Before api call in first', this.state.myIntegerID);
    const response = await fetch(
      'https://api.klimatelink.com/agora/rtc/' +
        this.state.channelId +
        '/1/userAccount/' +
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
          fcmArray.push({
            deviceToken: this.state.fcmToken,
            title: this.state.myName + ' is calling you',
            body: 'Video Call from ' + this.state.myName + '(KlimateX)',
            data: {
              additionalProp1: 'videoCall',
              additionalProp2: this.state.userIntegerId,
              additionalProp3: this.state.channelId,
              additionalProp4: JSON.stringify(this.props.route),
              additionalProp5: responseJson?.rtcToken,
            },
          });
          this.props.sendPushNotifications(fcmArray);
        })
        .catch(error => {
          console.log('This is the join channel error', error);
        });
    }
    // }
  };

  _joinChannel = async token => {
    console.log('Started to join channel', token);
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

  render() {
    const {
      channelName,
      joinSucceed,
      openMicrophone,
      enableSpeakerphone,
      peerIds,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header
          onLeftPress={() => {
            this._leaveChannel();
          }}
          isTextPressed={true}
          onPressTitle={() => this._leaveChannel()}>
          {this.state.name}
        </Header>
        <View style={styles.top}>
          <Text style={styles.username}>
            {' '}
            {this.state.isSecondUser ? this.state.myName : this.state.userName}
          </Text>
          <Text style={styles.calling}>
            {peerIds.length > 0 ? '' : 'calling...'}
          </Text>
        </View>
        <View style={styles.middle}>
          {this._renderVideos()}
          {/* <Image
            source={{uri: this.props.route.params?.profilePic}}
            style={styles.profilePic}
          /> */}
        </View>
        <View style={styles.float}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={this._switchSpeakerphone}>
            {enableSpeakerphone ? (
              <Image
                style={styles.controlIcon}
                source={require('../../Images/speaker.png')}
              />
            ) : (
              <Image
                style={styles.controlIcon}
                source={require('../../Images/earphone.png')}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Image
              style={styles.controlIcon}
              source={require('../../Images/videocamera.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.endCall} onPress={this._leaveChannel}>
            <Image
              style={{
                width: 48,
                height: 48,
              }}
              source={require('../../Images/endcall.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={this._switchMicrophone}>
            {openMicrophone ? (
              <Image
                style={styles.controlIcon}
                source={require('../../Images/mute.png')}
              />
            ) : (
              <Image
                style={styles.controlIcon}
                source={require('../../Images/unmute.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderVideos = () => {
    const {joinSucceed} = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.max}
          // channelId={this.state.channelName}
          channelId={this.state.channelId}
          renderMode={VideoRenderMode.Hidden}
        />
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };

  _renderRemoteVideos = () => {
    const {peerIds} = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={{paddingHorizontal: 2.5}}
        horizontal={true}>
        {peerIds.map((value, index, array) => {
          return (
            <>
              <RtcRemoteView.SurfaceView
                style={styles.remote}
                uid={value}
                channelId={this.state.channelId}
                renderMode={VideoRenderMode.Hidden}
                zOrderMediaOverlay={true}
              />
            </>
          );
        })}
      </ScrollView>
    );
  };

  _leaveChannel = async () => {
    console.log('test');
    let a = await this._engine?.leaveChannel();
    // await this._engine.destroy();
    console.log('hello', a);
    ring.stop();
    this.props.navigation.goBack();
  };
}

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
)(AgoraVideoCall);
