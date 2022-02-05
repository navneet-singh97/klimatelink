import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Vibration,
  Slider,
} from 'react-native';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {Button} from './../../components/button';
import AudioRecorder from './../../components/audioRecorder';
import moment from 'moment';
// import * as ImagePicker from "expo-image-picker";
import {Divider, SearchBar, Avatar, Badge} from 'react-native-elements';
import Modal from 'react-native-modal';
// import { Audio } from "expo-av";
// import { Camera } from "expo-camera";
// import * as Permissions from "expo-permissions";
// import * as FileSystem from "expo-file-system";

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
import styles from './styles';
import EmojiInput from 'react-native-emoji-input';
import {color} from '../../theme';
import ImagePicker from 'react-native-image-crop-picker';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IconsOptions = [
  {id: 0, type: 'FontAwesome5', name: 'smile'},
  {id: 0, type: 'Feather', name: 'camera'},
  {id: 0, type: 'FontAwesome', name: 'image'},
  //{ id: 0, type: "Feather", name: "mic-off" },
];

interface Props {}
interface ChatScreenInfo {
  messages: any;
  hasPermission: any;
  type: any;
  modalVisible: any;
  selectedEmoji: any;
  showEmoji: any;
  messageText: any;
  pickerImage: any;
  voiceModal: any;
  soundPosition: any;
  soundDuration: any;
  recordingDuration: any;
  isPlaying: any;
  isRecording: any;
  audioId: any;
  audioInfo: any;
  playableDuration: any;
  playinggg: any;
  pauseIcon: any;
  isSoundLoaded: any;
  playerModal: any;
  audioPlayerProps: any;
}
//const soundObject = new Audio.Sound();
class ChatScreen extends Component<Props, ChatScreenInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      hasPermission: null,
      //type: Camera.Constants.Type.back,
      modalVisible: false,
      selectedEmoji: '',
      showEmoji: false,
      messageText: '',
      pickerImage: '',
      voiceModal: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      isPlaying: false,
      isRecording: false,
      audioId: null,
      audioInfo: null,
      playableDuration: null,
      playinggg: false,
      pauseIcon: false,
      isSoundLoaded: false,
      playerModal: false,
      audioPlayerProps: null,
      isPlayinGGGGG: false,
      playbackInstance: null,
      isBuffering: false,
    };
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  async componentWillMount() {
    // <--Enable Comments for Audio Recording and Playing-->
    // try {
    //   await Audio.setAudioModeAsync({
    //     allowsRecordingIOS: false,
    //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //     playsInSilentModeIOS: true,
    //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    //     shouldDuckAndroid: true,
    //     staysActiveInBackground: true,
    //     playThroughEarpieceAndroid: true,
    //   });
    //   this.loadAudio();
    // } catch (e) {
    //   console.log(e);
    // }
  }
  componentDidMount() {
    // console.log(
    //   "this.props.navigation.state",
    //   this.props.route.params.chatData
    // );
    this.setState({
      messages: [
        {
          _id: 1,
          text:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. ",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: this.props.route.params.userImg,
          },
        },
      ],
    });
  }
  shouldUpdateMessage(props, nextProps) {
    const next = nextProps.currentMessage;
    const current = props.currentMessage;
    const {nextMessage} = props;
    const nextPropsMessage = nextProps.nextMessage;
    return (
      next.sent !== current.sent ||
      next.received !== current.received ||
      next.pending !== current.pending ||
      next.createdAt !== current.createdAt ||
      next.text !== current.text ||
      next.image !== current.image ||
      next.video !== current.video ||
      next.audio == current.audio ||
      nextMessage !== nextPropsMessage
    );
  }
  async loadAudio(props) {
    const {isPlayinGGGGG} = this.state;

    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: props.currentMessage.audio,
      };

      const status = {
        shouldPlay: isPlayinGGGGG,
      };

      playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      this.setState({playbackInstance}, () => {
        this.setState({playerModal: true});
        playbackInstance.stopAsync();
      });
    } catch (e) {
      console.log('playbackInstance_error', e);
    }
  }

  onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  handlePlayPause = async () => {
    const {isPlayinGGGGG, playbackInstance} = this.state;
    isPlayinGGGGG
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    this.setState({
      isPlayinGGGGG: !isPlayinGGGGG,
    });
  };

  renderBubble(props) {
    if (props.currentMessage.audio) {
      return (
        <View
          style={{
            paddingHorizontal: windowWidth * 0.0361,
            backgroundColor: '#729fcb',
            flexDirection: 'column',
            borderRadius: windowWidth * 0.0361,
            borderBottomRightRadius: 0,
          }}>
          <View
            style={{
              backgroundColor: '#729fcb',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: windowWidth * 0.0316,
            }}>
            <TouchableOpacity onPress={this.loadAudio.bind(this, props)}>
              <Icon
                type={'Ionicons'}
                name={'play'}
                style={{
                  //alignSelf: "center",
                  color: color.textColor,
                  fontSize: windowWidth * 0.0691,
                  marginBottom: -windowWidth * 0.0516,
                  marginRight: windowWidth * 0.0516,
                }}
              />
              <Text
                style={{
                  fontFamily: 'CenturyGothic',
                  fontSize: windowWidth * 0.036,
                  color: color.textColor,
                }}>
                {/* {this._getMMSSFromMillis(this.state.playableDuration)} */}
              </Text>
            </TouchableOpacity>

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
    } else {
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

  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.setState({selectedEmoji: ''});
      },
    );
  }
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
  renderMessage = props => {
    //console.log("renderMessage:", props);
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
              {i == 0 ? (
                <Image
                  resizeMode={'cover'}
                  source={require('./../../Images/emoji.png')}
                  style={{
                    width: windowWidth * 0.0546,
                    height: windowWidth * 0.0546,
                    alignSelf: 'center',
                    marginTop: windowWidth * 0.0336,
                    marginRight: windowWidth * 0.0136,
                  }}
                />
              ) : (
                <Icon
                  type={res.type}
                  name={res.name}
                  style={{
                    fontSize: windowWidth * 0.0461,
                    color: res.name == 'smiley' ? '#ffc63e' : color.lineColor,
                    padding: windowWidth * 0.036,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  async onSelectCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        console.log('onSelectCamera', image);
        //await this.setState({userImage: image.path});
        let msg = {
          user: {
            _id: 1,
            avatar: require('../../Images/members/sandeep_consent.png'),
            createdAt: new Date(),
          },
          image: image.path,
        };

        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg),
        }));
      })
      .catch(error => {
        console.log('onSelectCamera_error', error);
      });
  }

  async onSelectGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(async image => {
        console.log('onSelectGallery', image);
        //await this.setState({userImage: image.path});
        let msg = {
          user: {
            _id: 1,
            avatar: require('../../Images/members/sandeep_consent.png'),
            createdAt: new Date(),
          },
          image: image.path,
        };

        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msg),
        }));
      })
      .catch(error => {
        console.log('onSelectGallery_error', error);
      });
  }

  async onSelectOption(res) {
    if (res.name == 'camera') {
      this.onSelectCamera();
    } else if (res.name == 'smile') {
      this.setState({showEmoji: true});
      Keyboard.dismiss();
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
  }

  filterFunctionByUnicode = emoji => {
    //console.log("emohi:", emoji);
    return emoji.lib.added_in === '6.0' || emoji.lib.added_in === '6.1';
  };

  onSelectedEmoji = emoji => {
    this.setState(
      {
        selectedEmoji: emoji.char,
      },
      () => {
        this.setState({
          messageText: this.state.messageText + '' + this.state.selectedEmoji,
        });
      },
    );
  };

  render() {
    //const { navigate } = this.props
    //console.log("render", this._getSeekSliderPosition());
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <Header onLeftPress={this.onLeft.bind(this)}>Alumni Members</Header>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <GiftedChat
              //extraData={this.state}
              text={this.state.messageText}
              onInputTextChanged={messageText =>
                this.setState({messageText: messageText})
              }
              value={this.state.messageText}
              placeholder="Message Member"
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              user={{
                _id: 1,
                avatar: require('../../Images/members/sandeep_consent.png'),
              }}
              //renderMessage={this.renderMessage}
              renderBubble={this.renderBubble.bind(this)}
              renderSend={this.renderSend}
              renderInputToolbar={this.renderInputToolbar}
              renderComposer={this.renderComposer}
              shouldUpdateMessage={this.shouldUpdateMessage}
              messagesContainerStyle={{
                backgroundColor: 'transaprent',
                paddingVertical: 10,
              }}
              renderChatFooter={this.renderChatFooter.bind(this)}
              alwaysShowSend={true}
              showUserAvatar={true}
            />
            {/* <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset={80}
          /> */}
            {this.state.showEmoji ? (
              <EmojiInput
                enableSearch={false}
                categoryFontSize={windowWidth * 0.06}
                categoryLabelHeight={windowWidth * 0.056}
                categoryLabelTextStyle={{
                  fontFamily: 'CenturyGothic',
                  fontSize: windowWidth * 0.0316,
                }}
                emojiFontSize={windowWidth * 0.0699}
                onEmojiSelected={this.onSelectedEmoji.bind(this)}
                renderAheadOffset={100}
                //filterFunctions={[this.filterFunctionByUnicode]}
              />
            ) : null}
          </View>
          <Modal
            isVisible={this.state.voiceModal}
            style={{alignSelf: 'center'}}>
            <View
              style={{
                width: windowWidth / 1.16,
                height: windowWidth / 1.162,
                backgroundColor: color.primary,
                flexDirection: 'column',
                padding: windowWidth * 0.06,
              }}>
              <Text
                style={{
                  color: color.text,
                  fontSize: windowWidth * 0.046,
                  fontFamily: 'CenturyGothic',
                  textAlign: 'center',
                  marginBottom: windowWidth * 0.06,
                }}>
                Tap on Mic to Record/Stop
              </Text>
              <TouchableOpacity onPress={this._onRecordPressed.bind(this)}>
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
              </TouchableOpacity>
              <Text
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
                    this.setState({voiceModal: false});
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
                  onPress={this.onSendAudio.bind(this)}
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
          </Modal>

          <Modal
            isVisible={this.state.playerModal}
            style={{flex: 1, alignSelf: 'center'}}>
            <TouchableOpacity
              style={{
                flex: 0.05,
                alignSelf: 'flex-end',
              }}
              onPress={() => {
                this.setState({
                  playerModal: false,
                });
              }}>
              <Icon
                type={'Entypo'}
                name={'circle-with-cross'}
                style={{
                  //alignSelf: "center",
                  color: color.textColor,
                  fontSize: windowWidth * 0.0791,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flex: 0.95,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: windowWidth,
                  height: windowWidth * 0.216,
                  backgroundColor: color.primaryColor,
                  flexDirection: 'column',
                  padding: windowWidth * 0.06,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={this.handlePlayPause.bind(this)}>
                    <Icon
                      type={'Ionicons'}
                      name={this.state.isPlayinGGGGG ? 'play' : 'pause'}
                      style={{
                        //alignSelf: "center",
                        color: color.textColor,
                        fontSize: windowWidth * 0.0791,
                      }}
                    />
                  </TouchableOpacity>
                  <Slider
                    ref={r => (this.slider = r)}
                    style={{alignSelf: 'stretch', width: windowWidth * 0.6}}
                    thumbTintColor={'white'}
                    minimumTrackTintColor={'white'}
                    trackImage={require('./../../Images/track_1.png')}
                    thumbImage={require('./../../Images/thumb_1.png')}
                    value={this.state.soundPosition / this.state.soundDuration}
                    onValueChange={value => console.log('onValueChange')}
                    onSlidingComplete={value => {
                      console.log('on sliding complete');
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'CenturyGothic',
                      fontSize: windowWidth * 0.036,
                      color: color.textColor,
                    }}>
                    {this._getMMSSFromMillis(this.state.soundPosition)}
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </View>
    );
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log('photo', photo);
      let msg = {
        user: {
          _id: 1,
          avatar: require('../../Images/members/sandeep_consent.png'),
          createdAt: new Date(),
        },
        image: photo.uri,
      };
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg),
      }));
      this.setState({modalVisible: false});
    }
  };

  _onRecordPressed() {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  }

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    this.setState({audioInfo: info});
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true,
      staysActiveInBackground: true,
    });
    const {sound, status} = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      //this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getPlaybackTimestamp() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.soundPosition,
      )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
    }
    return '';
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  _onSeekSliderValueChange(value) {
    console.log('_onSeekSliderValueChange', value);
    if (this.state.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.state.playbackInstance.pauseAsync();
    }
  }

  async _onSeekSliderSlidingComplete(value) {
    console.log('_onSeekSliderSlidingComplete', value);
    if (this.state.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.state.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.state.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  }

  _getSeekSliderPosition() {
    if (
      this.sound != null &&
      this.state.soundPosition != null &&
      this.state.soundDuration != null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  onSendAudio() {
    var value = 0;
    if (this.state.audioInfo != null) {
      console.log('onSendAudio', this.state.audioInfo);
      let msg = {
        _id: Math.round(Math.random() * 100000000),
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          text: this._getMMSSFromMillis(this.state.recordingDuration),
          avatar: require('../../Images/members/sandeep_consent.png'),
          createdAt: new Date(),
        },
        audio: this.state.audioInfo.uri,
      };

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg),
        voiceModal: false,
        recordingDuration: null,
      }));
    }
  }
}

export default ChatScreen;
