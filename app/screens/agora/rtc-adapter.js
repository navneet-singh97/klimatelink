import {EventEmitter} from 'events';
//import { Logger } from './utils';
import {cred} from './credentials';
//const config = require('../agora.config.json');
import RtcEngine from 'react-native-agora'; //   RtcEngineContext, //   ClientRole, //   ChannelProfile, //   VideoRenderMode, //   RtcRemoteView, //   RtcLocalView,
import {Alert} from 'react-native';
export default class RtcAdapter extends EventEmitter {
  constructor() {
    super();
    this.uid = null;
    this.clientRTC = new RtcEngine();
    const events = [
      'tokenExpired',
      'JoinChannelSuccess',
      'RejoinChannelSuccess',
      'LeaveChannel',
      'LocalUserRegistered',
      'UserInfoUpdated',
      'ConnectionStateChanged',
      'LocalVideoStateChanged',
      'RemoteVideoStateChanged',
    ];
    events.forEach(event => {
      // @ts-ignore
      this.clientRTC.addListener(event, evt => {
        console.warn(event, evt);
        this.emit(event, evt);
      });
    });
  }

  login = async uid => {
    this.clientRTC = await RtcEngine.create('208b847828514d91877a2f0fab5ae939');
    await this.clientRTC.enableAudio();
    await this.clientRTC.enableVideo();
    this.uid = uid;
  };

  logout = async () => {
    await this.clientRTC?.leaveChannel();
    await this.clientRTC.destroy();
    console.log('logout success');
  };

  join = async (token, userID) => {
    console.log('In join channel', token + 'and user id is' + userID);
    return await this.clientRTC.joinChannel(
      token,
      'Channel',
      null,
      userID,
    );
  };

    leave = async cid => {
      return this.clientRTC.leaveChannel(cid);
    };

  //   sendChannelMessage = async param => {
  //     console.log(param, 'send messages param');
  //     return this.clientRTC.sendMessageByChannelId(param.channel, param.message);
  //   };

    destroy = async () => {
      await this.clientRTC.destroyClient();
      console.log('destroy');
    };
}
