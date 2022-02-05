import RtmEngine from 'agora-react-native-rtm';
import {EventEmitter} from 'events';
//import { Logger } from './utils';
import {cred} from './credentials';
//const config = require('../agora.config.json');

export default class RtmAdapter extends EventEmitter {
  constructor() {
    super();
    this.uid = null;
    this.client = new RtmEngine();
    const events = [
      'tokenExpired',
      'remoteInvitationRefused',
      'remoteInvitationFailure',
      'remoteInvitationCanceled',
      'remoteInvitationAccepted',
      'MessageReceived',
      'localInvitationRefused',
      'localInvitationReceivedByPeer',
      'localInvitationFailure',
      'localInvitationCanceled',
      'localInvitationAccepted',
      'error',
      'connectionStateChanged',
      'ChannelMessageReceived',
      'channelMemberLeft',
      'channelMemberJoined',
      'remoteInvitationReceived',
    ];
    events.forEach(event => {
      // @ts-ignore
      this.client.addListener(event, evt => {
        console.warn(event, evt);
        this.emit(event, evt);
      });
    });
  }

  login = async (uid, token) => {
    let clientRes = await this.client.createInstance(cred.agora_AppID);
    console.log(clientRes, 'client response123');
    this.uid = uid;
    // token: cred.agora_app_token,
    // uid: "chatApp",
    return this.client.loginV2(this.uid, token);
  };

  logout = async () => {
    await this.client.logout();
    console.log('logout success');
  };

  join = async cid => {
    console.log('cid', cid);
    return this.client.joinChannel(cid);
  };

  leave = async cid => {
    return this.client.leaveChannel(cid);
  };

  getChannelMembersBychannelId = async id => {
    return this.client.getMembers(id);
  };

  sendChannelMessage = async param => {
    console.log(param, 'send messages param');
    return this.client.sendMessage(
      param.channel,
      {text: param.message},
      {enableOfflineMessaging: true, enableHistoricalMessaging: true},
    );
  };

  destroy = async () => {
    await this.client.release();
    console.log('destroy');
  };
}
