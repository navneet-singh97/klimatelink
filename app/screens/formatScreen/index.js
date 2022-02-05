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
import {toUpper} from 'lodash';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let lessonsList = [
  {
    id: 0,
    title: 'Lesson 1',
    des: 'Market Structure',
    previewImgUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 0,
    title: 'Lesson 2',
    des: 'Project In',
    previewImgUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 0,
    title: 'Lesson 3',
    des: 'New Podcast',
    previewImgUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
];

let commentsList = [
  {
    id: 0,
    name: 'Jon Simpson',
    comment: 'Amazing Podcast - Thanks for',
    time: '11 Jan 2020',
  },
  {
    id: 1,
    name: 'Daisy',
    comment: 'Amazing Podcast - Thanks for',
    time: '11 Jan 2020',
  },
  {
    id: 2,
    name: 'Atkins',
    comment: 'Amazing Podcast - Thanks for',
    time: '11 Jan 2020',
  },
  {
    id: 3,
    name: 'Jon Simpson',
    comment: 'Amazing Podcast - Thanks for',
    time: '11 Jan 2020',
  },
  {
    id: 4,
    name: 'Daisy',
    comment: 'Amazing Podcast - Thanks for',
    time: '11 Jan 2020',
  },
  {
    id: 5,
    name: 'Atkins',
    comment: 'Amazing Podcast - Thanks for',
    time: '11 Jan 2020',
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
      imageType: '',
    };
    //this._player = null;
    this.onEnd = this._onEnd.bind(this);
  }

  componentDidMount() {
    if (
      this.props.route.params.item.title ==
      'Opportunity in Green Hydrogen by Jason Response'
    ) {
      this.setState({
        imageType: require('../../Images/StoriesIcons/Person2.png'),
      });
    } else if (
      this.props.route.params.item.title ==
      'Energy Efficiency 101 for beginners by Hanson Deck'
    ) {
      this.setState({
        imageType: require('../../Images/StoriesIcons/Person3.png'),
      });
    } else if (
      this.props.route.params.item.title ==
      'Career transition into digital by Piff Jenkins'
    ) {
      this.setState({
        imageType: require('../../Images/StoriesIcons/Person1.png'),
      });
    } else if (
      this.props.route.params.item.title ==
      'The power of Blockchain  Technology by Jake Weary'
    ) {
      this.setState({
        imageType: require('../../Images/StoriesIcons/Person5.png'),
      });
    }
  }

  onSubmit() {}

  onLeft() {
    this.props.navigation.goBack();
  }

  onChangeLesson(item) {
    // this.setState({
    //   previewImgUrl: item.previewImgUrl,
    //   videoUrl: item.videoUrl,
    // });
    this.props.navigation.push('ContentScreen');
  }

  _onEnd() {
    this.setState({paused: true}, () => {
      this._player.player.ref.seek(0);
    });
    console.log('this._player.', this._player);
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={this.onChangeLesson.bind(this, item)}
        style={{
          backgroundColor: color.secondaryColor,
          borderRadius: windowWidth * 0.036,
          padding: windowWidth * 0.036,
          height: windowWidth / 4.6,
          width: windowWidth / 1.6,
          justifyContent: 'center',
          marginRight: windowWidth * 0.036,
          marginLeft: windowWidth * 0.016,
        }}>
        <View>
          <Text style={styles.lessonTitle}>{item.title}</Text>
          <Text style={styles.lesDes}>{item.des}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderCommentItem({item, index}) {
    let showAllRows = false;
    if (this.state.showAll) {
      showAllRows = true;
    } else {
      showAllRows = false;
    }
    return (
      <View>
        {showAllRows == false ? (
          index == 0 ? (
            <View style={styles.row}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Images/userImage.jpg')}
                    style={styles.rowImage}
                  />
                  <Text style={styles.instructorName}>{item.name}</Text>
                </View>
                <Text style={styles.dateText}>{item.time}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            </View>
          ) : null
        ) : (
          <View style={styles.row}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../Images/userImage.jpg')}
                  style={styles.rowImage}
                />
                <Text style={styles.instructorName}>{item.name}</Text>
              </View>
              <Text style={styles.dateText}>{item.time}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          </View>
        )}
      </View>
    );
  }

  onBuffer(value) {
    console.log(value);
  }

  videoError(err) {
    console.log('videoError', err);
  }

  // onEnterFullscreen() {
  //   //alert('onEnterFullscreen');
  //   this.setState({setFullScreen: true}, () => {
  //     StatusBar.setHidden(true);
  //     setTimeout(() => {
  //       Orientation.lockToLandscapeLeft();
  //     }, 1000);
  //   });
  //   //this.props.navigation.push('VideoPlayer');
  // }

  onExitFullscreen() {
    //alert('onExitFullscreen');
    this.setState({setFullScreen: false}, () => {
      Orientation.lockToPortrait();
    });
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>LIBRARY</Text>
            </Header>

            <View style={styles.container}>
              <View style={styles.topContainer}>
                <ImageBackground
                  resizeMode="cover"
                  source={this.state.imageType}
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  resizeMode={'cover'}>
                  <View
                    style={{
                      flex: 0.65,
                      backgroundColor: 'transparent',
                      width: windowWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: windowWidth * 0.036,
                    }}>
                    {/* <TouchableOpacity>
                      <Icon
                        type="FontAwesome"
                        name={'play'}
                        style={styles.playpauseIcon}
                      />
                    </TouchableOpacity> */}
                  </View>
                  <View
                    style={{
                      flex: 0.35,
                      width: windowWidth,
                      alignSelf: 'flex-start',
                      justifyContent: 'center',
                      paddingLeft: windowWidth * 0.036,
                    }}>
                    <View style={styles.IconCircle}>
                      {this.props.route.params.libraryType == 'videos' ? (
                        <Image
                          source={require('./../../Images/videocam.jpeg')}
                          style={styles.videoListIcon}
                        />
                      ) : (
                        <Image
                          source={require('./../../Images/headphones.jpeg')}
                          style={styles.videoListIcon}
                        />
                      )}
                    </View>
                    <View></View>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.bottomContainer}>
                <View
                  style={{
                    flex: 0.3,
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <FlatList
                    contentContainerStyle={{paddingTop: windowWidth * 0.0196}}
                    data={lessonsList}
                    extraData={this.state}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={item => item}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                <View
                  style={{
                    flex: 0.7,
                    backgroundColor: 'transparent',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: windowWidth * 0.0136,
                      marginTop: windowWidth * 0.006,
                    }}>
                    <Text style={styles.commonBlackTitle}>Comments</Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({showAll: !this.state.showAll});
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.showAllTitle}>Show all</Text>
                        <Icon
                          type="FontAwesome"
                          name={
                            !this.state.showAll
                              ? 'angle-double-down'
                              : 'angle-double-up'
                          }
                          style={styles.dropDownArrow}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    //contentContainerStyle={{paddingTop: windowWidth * 0.36}}
                    data={commentsList}
                    extraData={this.state}
                    renderItem={this.renderCommentItem.bind(this)}
                    keyExtractor={item => item}
                  />
                  <View
                    style={{
                      minHeight: windowWidth * 0.06,
                      width: windowWidth,
                      backgroundColor: '#f4f4f4',
                      flexDirection: 'row',
                      paddingBottom: windowWidth * 0.0516,
                      paddingTop: windowWidth * 0.0136,
                    }}>
                    <TextInput
                      placeholder="Comment"
                      style={{
                        height: windowWidth * 0.136,
                        width: windowWidth / 1.306,
                        borderWidth: 1,
                        padding: windowWidth * 0.036,
                        fontFamily: 'CenturyGothic',
                        color: color.textColor,
                        fontSize: windowWidth * 0.0416,
                        marginHorizontal: windowWidth * 0.036,
                        borderRadius: windowWidth * 0.136,
                      }}
                    />
                    <TouchableOpacity
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Icon
                        type="FontAwesome"
                        name={'send'}
                        style={{
                          fontSize: windowWidth * 0.063,
                          color: color.appGreen,
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {/* <VideoPlayer
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
            onBack={this.onExitFullscreen.bind(this)}
            onEnd={this.onEnd}
            // seekColor={'#ED298A'}
          /> */}
            {/* </ScrollView> */}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
export default connect(
  state => ({
    initial: state,
  }),
  {getData},
)(FormatScreen);
