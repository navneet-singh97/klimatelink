import React from 'react';
//import { AppContext, AppContextType } from '../components/context';
import {
  GiftedChat,
  Send,
  SystemMessage,
  Bubble,
  InputToolbar,
  Message,
  Composer,
  MessageImage,
  MessageAudio,
} from 'react-native-gifted-chat';
//import { Logger } from './utils';
import RtmAdapter from './rtm-adapter';
import {View, Image, PermissionsAndroid, Platform} from 'react-native';
import {BackHandler} from 'react-native';
//import ScreenHOC from '../../Components/HOC/ScreenHOC';
import {Header} from '../../components/header';
import {Alert, Text, ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
// import * as ImagePicker from 'react-native-image-picker';
import {Icon} from 'native-base';
import {NativeModules} from 'react-native';
import {ActionSheet} from 'react-native-cross-actionsheet';
import {DeviceEventEmitter} from 'react-native';
import RTMClient from './rtm-client';
// import AgoraRTM from 'agora-rtm-sdk';
import {cred} from './credentials';
import RNFetchBlob from 'react-native-fetch-blob';
import {imageToBlob} from './common';
import Clipboard from '@react-native-community/clipboard';
import {Keyboard} from 'react-native';
import {any} from 'ramda';
import {Content} from 'native-base';
import SQLite from 'react-native-sqlite-storage';
import {connect} from 'react-redux';
import {openDatabase} from 'react-native-sqlite-storage';
import {
  createMessage,
  createMessageAudio,
  createMessageImage,
  createNewThread,
  listenToMessages,
} from '../../initialSetUp/firebaseMessageConfig';
import firestore from '@react-native-firebase/firestore';
// import firestore from '@react-native-firebase/firestore';
import {Dimensions} from 'react-native';
import {color} from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import user, {
  uploadProfile,
  uploadImage,
  onEditProfile,
  getUserDetails,
  updateLoginAfterLinkedInLogin,
} from './../../redux/actions/user';
import {sendPushNotifications} from './../../redux/actions/communities';
import moment from 'moment';
import Sound from 'react-native-sound';
// import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {Pressable} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
var sendAttachment = NativeModules.SendAgoraAttchment;
let ChoosePics = [
  {
    title: 'Take Photo',
    icon: 'camera',
  },
  {
    title: 'Choose from Gallery',
    icon: 'photo',
  },
];

const IconsOptions = [
  // {id: 0, type: 'FontAwesome5', name: 'smile'},
  {id: 0, type: 'Feather', name: 'camera'},
  {id: 1, type: 'FontAwesome', name: 'image'},
  // {id: 2, type: 'FontAwesome', name: 'file-audio-o'},
  //{ id: 0, type: "Feather", name: "mic-off" },
];
const windowWidth = Dimensions.get('window').width;
// var db = SQLite.openDatabase({name: 'UserDatabase.db'});
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

class AgoraChat extends React.Component {
  constructor(props) {
    super(props);
    SQLite.DEBUG = true;
    this.client = new RtmAdapter();
    this.rtm = new RTMClient();
    console.log('In constructor upcoming params are', this.props.route.params);
    this.state = {
      messages: [],
      channel: this.props.route.params?.channel,
      uid: this.props.route?.params?.uid,
      token: this.props.route?.params?.token,
      name: this.props.route?.params?.name,
      myName: this.props.route?.params?.myName,
      isGroupChat: this.props.route?.params.isGroupChat,
      groupName: this.props.route?.params.groupName,
      groupMembers: this.props.route?.params.groupMembers,
      sender_uid: this.props.route?.params.sender_uid,
      chatParticipants: this.props.route?.params?.chatParticipants,
      imageUrl: '',
      editMessage: '',
      isEditMessage: false,
      updateMessageStr: '',
      editMessageIndex: -1,
      isLoadingEarlier: false,
      loadMessage: true,
      initialFirestoreMessages: [],
      uploadImageModal: false,
      uploadImageBase64: '',
      uploadedImage: '',
      messageText: '',
      isModalOpen: false,
      startAudio: false,
      audioSettings: {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        MeteringEnabled: true,
        IncludeBase64: true,
        AudioEncodingBitRate: 32000,
      },
      // audioPath: `${AudioUtils.DocumentDirectoryPath}/${'1111'}test.aac`,
      hasPermission: false,
      playAudio: false,
      isButtonPress: false,
    };
    this.onLongPress = this.onLongPress.bind(this);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    const intervalRef = React.createRef(null);
  }

  chooseImage(token, uid, channel) {
    // let channel_name = props.route.params?.channel;
    ActionSheet.options({
      options: [
        {text: 'Camera', onPress: () => launchCamera()},
        {
          text: 'Gallery',
          onPress: () => {
            let options = {
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
              includeBase64: true,
            };

            ImagePicker.launchImageLibrary(options, response => {
              console.log('Response = ', response);
              this.sendAttachment;
            });
          },
        },
      ],
      cancel: {onPress: () => console.log('cancel')},
    });
  }

  onSelectAudioCall() {
    console.log('Audio');
    this.props.navigation.push('AgoraVoiceCall', {
      token: this.state.token,
      channel: this.state.channel,
      uid: this.props.route.params.myId,
      name: this.state.name,
      profilePic: '',
    });
  }
  onSelectVideoCall() {
    console.log('Video');
    this.props.navigation.push('AgoraVideoCall', {
      token: this.state.token,
      channel: this.state.channel,
      uid: this.state.uid,
      name: this.state.name,
      profilePic: '',
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  subscribeChannelMessage() {
    console.log('subscribeChannelMessage');
    this.client.on('error', evt => {
      console.log('errorerrorerrorerror', evt);
    });

    this.client.on('MessageReceived', (evt, id) => {
      console.log('mkmksdmksdmksdmksdmksdmkdm', evt, id);
    });

    this.client.on('ChannelMessageReceived', (evt, aaa) => {
      const {uid, channelId, text} = evt;
      console.log('evt', aaa);
      // console.log('channelMessageReceived uid ', uid);
      console.log('-=====II===============================', text);
      var url = text;
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        match;
      while ((match = regex.exec(url))) {
        params[match[1]] = match[2];
      }
      if (params.channeId === this.state.channel) {
        if (params.editiable != 'false') {
          console.log('=========================LLLL');
          const newMessagesArray = this.state.messages.map((msg, i) => {
            if (params.editIndex === i.toString()) {
              return {
                ...msg,
                text: params.message,
              };
            }
            return msg;
          });
          this.setState({
            messages: newMessagesArray,
          });
        } else if (params.removeMessage) {
          var array = [...this.state.messages];
          array.splice(parseInt(params.editIndex), 1);
          this.setState({messages: array});
        } else {
          console.log('=========================');
          this.setState(prevState => ({
            messages: GiftedChat.append(prevState.messages, [
              {
                _id: +new Date(),
                text: params.message,
                user: {
                  _id: +new Date(),
                  name: params.userName,
                },
                createdAt: new Date(),
              },
            ]),
          }));
        }
      }
    });
  }

  ExecuteQuery = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results) => {
            resolve(results);
          },
          error => {
            reject(error);
          },
        );
      });
    });
  // ExecuteQuery = (sql, params = []) =>
  //   new Promise((resolve, reject) => {
  //     // tx.executeSql(sql,params)
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         sql,
  //         params,
  //         (tx, results) => {
  //           // console.log('item:', results.rows.length);
  //           // console.log('item:==', results.rows.item(1));
  //           Alert.alert('test==' + results.rows);

  //           console.log('resultCome', results);
  //           // resolve(results);
  //         },
  //         error => {
  //           Alert.alert('222' + error);
  //           console.log('error===12', error);
  //           // reject(error);
  //         },
  //       );
  //     });
  //   });
  async onSend(messages = []) {
    console.log('skmdksdksmdk', messages);
    const channel = this.state.channel;
    messages.forEach(message => {
      this.client
        .sendChannelMessage({
          channel: channel,
          message:
            '?channeId=' +
            channel +
            '&userName=' +
            this.state.name +
            '&message=' +
            message.text +
            '&editiable=' +
            this.state.isEditMessage +
            '&editIndex=' +
            messages.indexOf(message) +
            // '&image=',+
            '&message.displayName=' +
            this.state.myName,
        })
        .then(async () => {
          // console.log(this.props);
          // let Table = await this.ExecuteQuery(
          //   "INSERT INTO chatTable ( 'text', 'user_id', 'name', 'createdAt','is_group') VALUES ( ?, ?, ?,?,?)",
          //   ['Hello', '1', 'ravi', '20202', '1'],
          // );

          if (this.state.messages.length > 0) {
            createMessage(channel, message.text, {
              displayName: this.state.myName,
              _id: this.props.route?.params.myId,
            });
          } else {
            createNewThread(channel).then(() => {
              createMessage(channel, message.text, {
                displayName: this.state.myName,
                _id: this.props.route?.params.myId,
              });
            });
          }
          this.setState(prevState => ({
            messages: GiftedChat.append(prevState.messages, [message]),
          }));
          console.log('Finished');
        })
        .catch(error => {
          console.log(JSON.stringify(error), 'dmskdmskdmskdskdmk');
        });
    });
  }

  async componentDidMount() {
    console.log('namenamenamenamenamenamename', this.state.chatParticipants);
    if (this.state.isGroupChat && this.state.chatParticipants) {
      console.log('In if');
      console.log('This is the state', this.state.chatParticipants);
      let arrFCMTokens = [];
      arrFCMTokens = this.state.chatParticipants.map((item, index) => {
        return item.fcmToken;
      });
      let fcmArray = [];
      arrFCMTokens.forEach(element => {
        fcmArray.push({
          deviceToken: element,
          title: this.state.groupName + ' Created',
          body:
            this.state.myName +
            ' added you to the new group' +
            this.state.groupName,
        });
      });
      /**
       * Push notification implement
       */
      this.props.sendPushNotifications(fcmArray);
      console.log('FCM tokens array is', arrFCMTokens);
    }
    // this.enableRecording();

    console.log('This is the groupname' + this.state.groupName);
    console.log(
      'These are the group members' + JSON.stringify(this.state.groupMembers),
    );
    let a = await this.CreateTable();
    // console.log('log12345678', a);
    console.log(this.props.route.params.name, 'navi');

    let channel = this.state.channel;
    // const message = await AsyncStorage.getItem(channel.toString() + 'key');

    // console.log('d sdskdksmksmdkmskmsdkskdmskdmksdm', message);
    // if (message) {
    //   console.log('messagemessagemessagemessagemessage', message);
    // }
    this.readMessage(channel);

    console.log('mount chat ', channel);
    this.client
      .join(channel)
      .then(() => {
        console.log('join channel success');
        this.setState({
          channel,
        });
      })
      .catch(_ => {
        console.warn('join failured');
      });
    this.subscribeChannelMessage();

    // for (let i = 0; i < 5; i++) {
    //   this.setState(prevState => ({
    //     messages: GiftedChat.prepend(prevState.messages, [
    //       {
    //         _id: +new Date(),
    //         text: 'hellosdsd sd sd s ',
    //         user: {
    //           _id: +new Date(),
    //           name: 'abc',
    //         },
    //         createdAt: new Date(),
    //       },
    //     ]),
    //   }));
    // }
  }

  // handleAudio = async () => {
  //   if (!this.state.startAudio) {
  //     this.setState({
  //       startAudio: true,
  //     });
  //     console.log('handleAudiohandleAudiohandleAudiohandleAudio');
  //     await AudioRecorder.prepareRecordingAtPath(
  //       this.state.audioPath,
  //       this.state.audioSettings,
  //     );
  //     // await AudioRecorder.stopRecording();
  //     await AudioRecorder.startRecording();
  //   } else {
  //     // console.log(state.audioPath , "audiopath");
  //     this.setState({startAudio: false});
  //     await AudioRecorder.stopRecording();
  //     const audioPath = this.state.audioPath;
  //     const fileName = `${this.messageIdGenerator()}.aac`;
  //     const file = {
  //       uri: Platform.OS === 'ios' ? audioPath : `file://${audioPath}`,
  //       name: fileName,
  //       type: `audio/aac`,
  //     };
  //     // console.log("==================", file);
  //     // audioUpload(file);
  //     // await this.props.uploadImage(file);
  //     const channel = this.state.channel;
  //     let msg = {
  //       user: {
  //         _id: this.props.route.params.myId,
  //         createdAt: new Date(),
  //         text: 'audio',
  //       },
  //       audio: file.uri,
  //     };

  //     this.setState(previousState => ({
  //       messages: GiftedChat.append(previousState.messages, msg),
  //     }));
  //     createMessageAudio(channel, msg.audio, {
  //       displayName: this.state.myName,
  //       _id: this.props.route?.params.myId,
  //     });
  //   }
  // };

  messageIdGenerator = () => {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // RenderAudio = props => {
  //   console.log('Audio props', props);
  //   return (
  //     <Pressable
  //       style={{
  //         padding: windowWidth * 0.0161,
  //         backgroundColor: '#729fcb',
  //         flexDirection: 'row',
  //         borderRadius: windowWidth * 0.0161,
  //         borderBottomRightRadius: 0,
  //         alignItems: 'center',
  //       }}
  //       onPress={() => {
  //         this.setState({
  //           playAudio: true,
  //         });
  //         const sound = new Sound(props.audio, '', error => {
  //           if (error) {
  //             // console.log("failed to load the sound", error);
  //           }
  //           this.setState({playAudio: false});
  //           sound.play(success => {
  //             // console.log(success, "success play");
  //             if (!success) {
  //               Alert.alert('There was an error playing this audio');
  //             }
  //           });
  //         });
  //       }}>
  //       <Icon
  //         name="file-audio-o"
  //         type="FontAwesome"
  //         style={{
  //           width: 30,
  //           height: 30,
  //           color: this.state.playAudio ? '#cc0000' : '#0000aa88',
  //         }}
  //       />
  //       <Text
  //         style={{
  //           fontFamily: 'CenturyGothic',
  //           fontSize: windowWidth * 0.036,
  //           color: color.textColor,
  //         }}>
  //         Audio
  //       </Text>
  //     </Pressable>
  //   );
  // };

  // enableRecording = () => {
  //   this.checkPermission().then(async hasPermission => {
  //     console.log('Permission state', hasPermission);
  //     this.setState({hasPermission: hasPermission});
  //     // if (!hasPermission) return;
  //     await AudioRecorder.prepareRecordingAtPath(
  //       this.state.audioPath,
  //       this.state.audioSettings,
  //     ).then(res => {
  //       console.log('audio recorder success');
  //     });
  //     AudioRecorder.onProgress = data => {
  //       console.log(data, 'onProgress data');
  //     };
  //     AudioRecorder.onFinished = data => {
  //       console.log(data, 'on finish');
  //     };
  //   });
  // };

  // checkPermission = () => {
  //   if (Platform.OS !== 'android') {
  //     return Promise.resolve(true);
  //   }
  //   const rationale = {
  //     title: 'Microphone Permission',
  //     message:
  //       'AudioExample needs access to your microphone so you can record audio.',
  //   };
  //   return PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //     rationale,
  //   ).then(result => {
  //     // console.log("Permission result:", result);
  //     return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
  //   });
  // };

  messageIdGenerator = () => {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  readMessage(channel) {
    console.log('channelchannelchannelchannel', channel);
    const aa = listenToMessages(channel).onSnapshot(
      querySnapshot => {
        const formattedMessages = querySnapshot.docs.map(doc => {
          return {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            user: {},
            isPlaying: false,
            ...doc.data(),
          };
        });
        console.log('ALl the firebase initial data', querySnapshot);
        this.setState({initialFirestoreMessages: formattedMessages});
        // setMessages(formattedMessages);
        if (this.state.loadMessage) {
          this.setState(prevState => ({
            messages: GiftedChat.append(prevState.messages, formattedMessages),
            loadMessage: false,
          }));
        }
      },
      error => {
        // console.log('This is the error'+JSON.stringify(error))
      },
    );
  }
  // componentWillMount() {
  //   // this.CreateTable();
  //   // var db = SQLite.openDatabase({name: 'agoraDB.db'});
  //   // db.transaction(function (txn) {
  //   //   txn.executeSql(
  //   //     "SELECT name FROM sqlite_master WHERE type='table' AND name='Student_Table'",
  //   //     [],
  //   //     function (tx, res) {
  //   //       console.log('item:', res.rows.length);
  //   //       if (res.rows.length == 0) {
  //   //         // txn.executeSql('DROP TABLE IF EXISTS Student_Table', []);
  //   //         txn.executeSql(
  //   //           'CREATE TABLE IF NOT EXISTS Student_Table(student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name VARCHAR(30), student_phone INT(15), student_address VARCHAR(255))',
  //   //           [],
  //   //           function (tx, res) {
  //   //             console.log('item2233:', res);
  //   //           },
  //   //         );
  //   //       }
  //   //     },
  //   //   );
  //   // });
  //   // Alert.alert('SQLite Database and Table Successfully Created...');
  //   // global.db = SQLite.openDatabase(
  //   //   {
  //   //     name: 'agoraDB',
  //   //     location: 'default',
  //   //     createFromLocation: '~agoraDB.db',
  //   //   },
  //   //   () => {
  //   //     console.log('DATABASE: DB IS CONNECTED');
  //   //   },
  //   //   error => {
  //   //     console.log('ERROR: ' + error);
  //   //   },
  //   // );
  //   // global.db = SQLite.openDatabase('agoraDB');
  //   // this.selectChat();
  //   // DeviceEventEmitter.addListener('customEventName', data => {
  //   //   // Alert.alert('sdsds');
  //   //   // handle event and you will get a value in event object, you can log it here
  //   // });
  // }
  async selectChat() {
    // let Table = await this.ExecuteQuery(
    //   'select * from chatTable where id=3',
    //   [],
    // );
    // console.log('select-', Table);
  }
  // CreateTable() {
  //   Alert.alert('rtest');
  //   return db.transaction(
  //     tx => {
  //       tx.executeSql(
  //         'CREATE TABLE IF NOT EXISTS "chatTable" ("id" INTEGER PRIMARY KEY AUTOINCREMENT , "messageText" VARCHAR(255), "user_id" INT, "name" VARCHAR(255),"createdAt" VARCHAR(255),"is_group" INT)',
  //         [],
  //         (tx, results) => {
  //           console.log('result===', results.rows.item(0).value);
  //           // callback(results.rows.item(0).value);
  //         },
  //         error => {
  //           Alert.alert('222' + error);
  //           console.log('error===12', error);
  //           // reject(error);
  //         },
  //       );
  //     },
  //     null,
  //     null,
  //   );
  // }
  // Create Table
  async CreateTable() {
    let Table = await this.ExecuteQuery(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, first_name VARCHAR(16), last_name VARCHAR(16), is_deleted INTEGER)',
      [],
    );
    console.log('details===', Table);
  }
  onLongPress(context, message) {
    Keyboard.dismiss();
    console.log(context, message);
    console.log('old message', this.state.messages);
    const options = ['Copy Text', 'Delete', 'Edit', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(message.text);
            break;
          case 1:
            console.log(message._id);
            var array = [...this.state.messages]; // make a separate copy of the array
            var index = array.indexOf(message);
            if (index !== -1) {
              array.splice(index, 1);
              this.setState({messages: array});
            }
            this.client.sendChannelMessage({
              channel: this.state.channel,
              message:
                '?channeId=' +
                this.state.channel +
                '&userName=' +
                this.state.name +
                '&message=' +
                '' +
                '&editiable=' +
                this.state.isEditMessage +
                '&editIndex=' +
                index +
                '&removeMessage=' +
                true +
                '&image=' +
                this.state.imageUrl,
            });
            var array = [...this.state.messages];
            var index = array.indexOf(message);
            let messageId = this.state.initialFirestoreMessages[index]._id;
            firestore()
              .collection('MESSAGE_THREADS')
              .doc(this.state.channel)
              .collection('MESSAGES')
              .doc(messageId)
              .delete();
            break;
          case 2:
            var array = [...this.state.messages];
            var index = array.indexOf(message);
            this.setState({
              isEditMessage: true,
              editMessage: message.text,
              editMessageIndex: index,
            });
            break;
        }
      },
    );
  }

  componentWillUnmount() {
    this.client.leave(this.state.channel);
    // this.unsubscribe.remove();
  }

  updateMessage() {
    const index = this.state.editMessageIndex;
    console.log('sdsdsdsdsdsdsd', index);
    const newMessagesArray = this.state.messages.map((msg, i) => {
      if (i === index) {
        return {
          ...msg,
          text: this.state.updateMessageStr,
        };
      }
      return msg;
    });
    this.setState({
      messages: newMessagesArray,
    });

    // this.onSend([
    //   {
    //     _id: newMessagesArray[index]._id,
    //     createdAt: newMessagesArray[index].createdAt,
    //     text: newMessagesArray[index].text,
    //     user: {_id: ''},
    //   },
    // ]);
    this.client.sendChannelMessage({
      channel: this.state.channel,
      message:
        '?channeId=' +
        this.state.channel +
        '&userName=' +
        this.state.name +
        '&message=' +
        newMessagesArray[index].text +
        '&editiable=' +
        this.state.isEditMessage +
        '&editIndex=' +
        index +
        '&removeMessage=' +
        false,
    });

    // firestore()
    //   .collection('MESSAGE_THREADS')
    //   .doc(this.state.channel)
    //   .delete()
    //   .then(() => {
    let messageToBeEditted = this.state.initialFirestoreMessages[index].text;
    let messageId = this.state.initialFirestoreMessages[index]._id;
    let text = newMessagesArray[index].text;
    let messageTime = this.state.initialFirestoreMessages[index].createdAt;

    console.log(
      'This is the message to be editted' + JSON.stringify(messageToBeEditted),
    );

    console.log('This is the new message text' + JSON.stringify(text));

    firestore()
      .collection('MESSAGE_THREADS')
      .doc(this.state.channel)
      .collection('MESSAGES')
      .doc(messageId)
      .update({text: text, isEditted: true});

    console.log(
      'dsdmskdmskdmskdmskdmsdn',
      '?channeId=' +
        this.state.channel +
        '&userName=' +
        this.state.name +
        '&message=' +
        newMessagesArray[index].text +
        '&editiable=' +
        this.state.isEditMessage +
        '&editIndex=' +
        index +
        '&removeMessage=' +
        false,
    );

    this.setState({
      isEditMessage: false,
      editMessage: '',
      editMessageIndex: -1,
      updateMessageStr: '',
    });
  }

  removeEdit() {
    this.setState({
      isEditMessage: false,
      editMessage: '',
      editMessageIndex: -1,
      updateMessageStr: '',
    });
  }

  fetchMoreMessages = () => {
    // for (let i = 0; i < ; i++) {
    // this.setState(prevState => ({isLoadingEarlier: true}));
    // // }
    // this.timeoutHandle = setTimeout(() => {
    //   this.setState(prevState => ({
    //     messages: GiftedChat.prepend(prevState.messages, [
    //       {
    //         _id: +new Date(),
    //         text: 'hello overload',
    //         user: {
    //           _id: +new Date(),
    //           name: 'abc',
    //         },
    //         createdAt: new Date(),
    //       },
    //     ]),
    //     isLoadingEarlier: false,
    //   }));
    // }, 2000);
  };
  onLoadEarlier = () => {
    this.setState(
      previousState => {
        return {
          isLoadingEarlier: true,
        };
      },
      () => {
        console.log(this.state.isLoadingEarlier);
        this.setState(previousState => {
          return {
            isLoadingEarlier: false,
          };
        });
      },
    );
  };
  // get image from gallery

  async onChoosePic(val) {
    if (val === 'Take Photo') {
      await this.setState({profilePicModal: false});
      setTimeout(async () => {
        await this.onSelectCamera();
      }, 1000);
    } else {
      await this.setState({profilePicModal: false});
      setTimeout(async () => {
        await this.onSelectGallery();
      }, 1000);
    }
  }

  async onSelectCamera() {
    ImagePicker.openCamera({
      width: windowWidth / 1.12,
      height: windowWidth / 1.536,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        console.log('onSelectCamera', image);
        this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadImage(image.data);
          this.setState({
            userProfilePic: this.props.user.uploadImage.result,
          });
          console.log('Result is ', this.props.user.uploadImage.result);
          const channel = this.state.channel;
          let msg = {
            user: {
              _id: this.props.route.params.myId,
              createdAt: new Date(),
              text: 'Image',
            },
            image: this.props.user.uploadImage.result,
          };
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, msg),
          }));
          createMessageImage(channel, msg.image, {
            displayName: this.state.myName,
            _id: this.props.route?.params.myId,
          });
        });
      })
      .catch(error => {
        console.log('onSelectCamera_error', error);
      });
  }

  async onSelectGallery() {
    ImagePicker.openPicker({
      width: windowWidth / 1.12,
      height: windowWidth / 1.536,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        console.log('onSelectGallery', image);
        await this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadImage(image.data);
          // console.log('Image upload', this.props.user);
          this.setState({
            userProfilePic: this.props.user.uploadImage.result,
          });
          console.log('This is the result', this.props.user.uploadImage.result);
          console.log('My id is', this.props.route.params.myId);
          const channel = this.state.channel;
          let msg = {
            user: {
              _id: this.props.route.params.myId,
              createdAt: new Date(),
              text: 'Image',
            },
            image: this.props.user.uploadImage.result,
          };
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, msg),
          }));
          createMessageImage(channel, msg.image, {
            displayName: this.state.myName,
            _id: this.props.route?.params.myId,
          });
        });
      })
      .catch(error => {
        console.log('onSelectGallery_error', error);
      });
  }

  // onSend(messages = []) {
  //   this.setState(
  //     previousState => ({
  //       messages: GiftedChat.append(previousState.messages, messages),
  //     }),
  //     () => {
  //       this.setState({selectedEmoji: ''});
  //     },
  //   );
  // }
  renderSend = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          height: windowWidth * 0.106,
          width: windowWidth * 0.106,
          borderRadius: (windowWidth * 0.116) / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color.primary,
          margin: windowWidth * 0.01,
        }}>
        <Icon
          name="ios-send"
          type="Ionicons"
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: windowWidth * 0.06,
          }}
        />
      </Send>
    );
  };

  renderComposer = props => {
    return (
      <Composer
        {...props}
        textInputProps={{
          ...props.textInputProps,
          onTouchStart: () => {
            this.setState({showEmoji: false});
          },
        }}
        textInputStyle={{
          color: '#222B45',
          backgroundColor: 'white',
          borderWidth: 0,
          borderRadius: 5,
          borderColor: '#E4E9F2',
          paddingTop: windowWidth * 0.01,
          paddingHorizontal: windowWidth * 0.01,
          marginLeft: windowWidth * 0.019,
        }}
      />
    );
  };
  renderBubble(props) {
    console.log('Props are', props.currentMessage);
    if (props.currentMessage.image) {
      return (
        <View
          style={{
            paddingHorizontal: windowWidth * 0.0161,
            backgroundColor: '#729fcb',
            flexDirection: 'column',
            borderRadius: windowWidth * 0.0161,
            borderBottomRightRadius: 0,
          }}>
          <Image
            source={{uri: props.currentMessage.image}}
            style={{height: windowWidth * 0.5, width: windowWidth * 0.5}}
            // type={'Ionicons'}
            // name={'image'}
            // style={{
            //   //alignSelf: "center",
            //   color: color.textColor,
            //   fontSize: windowWidth * 0.0691,
            //   marginBottom: -windowWidth * 0.0516,
            //   marginRight: windowWidth * 0.0516,
            // }}
          />
          <View
            style={{
              backgroundColor: '#729fcb',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: windowWidth * 0.0316,
            }}>
            {/* <TouchableOpacity onPress={this.loadAudio.bind(this, props)}> */}
            <Text
              style={{
                fontFamily: 'CenturyGothic',
                fontSize: windowWidth * 0.036,
                color: color.textColor,
              }}>
              {/* {props.currentMessage.image} */}
              Image.png
              {/* {this._getMMSSFromMillis(this.state.playableDuration)} */}
            </Text>
            {/* </TouchableOpacity> */}

            {/* <Text
            style={{
              fontFamily: "CenturyGothic",
              fontSize: windowWidth * 0.036,
              color: color.textColor,
            }}
          >
            {this._getPlaybackTimestamp()}
          </Text>
          <TouchableOpacity onPress={this._onStopPressed}>
            <Icon
              type={"Entypo"}
              name={"controller-stop"}
              style={{
                color: "#ff0000",
                fontSize: windowWidth * 0.061,
              }}
            />
          </TouchableOpacity> */}
          </View>
          <Text
            style={{
              fontFamily: 'CenturyGothic',
              fontSize: windowWidth * 0.0316,
              color: color.textColor,
              alignSelf: 'flex-end',
            }}>
            {moment(props.currentMessage.createdAt).format('LT')}
          </Text>
        </View>
      );
    }
    // else if (props.currentMessage.audio) {
    //   return this.RenderAudio(props.currentMessage);
    // }
    else {
      return (
        <Bubble
          {...props}
          textStyle={{
            left: {
              color: 'black',
              fontFamily: 'CenturyGothic',
              fontSize: windowWidth * 0.036,
            },
            right: {
              color: 'white',
              fontFamily: 'CenturyGothic',
              fontSize: windowWidth * 0.036,
            },
          }}
          wrapperStyle={{
            left: {
              backgroundColor: color.lineColor,
              borderBottomStartRadius: 0,
            },
            right: {
              backgroundColor: '#729fcb',
              borderBottomEndRadius: 0,
            },
          }}
        />
      );
    }
  }

  renderMessage = props => {
    console.log('renderMessage:', props);
    return (
      <Message
        {...props}
        // renderDay={() => <Text>Date</Text>}

        containerStyle={{
          backgroundColor: 'pink',
          left: {backgroundColor: 'transparent'},
          right: {backgroundColor: 'transparent'},
        }}></Message>
    );
  };

  renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'white',
        }}
        primaryStyle={{
          alignItems: 'center',
          height: windowWidth * 0.16,
          borderWidth: 0,
        }}
      />
    );
  };

  renderChatFooter() {
    return (
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.16,
          backgroundColor: 'transaprent',
          flexDirection: 'row',
          borderTopWidth: 0.6,
          borderTopColor: color.lineColor,
          paddingLeft: windowWidth * 0.036,
        }}>
        {IconsOptions.map((res, i) => {
          return (
            <TouchableOpacity onPress={this.onSelectOption.bind(this, res)}>
              {
                <Icon
                  type={res.type}
                  name={res.name}
                  style={{
                    fontSize: windowWidth * 0.0461,
                    color: '#7a7a7a',
                    padding: windowWidth * 0.036,
                  }}
                />
              }
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  async onSelectOption(res) {
    if (res.name == 'camera') {
      this.onSelectCamera();
    }
    // else if (res.name == "mic-off") {
    //   var voiceRecordPermission = await Permissions.askAsync(
    //     Permissions.AUDIO_RECORDING
    //   );
    //   if (voiceRecordPermission.status == "granted") {
    //     this.setState({ voiceModal: true, audioInfo: null });
    //   }
    // }
    else if (res.name == 'image') {
      this.onSelectGallery();
    }
    // else {
    //   this.handleAudio();
    // }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          onLeftPress={() => {
            this.props.navigation.goBack();
          }}
          isGroupChat={!this.state.isGroupChat}
          isTextPressed={true}
          onPressTitle={() => this.props.navigation.goBack()}
          onSelectAudioCall={() => this.onSelectAudioCall()}
          onSelectVideoCall={() => this.onSelectVideoCall()}>
          {this.state.isGroupChat ? this.state.groupName : this.state.name}
        </Header>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {this.state.isLoadingEarlier && (
            <ActivityIndicator color={'#003237'} />
          )}
        </View>
        <GiftedChat
          //extraData={this.state}
          text={this.state.messageText}
          onInputTextChanged={messageText =>
            this.setState({messageText: messageText})
          }
          value={this.state.messageText}
          placeholder="Type a message"
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.route?.params.myId,
          }}
          renderBubble={this.renderBubble.bind(this)}
          //renderMessage={this.renderMessage}
          renderSend={this.renderSend}
          renderInputToolbar={this.renderInputToolbar}
          renderComposer={this.renderComposer}
          // shouldUpdateMessage={this.shouldUpdateMessage}
          messagesContainerStyle={{
            backgroundColor: 'transaprent',
            paddingVertical: 10,
          }}
          renderChatFooter={this.renderChatFooter.bind(this)}
          alwaysShowSend={true}
          showUserAvatar={true}
        />
        {/* <GiftedChat
          onLongPress={this.onLongPress}
          messages={this.state.messages}
          renderMessageText={currentMessage => {
            return (
              <View>
                {currentMessage.currentMessage.isEditted && (
                  <View
                    style={{
                      backgroundColor: '#e3e3e3',
                      borderTopLeftRadius: 8,
                    }}>
                    <Text
                      style={{fontSize: 10, color: '#ff0000a7', marginLeft: 3}}>
                      edited
                    </Text>
                  </View>
                )}
                <View style={{padding: 8}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      marginLeft: 3,
                      // marginTop: currentMessage.currentMessage.isEditted
                      //   ? 2
                      //   : 0,
                    }}>
                    {currentMessage.currentMessage.text}
                  </Text>
                </View>
              </View>
            );
          }}
          // renderInputToolbar={() => {
          //   return (
          //     <View
          //       style={{
          //         flexDirection: 'row',
          //         height: 100,
          //         // alignItems: 'center',
          //         // paddingStart: 10,
          //         width: '100%',
          //         borderWidth: 1,
          //         borderColor: '#e3e3e3',
          //       }}>
          //       <TextInput
          //         style={{width: '90%', height: '100%'}}
          //         placeholder="Type your message"></TextInput>
          //       <View style={{backgroundColor: '#0000aa99', flex: 1}}>
          //         <Text
          //           style={{
          //             color: '#000000',
          //             fontSize: 15,
          //             marginTop: 10,
          //             alignSelf: 'center',
          //             color: '#ffffff99',
          //           }}>
          //           Send
          //         </Text>
          //       </View>
          //     </View>
          //   );
          // }}
          // text={this.state.editMessage}
          // isLoadingEarlier={this.state.isLoadingEarlier}
          // onLoadEarlier={this.onLoadEarlier}
          extraData={this.state}
          // inverted={/}
          textInputProps={{color: '#000000'}}
          listViewProps={{
            onEndReached: () => this.fetchMoreMessages(),
          }}
          onSend={messages => this.onSend(messages)}
          user={{
            // _id: this.state.uid,
            _id: this.props.route?.params.myId,
          }}
        /> */}
        {this.state.isEditMessage == true ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              minHeight: 60,
              backgroundColor: '#003237',
              opacity: 1,
              zIndex: 99999,
              left: 0,
              paddingTop: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginLeft: 30,
                  minHeight: 30,
                  width: 2,
                  backgroundColor: '#408FC0',
                }}></View>
              <View style={{marginLeft: 10}}>
                <Text style={{color: '#408FC0'}}>Edit Message</Text>
                <Text style={{color: '#ffffff'}}>{this.state.editMessage}</Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                value={this.state.updateMessageStr}
                onChangeText={text => this.setState({updateMessageStr: text})}
                style={{
                  backgroundColor: '#ffffff',
                  margin: 10,
                  borderRadius: 5,
                  height: 35,
                  flex: 1,
                }}
              />
              <TouchableOpacity
                onPress={this.updateMessage.bind(this)}
                style={{alignSelf: 'center', marginRight: 10}}>
                <Text style={{color: '#ffffff'}}>Send</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={this.removeEdit.bind(this)}
              style={{position: 'absolute', right: 10}}>
              <Text style={{color: '#ffffff'}}>X</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <Modal isVisible={this.state.uploadImageModal}>
          <View
            style={{
              backgroundColor: 'white',
              height: windowWidth / 1.56,
              borderRadius: windowWidth * 0.006,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // height: windowWidth * 0.1346,
                borderBottomWidth: 1,
                flex: 0.45,
              }}>
              <Text
                style={{
                  color: color.appGreen,
                  fontSize: windowWidth * 0.0469,
                  alignSelf: 'center',
                  fontFamily: 'CenturyGothic-Bold',
                  // paddingVertical: windowWidth * 0.16,
                }}>
                Select Avatar
              </Text>
            </View>
            <View
              style={{
                flex: 0.55,
                marginHorizontal: windowWidth * 0.06,
                marginBottom: windowWidth * 0.096,
              }}>
              {ChoosePics.map(res => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: windowWidth * 0.0516,
                    }}
                    onPress={this.onChoosePic.bind(this, res.title)}>
                    <Text
                      style={{
                        color: color.blackText,
                        fontSize: windowWidth * 0.0436,
                        fontFamily: 'CenturyGothic',
                      }}>
                      {res.title}
                    </Text>
                    <Icon
                      type="FontAwesome"
                      name={res.icon}
                      style={{color: 'black'}}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={{
                width: windowWidth / 1.6,
                height: windowWidth / 9,
                backgroundColor: color.secondaryColor,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: windowWidth * 0.06,
                borderRadius: windowWidth * 0.06,
              }}
              onPress={() => this.setState({profilePicModal: false})}>
              <Text
                style={{
                  color: color.textColor,
                  fontSize: windowWidth * 0.0419,
                  alignSelf: 'center',
                  fontFamily: 'CenturyGothic-Bold',
                  paddingHorizontal: windowWidth * 0.06,
                  paddingVertical: windowWidth * 0.016,
                }}>
                CANCEL
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* <Modal isVisible={this.state.startAudio} style={{alignSelf: 'center'}}>
          <View
            style={{
              width: windowWidth / 1.16,
              height: windowWidth / 1.162,
              backgroundColor: color.primary,
              flexDirection: 'column',
              padding: windowWidth * 0.06,
            }}>
            <View>
              <Icon
                type="Feather"
                name={this.state.isRecording ? 'mic' : 'mic-off'}
                style={{
                  fontSize: windowWidth * 0.196,
                  color: 'white',
                  alignSelf: 'center',
                  marginTop: windowWidth * 0.0196,
                }}
              />
            </View>
            {/* <Text
              style={{
                textAlign: 'center',
                alignSelf: 'stretch',
                fontSize: windowWidth * 0.06,
                color: color.text,
                fontFamily: 'CenturyGothic',
                marginVertical: windowWidth * 0.06,
              }}>
              {this._getRecordingTimestamp()}
            </Text> 
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: windowWidth * 0.06,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({startAudio: false});
                }}
                style={{
                  flex: 0.45,
                  borderColor: color.text,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: color.text,
                    fontSize: windowWidth * 0.0416,
                    fontFamily: 'CenturyGothic',
                    paddingVertical: windowWidth * 0.0316,
                  }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.handleAudio.bind(this)}
                style={{
                  flex: 0.45,
                  borderColor: color.text,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: color.text,
                    fontSize: windowWidth * 0.0416,
                    fontFamily: 'CenturyGothic',
                    paddingVertical: windowWidth * 0.0316,
                  }}>
                  SEND
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 8,
            right: 10,

            zIndex: 99999,
          }}
          onPress={() =>
            this.chooseImage(
              this.state.token,
              this.state.sender_uid,
              this.state.channel,
            )
          }>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../Images/attachment.png')}></Image>
        </TouchableOpacity> */}
      </View>
    );
  }
  //   _onRecordPressed() {
  //     if (this.state.isRecording) {
  //       this._stopRecordingAndEnablePlayback();
  //     } else {
  //       this._stopPlaybackAndBeginRecording();
  //     }
  //   }

  //   _updateScreenForSoundStatus = status => {
  //     if (status.isLoaded) {
  //       this.setState({
  //         soundDuration: status.durationMillis,
  //         soundPosition: status.positionMillis,
  //         shouldPlay: status.shouldPlay,
  //         isPlaying: status.isPlaying,
  //         rate: status.rate,
  //         muted: status.isMuted,
  //         volume: status.volume,
  //         shouldCorrectPitch: status.shouldCorrectPitch,
  //         isPlaybackAllowed: true,
  //       });
  //     } else {
  //       this.setState({
  //         soundDuration: null,
  //         soundPosition: null,
  //         isPlaybackAllowed: false,
  //       });
  //       if (status.error) {
  //         console.log(`FATAL PLAYER ERROR: ${status.error}`);
  //       }
  //     }
  //   };

  //   _updateScreenForRecordingStatus = status => {
  //     if (status.canRecord) {
  //       this.setState({
  //         isRecording: status.isRecording,
  //         recordingDuration: status.durationMillis,
  //       });
  //     } else if (status.isDoneRecording) {
  //       this.setState({
  //         isRecording: false,
  //         recordingDuration: status.durationMillis,
  //       });
  //       if (!this.state.isLoading) {
  //         this._stopRecordingAndEnablePlayback();
  //       }
  //     }
  //   };

  //   async _stopPlaybackAndBeginRecording() {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     if (this.sound !== null) {
  //       await this.sound.unloadAsync();
  //       this.sound.setOnPlaybackStatusUpdate(null);
  //       this.sound = null;
  //     }
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  //       playsInSilentModeIOS: true,
  //       shouldDuckAndroid: true,
  //       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  //       playThroughEarpieceAndroid: true,
  //       staysActiveInBackground: true,
  //     });
  //     if (this.recording !== null) {
  //       this.setOnRecordingStatusUpdate(null);
  //       this.recording = null;
  //     }

  //     const recording = new Audio.Recording();
  //     await recording.prepareToRecordAsync(this.recordingSettings);
  //     recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

  //     this.recording = recording;
  //     await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }

  //   async _stopRecordingAndEnablePlayback() {
  //     this.setState({
  //       isLoading: true,
  //     });
  //     try {
  //       await this.recording.stopAndUnloadAsync();
  //     } catch (error) {
  //       // Do nothing -- we are already unloaded.
  //     }
  //     const info = await FileSystem.getInfoAsync(this.recording.getURI());
  //     this.setState({audioInfo: info});
  //     console.log(`FILE INFO: ${JSON.stringify(info)}`);
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: false,
  //       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
  //       playsInSilentModeIOS: true,
  //       playsInSilentLockedModeIOS: true,
  //       shouldDuckAndroid: true,
  //       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  //       playThroughEarpieceAndroid: true,
  //       staysActiveInBackground: true,
  //     });
  //     const {sound, status} = await this.recording.createNewLoadedSoundAsync(
  //       {
  //         isLooping: false,
  //         isMuted: this.state.muted,
  //         volume: this.state.volume,
  //         rate: this.state.rate,
  //         shouldCorrectPitch: this.state.shouldCorrectPitch,
  //       },
  //       //this._updateScreenForSoundStatus
  //     );
  //     this.sound = sound;
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }

  //   _getMMSSFromMillis(millis) {
  //     const totalSeconds = millis / 1000;
  //     const seconds = Math.floor(totalSeconds % 60);
  //     const minutes = Math.floor(totalSeconds / 60);

  //     const padWithZero = number => {
  //       const string = number.toString();
  //       if (number < 10) {
  //         return '0' + string;
  //       }
  //       return string;
  //     };
  //     return padWithZero(minutes) + ':' + padWithZero(seconds);
  //   }

  //   _getPlaybackTimestamp() {
  //     if (
  //       this.sound != null &&
  //       this.state.soundPosition != null &&
  //       this.state.soundDuration != null
  //     ) {
  //       return `${this._getMMSSFromMillis(
  //         this.state.soundPosition,
  //       )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
  //     }
  //     return '';
  //   }

  //   _getRecordingTimestamp() {
  //     if (this.state.recordingDuration != null) {
  //       return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
  //     }
  //     return `${this._getMMSSFromMillis(0)}`;
  //   }
  //   onSendAudio() {
  //     var value = 0;
  //     if (this.state.audioInfo != null) {
  //       console.log('onSendAudio', this.state.audioInfo);
  //       let msg = {
  //         _id: Math.round(Math.random() * 100000000),
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 1,
  //           text: this._getMMSSFromMillis(this.state.recordingDuration),
  //           avatar: require('../../Images/members/sandeep_consent.png'),
  //           createdAt: new Date(),
  //         },
  //         audio: this.state.audioInfo.uri,
  //       };

  //       this.setState({
  //         messages: GiftedChat.append(previousState.messages, msg),
  //         voiceModal: false,
  //         recordingDuration: null,
  //       });
  //     }
  //   }
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
)(AgoraChat);
