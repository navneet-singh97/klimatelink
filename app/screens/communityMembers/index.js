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
  Platform,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Icon, TabHeading, Tab, Tabs} from 'native-base';
import {Header} from '../../components/header';
import {CardView} from '../../components/cardView';
import {Button} from './../../components/button';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Divider, SearchBar, Avatar, Badge, colors} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import RtmAdapter from '../agora/rtm-adapter';
import {cred} from '../agora/credentials';

import {
  getCommunityMember,
  getCommunityUserDeviceToken,
} from './../../redux/actions/communities';

import styles from './styles';

import {color} from '../../theme';
import {Alert} from 'react-native';
import RtcAdapter from '../agora/rtc-adapter';
import RTMClient from '../agora/rtm-client';
import database from '@react-native-firebase/database';
import {ThemeProvider} from 'react-native-country-picker-modal/lib/CountryTheme';
import {TextInput} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const image = require('./../../Images/members/1.png');

const searchMembersList = [
  {
    title: 'Rohith',
    image: require('./../../Images/members/1.png'),
    status: 'online',
  },
  {
    title: 'Lakshmi',
    image: require('./../../Images/members/2.png'),
    status: 'online',
  },
  {
    title: 'Vijay',
    image: require('./../../Images/members/3.png'),
    status: 'online',
  },
  {
    title: 'Deepa',
    image: require('./../../Images/members/4.png'),
    status: 'online',
  },
  {
    title: 'Santosh',
    image: require('./../../Images/members/5.png'),
    status: 'online',
  },
  {
    title: 'Nitesh',
    image: require('./../../Images/members/6.png'),
    status: 'online',
  },
  {
    title: 'Varun',
    image: require('./../../Images/members/7.png'),
    status: 'offline',
  },
  {
    title: 'Pooja',
    image: require('./../../Images/members/8.png'),
    status: 'offline',
  },
  {
    title: 'Satish',
    image: require('./../../Images/members/9.png'),
    status: 'offline',
  },
];

const activeList = [
  {
    title: 'Rohith',
    image: require('./../../Images/members/1.png'),
  },
  {
    title: 'Lakshmi',
    image: require('./../../Images/members/2.png'),
  },
  {
    title: 'Vijay',
    image: require('./../../Images/members/3.png'),
  },
  {
    title: 'Deepa',
    image: require('./../../Images/members/4.png'),
  },
  {
    title: 'Santosh',
    image: require('./../../Images/members/5.png'),
  },
  {
    title: 'Nitesh',
    image: require('./../../Images/members/6.png'),
  },
  {
    title: 'Varun',
    image: require('./../../Images/members/7.png'),
  },
  {
    title: 'Pooja',
    image: require('./../../Images/members/8.png'),
  },
  {
    title: 'Satish',
    image: require('./../../Images/members/9.png'),
  },
];

const recentChatList = [
  {
    title: 'Rohith',
    image: require('./../../Images/members/1.png'),
    message: 'Thanks for sending the files....',
    messageCount: '6',
    time: '10:00 AM',
  },
  {
    title: 'Lakshmi',
    image: require('./../../Images/members/2.png'),
    message: 'Thanks for sending the files....',
    messageCount: '6',
    time: '10:00 AM',
  },
  {
    title: 'Vijay',
    image: require('./../../Images/members/3.png'),
    message: 'Thanks for sending the files....',
    messageCount: '6',
    time: '10:00 AM',
  },
  {
    title: 'Deepa',
    image: require('./../../Images/members/4.png'),
    message: 'Thanks for sending the files....',
    messageCount: '6',
    time: '10:00 AM',
  },
  {
    title: 'Santosh',
    image: require('./../../Images/members/5.png'),
    message: 'Thanks for sending the files....',
    messageCount: '6',
    time: '10:00 AM',
  },
  {
    title: 'Nitesh',
    image: require('./../../Images/members/6.png'),
    message: 'Thanks for sending the files....',
    messageCount: '6',
    time: '10:00 AM',
  },
];

interface Props {}
interface communityMembersInfo {
  searchMembers: any;
  filterSearchList: any;
}

const BASE_URL = 'https://api.klimatelink.com/api/v1/';

