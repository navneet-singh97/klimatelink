import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Keyboard,
  ToastAndroid,
  ImageBackground,
  BackHandler,
  StatusBar,
} from 'react-native';
import {Header} from '../../components/header';
import {BottomTabFooter} from '../../components/footer';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {Drawer, Toast} from 'native-base';

import SideBar from '../sideBar/index';
import Home from '../home';
import Rewards from '../rewards';
import Certificates from '../certificates';
import Profile from '../profile';
import Communities from '../communities';
import Credentials from '../credentials';
import QrScanner from '../qrScanner';
// import Account from '../account';

import ContentScreen from '../contentScreen';
import ChallengeScreen from '../challengeScreen';
import ContentFormScreen from '../contentFormScreen';
import UserProfile from '../userProfile';
import FormatScreen from '../formatScreen';
import More from '../more';

import SafeAreaView from 'react-native-safe-area-view';

import {FloatingAction} from 'react-native-floating-action';
import {Icon} from 'native-base';

import styles from './styles';

import {signOut, saveUserId} from './../../redux/actions/user';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import staticObject from '../staticObject/staticObject';
import {color} from '../../theme';
import database from '@react-native-firebase/database';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const actions = [
  {
    text: 'Others',
    icon: require('./../../Images/claps.png'),
    name: 'Others',
    position: 2,
    color: '#326393',
    textColor: 'white',
    textBackground: 'black',
    textStyle: {fontSize: windowWidth * 0.0316, fontFamily: 'CenturyGothic'},
  },
  {
    text: 'Education',
    icon: require('./../../Images/studentHat.png'),
    name: 'Education',
    position: 1,
    color: '#326393',
    textColor: 'white',
    textBackground: 'black',
    textStyle: {fontSize: windowWidth * 0.0316, fontFamily: 'CenturyGothic'},
  },
  ,
];
interface Props {
  navigation: any;
}
interface extraInfo {
  drawer: any;
  navigation: any;
}
interface userInfo {
  selectedTab: any;
  selectedTabName: any;
  activeIndex: any;
  carouselItems: any;
  isOpen: any;
  selectedMenuValue: any;
  selectedHeaderName: any;
  hideBottomTabBar: any;
}

