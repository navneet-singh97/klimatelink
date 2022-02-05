// import AgoraRTM from 'agora-rtm-sdk';
import EventEmitter from 'events';
import {Alert} from 'react-native';
import {cred} from './credentials';

export default class RTMClient extends EventEmitter {
  constructor() {
    super();
    this.channels = {};
    this._logined = false;
  }

  init(appId) {
    this.client = AgoraRTM.createInstance(cred.agora_AppID);
    this.subscribeClientEvents();
  }

  // subscribe client events
  subscribeClientEvents() {
    const clientEvents = ['ConnectionStateChanged', 'MessageFromPeer'];
    clientEvents.forEach(eventName => {
      this.client.on(eventName, (...args) => {
        console.log('emit ', eventName, ...args);
        // log event message
        this.emit(eventName, ...args);
      });
    });
  }

  // subscribe channel events
  subscribeChannelEvents(channelName) {
    const channelEvents = ['ChannelMessage', 'MemberJoined', 'MemberLeft'];
    channelEvents.forEach(eventName => {
      this.channels[channelName].channel.on(eventName, (...args) => {
        console.log('emit ', eventName, args);
        this.emit(eventName, {channelName, args: args});
      });
    });
  }

  async login(accountName, token) {
    console.log('name==' + accountName);
    this.accountName = accountName;
    // this.init();
    return this.client.login({uid: this.accountName, token});
  }

  async logout() {
    return this.client.logout();
  }

  async joinChannel(name, token, uuid) {
    console.log('joinChannel111', name);
    const channel = this.client.createChannel(name);
    console.log('ch==', channel);
    this.channels[name] = {
      channel,
      joined: false, // channel state
    };
    this.subscribeChannelEvents(name);
    return channel.join();
    // });
  }

  async leaveChannel(name) {
    console.log('leaveChannel', name);
    if (
      !this.channels[name] ||
      (this.channels[name] && !this.channels[name].joined)
    )
      return;
    return this.channels[name].channel.leave();
  }

  async sendChannelMessage(text, channelName) {
    if (!this.channels[channelName] || !this.channels[channelName].joined)
      return;
    let a = this.channels[channelName].channel.sendMessage({text});
    console.log('asds==' + a);
    return this.channels[channelName].channel.sendMessage({text});
  }

  async sendPeerMessage(text, peerId) {
    console.log('sendPeerMessage', text, peerId);
    return this.client.sendMessageToPeer({text}, peerId.toString());
  }

  async queryPeersOnlineStatus(memberId) {
    console.log('queryPeersOnlineStatus', memberId);
    return this.client.queryPeersOnlineStatus([memberId]);
  }

  //send image
  async uploadImage(blob, peerId) {
    const mediaMessage = await this.client.createMediaMessageByUploading(blob, {
      messageType: 'IMAGE',
      fileName: 'agora.jpg',
      description: 'send image',
      thumbnail: blob,
      // width: 100,
      // height: 200,
      // thumbnailWidth: 50,
      // thumbnailHeight: 200,
    });
    return this.client.sendMessageToPeer(mediaMessage, peerId);
  }

  async sendChannelMediaMessage(blob, channelName) {
    console.log('blob', blob);

    if (!this.channels[channelName] || !this.channels[channelName].joined)
      return;
    console.log('sendChannelMessage', channelName);
    const mediaMessage = await this.client.createMediaMessageByUploading(blob, {
      messageType: 'IMAGE',
      fileName: 'agora.png',
      description: 'send image',
      thumbnail: blob,
      // messageType: 'IMAGE',
      // fileName: 'agora.png',
      // description: 'send image',
      // thumbnail: blob,
      // width: 100,
      // height: 200,
      // thumbnailWidth: 50,
      // thumbnailHeight: 200,
    });
    console.log('channelName===', mediaMessage);
    return this.channels[channelName].channel.sendMessage(mediaMessage);
  }

  async cancelImage(message) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);
    await this.client.downloadMedia(message.mediaId, {
      cancelSignal: controller.signal,
      onOperationProgress: ({currentSize, totalSize}) => {
        console.log(currentSize, totalSize);
      },
    });
  }
}
