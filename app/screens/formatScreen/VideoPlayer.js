import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {getData} from '../../redux/actions/initial';
import {color} from './../../theme';
import styles from './styles';
import Modal from 'react-native-modal';
import {Input, Button} from 'react-native-elements';
import {Icon} from 'native-base';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let lessonsList = [
  {
    id: 0,
    title: 'Lesson 2',
    des: 'Market Structure',
    previewImgUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 0,
    title: 'Lesson 3',
    des: 'Project In',
    previewImgUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 0,
    title: 'Lesson 4',
    des: 'New Podcast',
    previewImgUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
];

class FormatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayPinScreen: false,
      pinValue: '',
      errorMsg: '',
      correctPin: 'IN$15#',
      showEye: false,
      showAll: false,
      previewImgUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      videoUrl:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      setFullScreen: false,
      paused: false,
    };
    //this._player = null;
    this.onEnd = this._onEnd.bind(this);
  }

  componentDidMount() {}

  onExitFullscreen() {
    //alert('onExitFullscreen');
    this.props.navigation.goBack();
  }

  onBack() {
    this.props.navigation.goBack();
  }

  onBuffer(value) {
    console.log(value);
  }

  videoError(err) {
    console.log('videoError_player', err);
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <VideoPlayer
          ref={ref => (this._player = ref)}
          navigator={this.props.navigator}
          source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
          onError={this.videoError}
          //videoStyle={{transform: [{rotate: '90deg'}]}}
          //onEnterFullscreen={this.onEnterFullscreen.bind(this)}
          onExitFullscreen={this.onExitFullscreen.bind(this)}
          onProgress={data => console.log('onProgress_video_123', data)}
          paused={true}
          disableVolume={true}
          disableBack={false}
          disableFullscreen={true}
          onBack={this.onBack.bind(this)}
          onEnd={this.onEnd}
          // seekColor={'#ED298A'}
        />
      </View>
    );
  }
}
export default connect(
  state => ({
    initial: state,
  }),
  {getData},
)(VideoPlayer);