class Main extends Component<Props, userInfo, extraInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedTabName: 'HOME',
      activeIndex: 3,
      carouselItems: staticObject.carouselItems,
      isOpen: false,
      selectedMenuValue: '',
      selectedHeaderName: 'HOME',
      hideBottomTabBar: false,
      userId: '',
      clickcount: 0,
    };
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentDidMount() {
    //uncomment this code
    //await this.props.getUserDetails(this.state.userId);
    if (this.props.route.params !== undefined) {
      //console.log('main:::' + JSON.stringify(this.props.route.params));
      await this.setState({userId: this.props.route.params.userId});
      await this.props.saveUserId(this.state.userId);

      // if (this.props.route.params.navigateFrom == 'Credintials') {
      //   this.setState({
      //     selectedMenuValue: 'Certificate',
      //     selectedHeaderName: 'CERTIFICATES',
      //     selectedTab: null,
      //     isOpen: false,
      //   });
      // } else

      //alert(this.state.userId);
      if (this.props.route.params.navigateFrom == 'ProfileCommunity') {
        this.setState({
          selectedTab: 1,
          selectedTabName: 'COMMUNITIES',
          selectedHeaderName: 'COMMUNITIES',
        });
      }
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({clickcount: this.state.clickcount + 1});
      this.check();
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  check = () => {
    if (this.state.clickcount < 2) {
      ToastAndroid.showWithGravityAndOffset(
        'Press back again to exit App',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (this.state.clickcount == 2) {
      let guid = this.props.user.userUId;
      let userCommunities = this.props.user.userCommunities;
      // (async () => {
         userCommunities.forEach(element => {
          database()
            .ref(`Group/${element.uid}/${guid}`)
            .set({userId: guid, isOnline: false})
            .then(data => {
              //success callback
              console.log('data ', data);
            })
            .catch(error => {
              //error callback
              console.log('error ', error);
            });
        });
        BackHandler.exitApp();
      // })();
    }
  };

  onLeft() {
    // if (this.state.isOpen) {
    //   this.drawer._root.close();
    //   this.setState({
    //     isOpen: false,
    //   });
    // } else {
    //   this.drawer._root.open();
    //   this.setState({
    //     isOpen: true,
    //   });
    // }
    Keyboard.dismiss();
  }

  backClose() {
    this.setState({
      isOpen: false,
    });
  }

  async closeDrawer(params) {
    //alert(params);
    if (params === 'Content') {
      this.setState({
        selectedMenuValue: 'Content',
        selectedHeaderName: 'CONTENT',
        selectedTab: null,
        isOpen: false,
      });
    } else if (params === 'Challenge') {
      this.setState({
        selectedMenuValue: 'Challenge',
        selectedHeaderName: 'CHALLENGE',
        selectedTab: null,
        isOpen: false,
      });
    } else if (params === 'ContentForm') {
      this.setState({
        selectedMenuValue: 'ContentForm',
        selectedHeaderName: 'CONTENTFORM',
        selectedTab: null,
        isOpen: false,
      });
    } else if (params === 'UserProfile') {
      this.setState({
        selectedMenuValue: 'UserProfile',
        selectedHeaderName: 'USER PROFILE',
        selectedTab: null,
        isOpen: false,
      });
    } else if (params === 'Format') {
      this.setState({
        selectedMenuValue: 'Format',
        selectedHeaderName: 'FORMAT',
        selectedTab: null,
        isOpen: false,
      });
    }
    this.drawer._root.close();
  }

  onTab(res) {
    this.setState({
      selectedTab: res.id,
      selectedTabName: res.name,
      selectedHeaderName: res.name,
    });
  }

  _renderItem({item, index}) {
    return (
      <View>
        <TouchableOpacity style={styles.renderButton}>
          <Icon type={item.type} name={item.icon} style={{color: 'white'}} />
        </TouchableOpacity>
        <Text style={styles.renderText}>{item.title}</Text>
      </View>
    );
  }

  async onFloatingButton(name) {
    try {
      console.log('onFloatingButton', name);
    } catch (error) {
      console.log(error);
    }
  }

  onNotification() {
    this.props.navigation.push('Notifications');
  }

  hideBottomTab(value) {
    this.setState({hideBottomTabBar: value});
  }

  CallSignOut() {
    this.props.signOut();
    this.props.navigation.push('OnBoarding', {
      navigateFrom: 'MainScreen_Logout',
    });
  }

  render() {
    //const { navigate } = this.props
    //console.log(this.props);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle={'dark-content'} />
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <Header
            notification
            leftMenu
            onLeftPress={this.onLeft.bind(this)}
            onRightPress={this.onNotification.bind(this)}>
            {this.state.selectedHeaderName}
          </Header>
          <View style={{flex: 1, overflow: 'hidden'}}>
            <Drawer
              openDrawerOffset={0.36}
              panCloseMask={0.36}
              ref={ref => {
                this.drawer = ref;
              }}
              onClose={() => this.backClose()}
              content={
                <SideBar
                  navigation={this.props.navigation}
                  onCloseMenu={params => this.closeDrawer(params)}
                />
              }>
              <View style={styles.container}>
                {this.state.selectedTab == 0 ? (
                  <Home navigation={this.props.navigation} />
                ) : this.state.selectedTab == 1 ? (
                  <Communities
                    navigation={this.props.navigation}
                    hideBottomTab={data => this.hideBottomTab(data)}
                  />
                ) : this.state.selectedTab == 2 ? (
                  <Profile
                    navigation={this.props.navigation}
                    userId={
                      this.props.route.params.userId !== undefined
                        ? this.props.route.params.userId
                        : this.state.userId
                    }
                  />
                ) : this.state.selectedTab == 3 ? (
                  <Rewards navigation={this.props.navigation} />
                ) : this.state.selectedTab == 4 ? (
                  <More navigation={this.props.navigation} {...this.props} />
                ) : this.state.selectedMenuValue == 'Content' ? (
                  <ContentScreen navigation={this.props.navigation} />
                ) : this.state.selectedMenuValue == 'Challenge' ? (
                  <ChallengeScreen navigation={this.props.navigation} />
                ) : this.state.selectedMenuValue == 'ContentForm' ? (
                  <ContentFormScreen navigation={this.props.navigation} />
                ) : this.state.selectedMenuValue == 'UserProfile' ? (
                  <UserProfile navigation={this.props.navigation} />
                ) : this.state.selectedMenuValue == 'Format' ? (
                  <FormatScreen navigation={this.props.navigation} />
                ) : null}
              </View>
              {this.state.hideBottomTabBar ? null : (
                <BottomTabFooter
                  tabsList={staticObject.bottomTabsList}
                  onPress={res => this.onTab(res)}
                  selectedTab={this.state.selectedTab}
                />
              )}
            </Drawer>
          </View>

          {/* {this.state.selectedTab == 1 ? (
          <FloatingAction
            color={color.primary}
            overlayColor={"rgba(255, 255, 255, 0.69)"}
            distanceToEdge={{
              vertical: windowWidth * 0.26,
              horizontal: windowWidth * 0.036,
            }}
            buttonSize={windowWidth * 0.16}
            actions={actions}
            onPressItem={this.onFloatingButton.bind(this)}
          />
        ) : null} */}
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {signOut, saveUserId},
)(Main);