class CommunityMembers extends Component<Props, communityMembersInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchMembers: '',
      filterSearchList: {},
      topTitle: 'Active',
      communityMember: [],
      sender_uuid: '',
      selectedTab: 0,
      generalView: true,
      settingsView: false,
      groupListing: [],
      firebaseUsers: {},
      channelId: '',
    };
    this.client = new RtmAdapter();
    this.clientRTC = new RtcAdapter();
    this.rtm = new RTMClient();
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  agorainit = async uuid => {
    this.state.sender_uuid = uuid;
    try {
      const response = await fetch(
        'https://api.klimatelink.com//agora/rtm/' + uuid + '/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const responseJson = await response.json();
      console.log(JSON.stringify(responseJson), 'ress');
      if (responseJson?.rtmToken) {
        cred.agora_app_token = responseJson.rtmToken;
        this.client.login(uuid, responseJson.rtmToken).then(RES => {
          console.log('login success' + uuid);
        });
        // this.rtm.init(cred.agora_AppID);
        // this.rtm
        //   .login(uuid, responseJson.rtmToken)
        //   .then(() => {
        //     this.rtm._logined = true;
        //     console.log('login success' + uuid);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        // this.clientRTC.login(responseJson.rtmToken).then((RES) => {
        //   console.log('loginRTC success',RES);
        // });
      }
    } catch (err) {
      // console.log(err, 'init error');
      alert('Something went wrong. Please try later1');
    }
  };
  async componentDidMount() {
    await this.agorainit(uuidv4());
    // console.log('Community Member 186', this.props);
    const {userUId} = this.props.user;
    if (this.props.route.params !== undefined) {
      if (this.props.route.params.navigateFrom == 'ProfileMutualFollowers') {
        this.setState({topTitle: 'Followers'});
      }
    } else {
      this.setState({topTitle: 'Active'});
    }
    const {communityInformation} = this.props.communities;
    await this.props.getCommunityUserDeviceToken(
      communityInformation.result?.uid,
    );
    await this.props.getCommunityMember(communityInformation.result?.uid);
    const {communityMember} = this.props.communities;
    if (
      communityMember &&
      communityMember.message == 'GET Request successful.'
    ) {
      const {result} = communityMember;
      var members = [];
      var memberId = {};
      if (result && result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          if (memberId[result[i].userId]) {
            //
          } else {
            memberId[result[i].userId] = true;
            if (result[i].isActive && result[i].userId != userUId) {
              members.push(result[i]);
            }
          }
        }
        let firebaseCommunityId = this.props.route.params.firebaseCommunityId;
        var ref = database().ref(`Group/${firebaseCommunityId}`);
        // ref.once('value').then(res => {
        //   // let response = Object.assign(res);
        //   console.log('Data in then block is', JSON.stringify(res));
        //   var xyz = Object.values(res)[0].value;
        //   members.forEach(element => {
        //     let userId = element.userId;
        //     if (xyz.hasOwnProperty(userId)) {
        //       element.isActive = true;
        //     } else {
        //       element.isActive = false;
        //     }
        //   });
        // });
        this.setState({communityMember: [...members]});
        //Below is the added update listener
        ref.on('value', snapshot => {
          this.getActiveMembers(snapshot);
        });
      }
    }
    this.groupChatListing();
  }

  getActiveMembers = snapshot => {
    let a = snapshot.val();
    let members = [...this.state.communityMember];
    members.forEach(element => {
      let userId = element.userId;
      if (a.hasOwnProperty(userId)) {
        element.isActive = a[userId].isOnline;
      } else {
        element.isActive = false;
      }
    });
    this.setState({communityMember: [...members]});
  };

  async groupChatListing() {
    const {communityInformation} = this.props.communities;

    // console.log(
    //   'communityInformationcommunityInformation',
    //   communityInformation,
    // );
    const response = await fetch(
      BASE_URL + 'chatmaster/community/' + communityInformation.result.uid,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const responseJson = await response.json();
    this.setState({
      groupListing: responseJson.result,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.communities != this.props.communities) {
      console.log('Updated');
      this.groupChatListing();
    }
  }

  componentWillUnmount() {
    this.client?.logout();
    this.client?.destroy();
  }

  renderItem({item, index}) {
    return (
      <View style={styles.listImageView}>
        <View style={styles.activeListView}>
          {/* <Badge
            status={
              // this.state.firebaseUsers[item.participantUid].isOnline
              'success'
              // : 'error'
            }
            badgeStyle={styles.activeBadge}
          /> */}
          <Avatar
            rounded
            source={item.image}
            size={windowWidth * 0.146}
            containerStyle={{alignSelf: 'center'}}
          />
        </View>
        <Text style={styles.activeListName}>{item.title}</Text>
      </View>
    );
  }

  onPressCreateGroup() {
    this.props.navigation.push('GroupChat', {
      firebaseCommunityId: this.props.route.params.firebaseCommunityId,
    });
  }

  onSelectChat(value) {
    // console.log(JSON.stringify(this.props));
    const {result} = this.props.user.showAllUsers;
    // console.log('<><><><><> result', result);
    let users = result.filter(
      x => x.uid == this.props.user.userUId || x.uid == value.userId,
    );
    console.log('This is the selected users data', users);
    let arr = [];
    if (users && users.length > 1) {
      for (let i = 0; i < users.length; i++) {
        arr.push(users[i].id);
      }
    }
    let name = users.find(x => {
      return x.uid == this.props.user.userUId;
    });
    console.log(
      'asbcjhashjcbsavhkcvsakhvkhasvhksavhksahkashkvashkvaskhvbhksabvkhasbvkhsajbv',
      name,
    );
    console.log('Sender uid');
    let channel = arr.sort().join().replace(',', '');
    console.log(
      'channelchannelchannelchannelchannelchannelchannelchannelchannelchannel',
      channel,
    );
    console.log('<><><><><>channel', this.props.user);

    /**
     *
     */

    this.props.navigation.push('AgoraChat', {
      token: cred.agora_app_token,
      channel,
      uid: '',
      sender_uid: this.state.sender_uuid,
      // name: value.name,
      title: value.memberName,
      name: value.memberName,
      isGroupChat: false,
      myId: this.props.user.userUId,
      myName: name.name,
    });
  }

  onGroupSelect(value) {
    // console.log(value);
    const {result} = this.props.user.showAllUsers;
    // console.log('<><><><><> result', result);
    // let users = result.filter(
    //   x => x.uid == this.props.user.userUId || x.uid == value.userId,
    // );
    // let arr = [];
    // console.log('<><><><><>', users);
    // if (users && users.length > 1) {
    //   for (let i = 0; i < users.length; i++) {
    //     arr.push(users[i].id);
    //   }
    // }
    // let channel = arr.sort().join().replace(',', '');
    // console.log('<><><><><>channel');

    let user = [];
    let flag = false;
    this.state.groupListing.participantInfos.map((item, index) => {
      value.chatParticipants.map((innderItem, innderIndex) => {
        if (item.participantUid === innderItem.participantUid) {
          flag = true;
        }
      });
      if (flag) user.push(item);
      flag = false;
    });

    let userData = this.props.user;
    console.log('This is the user data', JSON.stringify(userData));

    let name = 'Test';

    if (userData.register) {
      name =
        userData.register.result.firstName +
        ' ' +
        userData.register.result.lastName;
      console.log('name in if', name);
    } else if (userData.loginWithPhoneNum) {
      name =
        userData.loginWithPhoneNum.result.firstName +
        ' ' +
        userData.loginWithPhoneNum.result.lastName;
      console.log('name in else if', name);
    }

    this.props.navigation.push('AgoraChat', {
      token: cred.agora_app_token,
      channel: value.channelId,
      uid: '',
      sender_uid: this.state.sender_uuid,
      groupName: value.channelDisplayname,
      myName: name,
      isGroupChat: true,
      myId: this.props.user.userUId,
    });
  }
  // function for audio call

  onSelectAudioCall(value, id) {
    console.log(value, 'cbasjhcasbvjhsabjhvsabjhcba');
    const {result} = this.props.user.showAllUsers;
    // console.log('<><><><><> result', result);
    let users = result.filter(
      x => x.uid == this.props.user.userUId || x.uid == value.userId,
    );
    let arr = [];
    // console.log('<><><><><>', users);
    if (users && users.length > 1) {
      for (let i = 0; i < users.length; i++) {
        arr.push(users[i].id);
      }
    }
    let channel = arr.sort().join().replace(',', '');

    let userData = this.props.user;
    console.log('This is the user data', JSON.stringify(userData));

    let name = 'Test';
    let userID = 1;
    if (userData.register) {
      name =
        userData.register.result.firstName +
        ' ' +
        userData.register.result.lastName;
      console.log('name in if', userID);
    } else if (userData.loginWithPhoneNum) {
      name =
        userData.loginWithPhoneNum.result.firstName +
        ' ' +
        userData.loginWithPhoneNum.result.lastName;
      console.log('name in else if', userID);
    }
    // console.log('<><><><><>channel', channel);
    this.props.navigation.push('AgoraVoiceCall', {
      name: value.memberName,
      profilePic: value.profilePic,
      fcmToken: value.fcmToken,
      userIntegerId: value.id,
      myName: name,
      myIntegerID: id,
    });
  }

  onSelectVideoCall(value, id) {
    const {result} = this.props.user.showAllUsers;
    console.log('<><><><><> result', result);
    let users = result.filter(
      x => x.uid == this.props.user.userUId || x.uid == value.userId,
    );
    let arr = [];
    // console.log('<><><><><>', users);
    if (users && users.length > 1) {
      for (let i = 0; i < users.length; i++) {
        arr.push(users[i].id);
      }
    }
    let channel = arr.sort().join().replace(',', '');
    let name = 'Test';
    let userData = this.props.user;
    if (userData.register) {
      name =
        userData.register.result.firstName +
        ' ' +
        userData.register.result.lastName;
      console.log('name in if', name);
    } else if (userData.loginWithPhoneNum) {
      name =
        userData.loginWithPhoneNum.result.firstName +
        ' ' +
        userData.loginWithPhoneNum.result.lastName;
      console.log('name in else if', name);
    }
    // console.log('<><><><><>channel', channel);
    this.props.navigation.push('AgoraVideoCall', {
      name: value.memberName,
      profilePic: value.profilePic,
      fcmToken: value.fcmToken,
      userIntegerId: value.id,
      myName: name,
      myIntegerID: id,
    });
  }

  onSelectLiveStream(type) {
    console.log('onSelectVideoCallonSelectVideoCall');

    let userData = this.props.user;
    let name = 'Test';
    if (userData.register) {
      name =
        userData.register.result.firstName +
        ' ' +
        userData.register.result.lastName;
      console.log('name in if', name);
    } else if (userData.loginWithPhoneNum) {
      name =
        userData.loginWithPhoneNum.result.firstName +
        ' ' +
        userData.loginWithPhoneNum.result.lastName;
      console.log('name in else if', name);
    }

    console.log('this.state.communityMember', this.state.communityMember);

    if (type == 'Start') {
      this.props.navigation.push('AgoraLivestream', {
        myName: name,
        type: 'create',
        myIntegerID:
          this.props.user.loginWithPhoneNum?.result?.id ||
          this.props.user.register?.result?.id,
      });
    } else {
      console.log('isSecondUserisSecondUser', {
        myName: name,
        channelName: parseInt(this.state.channelId),
        myIntegerID: 120,
        isSecondUser: true,
      });
      this.props.navigation.push('AgoraLivestream', {
        myName: name,
        myIntegerID: 120,
        channelName: this.state.channelId,
        isSecondUser: true,
      });
    }

    // this.props.navigation.push('AgoraLivestream', {
    //   myName: name,
    //   array: this.state.communityMember,
    //   type: 'create',
    //   myIntegerID:
    //     this.props.user.loginWithPhoneNum?.result?.id ||
    //     this.props.user.register?.result?.id,
    // });
  }

  // recentChat({item, index}) {
  //   return (
  //     <TouchableOpacity
  //       style={styles.chatListView}
  //       onPress={this.onSelectChat.bind(this, item)}>
  //       <View style={styles.listImageView}>
  //         <View style={styles.chatListLeft}>
  //           <Badge status="success" badgeStyle={styles.activeBadge} />
  //           <Avatar
  //             rounded
  //             source={item.image}
  //             size={windowWidth * 0.146}
  //             containerStyle={{alignSelf: 'center'}}
  //           />
  //         </View>
  //       </View>
  //       <View style={{flexDirection: 'column'}}>
  //         <Text style={styles.chatlistName}>{item.title}</Text>
  //         <Text style={styles.chatlistMsg}>{item.message}</Text>
  //       </View>
  //       <View style={styles.chatListRight}>
  //         <Text style={styles.chatListTime}>{item.time}</Text>
  //         <View style={styles.bubbleView}>
  //           <Text style={styles.msgCountText}>{item.messageCount}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // }

  recentChat({item, index}) {
    let userIntegerId = this.props.user.register?.result?.id;
    if (!userIntegerId) {
      userIntegerId =
        this.props.user.loginWithPhoneNum?.result?.id ||
        this.props.user.login?.result?.id;
    }
    console.log('Id is', item);
    return (
      <TouchableOpacity
        style={styles.chatListView}
        onPress={this.onSelectChat.bind(this, item)}>
        <View style={styles.listImageView}>
          <View style={styles.chatListLeft}>
            <Badge
              // status={item.isActive ? 'success' : 'error'}
              badgeStyle={[
                styles.activeBadge,
                {backgroundColor: item.isActive ? '#00aa00' : '#cccccc'},
              ]}
            />
            {item.profilePic ? (
              <Image
                source={{uri: item.profilePic}}
                style={{height: 60, width: 60, borderRadius: 35}}
              />
            ) : (
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#989cc3',
                }}>
                <Text style={styles.letterTitle}>
                  {item.memberName.substring(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.chatlistName}>{item.memberName}</Text>
        </View>
        <View
          style={{
            // borderColor: 'red',
            // borderWidth: 1,
            // minHeight: 40,
            // minWidth: 30,
            position: 'absolute',
            right: 10,
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={this.onSelectAudioCall.bind(this, item, userIntegerId)}>
            <Image
              source={require('./../../Images/audio_call.png')}
              style={[
                styles.videoListIcon,
                {height: 20, resizeMode: 'contain'},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onSelectVideoCall.bind(this, item, userIntegerId)}
            style={styles.callBtn}>
            <Image
              source={require('./../../Images/video.png')}
              style={styles.videoListIcon}
            />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.chatListRight}>
          <Text style={styles.chatListTime}>{item.time}</Text>
          <View style={styles.bubbleView}>
            <Text style={styles.msgCountText}>{item.messageCount}</Text>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  }

  recentGroupChat({item, index}) {
    return (
      <TouchableOpacity
        style={styles.chatListView}
        onPress={this.onGroupSelect.bind(this, item)}>
        <View style={styles.listImageView}>
          <View style={styles.chatListLeft}>
            {/* <Badge status="success" badgeStyle={styles.activeBadge} /> */}
            {item.profilePic ? (
              <Image
                source={{uri: item.profilePic}}
                style={{height: 60, width: 60, borderRadius: 35}}
              />
            ) : (
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#989cc3',
                }}>
                <Text style={styles.letterTitle}>
                  {item.channelDisplayname.substring(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={styles.chatlistName}>{item.channelDisplayname}</Text>
          {/* <Text style={styles.chatlistMsg}>{item.message}</Text> */}
        </View>
        {/* <View
          style={{
            // borderColor: 'red',
            // borderWidth: 1,
            // minHeight: 40,
            // minWidth: 30,
            position: 'absolute',
            right: 10,
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={styles.callBtn}
            // onPress={this.onSelectAudioCall.bind(this, item)}
          >
            <Image
              source={require('./../../Images/audio_call.png')}
              style={[
                styles.videoListIcon,
                {height: 20, resizeMode: 'contain'},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={this.onSelectVideoCall.bind(this, item)}
            style={styles.callBtn}>
            <Image
              source={require('./../../Images/video.png')}
              style={styles.videoListIcon}
            />
          </TouchableOpacity>
        </View> */}
      </TouchableOpacity>
    );
  }

  async updateSearch(searchText) {
    this.setState({searchMembers: searchText});

    let filteredData = searchMembersList.filter(function (item) {
      let value = item.title.toLowerCase();
      return value.includes(searchText.toLowerCase());
    });

    await this.setState({filterSearchList: filteredData});
    // await console.log('this.state.filteredData', this.state.filterSearchList);
  }

  searchListRender({item}) {
    return (
      <View style={[styles.chatListView, {padding: windowWidth * 0.036}]}>
        <View
          style={
            item.status == 'online'
              ? styles.bubbleSearchView
              : styles.bubbleSearch
          }></View>
        <View
          style={[
            styles.chatListLeft,
            {marginHorizontal: windowWidth * 0.036},
          ]}>
          <Avatar
            rounded
            source={item.image}
            size={windowWidth * 0.146}
            containerStyle={{
              alignSelf: 'center',
              marginHorizontal: windowWidth * 0.046,
            }}
          />
        </View>

        <View style={{flexDirection: 'column'}}>
          <Text style={styles.searchNameText}>{item.title}</Text>
        </View>
      </View>
    );
  }

  toggleTriangle = view => {
    if (view == 'general') {
      this.setState({generalView: true, settingsView: false});
    } else {
      this.setState({generalView: false, settingsView: true});
    }
  };

  render() {
    // const {userUId} = this.props.user;
    // const {communityInformation} = this.props.communities;
    // let communityID = communityInformation.result.uid;
    // // console.log('Community id is ', communityID);
    // this.props.getCommunityMember(communityInformation.result.uid);
    // const {communityMember} = this.props.communities;
    // if (
    //   communityMember &&
    //   communityMember.message == 'GET Request successful.'
    // ) {
    //   const {result} = communityMember;
    //   var members = [];
    //   var memberId = {};
    //   if (result && result.length > 0) {
    //     for (let i = 0; i < result.length; i++) {
    //       if (memberId[result[i].userId]) {
    //         //
    //       } else {
    //         memberId[result[i].userId] = true;
    //         if (result[i].isActive && result[i].userId != userUId) {
    //           members.push(result[i]);
    //         }
    //       }
    //     }
    //     var ref = database().ref(`Group/${communityID}`);

    //     ref.once('value').then(res => {
    //       // let response = Object.assign(res);
    //       console.log('Data in then block is', JSON.stringify(res));

    //       var xyz = Object.values(res)[0].value;

    //       // console.log(Object.values(res)[0].value, 'final response');

    //       members.forEach(element => {
    //         let userId = element.userId;
    //         // console.log('These are the users', xyz);
    //         // console.log('User id for this user', userId);
    //         if (xyz.hasOwnProperty(userId)) {
    //           element.isActive = true;
    //         } else {
    //           element.isActive = false;
    //         }
    //       });
    //     });
    //   }
    // }
    // console.log('This is the members state',members)
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header
              textStyle={{fontWeight: '700'}}
              createGroup
              createGroupFontName="group"
              onPressCreateGroup={() => this.onPressCreateGroup()}
              onLeftPress={this.onLeft.bind(this)}>
              MEMBER CONNECT
            </Header>
            <View style={{flex: 1}}>
              {/* <SearchBar
                placeholder="Search Members"
                onChangeText={this.updateSearch.bind(this)}
                value={this.state.searchMembers}
                inputStyle={{fontFamily: 'CenturyGothic', color: 'black'}}
                containerStyle={styles.searchBarContainer}
                round={false}
                inputContainerStyle={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderBottomWidth: 1,
                }}
                lightTheme={true}
                onClear={() => {
                  Keyboard.dismiss();
                }}
                searchIcon={{size: windowWidth * 0.06}}
                clearIcon={{size: windowWidth * 0.06}}
              /> */}
              {/* <Tabs
                locked
                onChangeTab={event => {
                  this.setState({
                    selectedTab: event.i,
                  });
                  console.log(event.i);
                }}
                page={0}
                tabContainerStyle={{
                  height: 65,
                }}
                initialPage={this.state.selectedTab}
                tabBarUnderlineStyle={{width: 0, borderWidth: 0, height: 0}}>
                <Tab
                  style={{}}
                  heading={
                    <TabHeading
                      style={{
                        backgroundColor: '#003237',
                        flexDirection: 'column',
                      }}>
                      <Text
                        style={{
                          flex: 0.9,
                          marginTop: 22,
                          alignSelf: 'center',
                          fontSize: 16,
                          fontWeight: '500',
                          color: '#948e5b',
                        }}>
                        MEMBERS
                      </Text>
                      <View
                        style={{
                          width: 0,
                          height: 0,
                          backgroundColor: 'transparent',
                          borderStyle: 'solid',
                          borderLeftWidth: 10,
                          borderRightWidth: 10,
                          borderBottomWidth: 10,
                          borderLeftColor: 'transparent',
                          borderRightColor: 'transparent',
                          borderBottomColor: 'white',
                          marginBottom: -2,
                        }}></View>
                    </TabHeading>
                  }>
                  <View style={{flex: 1}}>
                    {this.state.searchMembers != '' ? (
                      <FlatList
                        contentContainerStyle={{
                          paddingBottom: windowWidth * 0.6,
                        }}
                        data={this.state.filterSearchList}
                        renderItem={this.searchListRender.bind(this)}
                        keyExtractor={item => item}
                        showsVerticalScrollIndicator={false}
                      />
                    ) : (
                      <View style={{flex: 1}}>
                        <View style={{}}>
                          <Text style={styles.activeText}>
                            {this.state.topTitle}
                          </Text>
                          <FlatList
                            horizontal={true}
                            data={activeList}
                            renderItem={this.renderItem.bind(this)}
                            keyExtractor={item => item}
                            showsVerticalScrollIndicator={false}
                          />
                        </View>
                        <View style={{}}>
                          <Text style={styles.activeText}>Active</Text>
                          <FlatList
                            contentContainerStyle={{
                              paddingBottom: windowWidth * 0.6,
                            }}
                            data={this.state.communityMember}
                            renderItem={this.recentChat.bind(this)}
                            keyExtractor={item => item}
                            showsVerticalScrollIndicator={false}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                </Tab>
                <Tab
                  heading={
                    <TabHeading
                      style={{
                        backgroundColor: '#003237',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '500',
                          color: '#948e5b',
                        }}>
                        CHAT
                      </Text>
                    </TabHeading>
                  }>
                  <View style={{flex: 1, backgroundColor: colors.grey5}}>
                    <View style={{backgroundColor: colors.grey5}}>
                      <Text style={styles.activeText}>Active</Text>
                      <FlatList
                        contentContainerStyle={{
                          paddingBottom: windowWidth * 0.6,
                        }}
                        data={this.state.communityMember}
                        renderItem={this.recentChat.bind(this)}
                        keyExtractor={item => item}
                        showsVerticalScrollIndicator={false}
                      />
                    </View>
                  </View>
                </Tab>
              </Tabs> */}
              {/* <View style={{flexDirection: 'row', height: 50}}>
                <TouchableOpacity
                  onPress={this.onSelectLiveStream.bind(this, 'Start')}
                  style={{backgroundColor: colors.error, padding: 10}}>
                  <Text>{'Start Live Strean'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.onSelectLiveStream.bind(this, 'Join')}
                  style={{backgroundColor: colors.error, padding: 10}}>
                  <Text>{'Join Live Strean'}</Text>
                </TouchableOpacity>

                <TextInput
                  onChangeText={text =>
                    this.setState({
                      channelId: text,
                    })
                  }
                  style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    width: '100%',
                    color: 'black',
                  }}
                />
              </View> */}

              <View style={styles.buttonView}>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.toggleTriangle('general');
                    }}>
                    <Text
                      style={[
                        this.state.generalView
                          ? styles.orangeText
                          : styles.whiteText,
                      ]}>
                      MEMBERS
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={
                      this.state.generalView
                        ? styles.triangleView
                        : styles.triangleViewHidden
                    }
                  />
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.toggleTriangle('setting')}>
                    <Text
                      style={[
                        this.state.settingsView
                          ? styles.orangeText
                          : styles.whiteText,
                      ]}>
                      CHAT
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={
                      this.state.settingsView
                        ? styles.triangleView
                        : styles.triangleViewHidden
                    }
                  />
                </View>
              </View>
              {this.state.generalView && (
                <View style={{flex: 1}}>
                  <Text style={styles.activeText}>Active</Text>
                  <FlatList
                    contentContainerStyle={{
                      paddingBottom: windowWidth * 0.6,
                    }}
                    data={this.state.communityMember}
                    renderItem={this.recentChat.bind(this)}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              )}
              {this.state.settingsView && (
                <View style={{flex: 1}}>
                  <FlatList
                    contentContainerStyle={{
                      paddingBottom: windowWidth * 0.6,
                    }}
                    extraData={this.state?.groupListing.chatMasters}
                    data={this.state?.groupListing.chatMasters}
                    // data={[{},{},{}]}
                    renderItem={this.recentGroupChat.bind(this)}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  state => ({
    communities: state.communities,
    user: state.user,
  }),
  {getCommunityMember, getCommunityUserDeviceToken},
)(CommunityMembers);
