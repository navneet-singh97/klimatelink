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
import {Divider, SearchBar, Avatar, Badge} from 'react-native-elements';
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
import {Modal} from 'react-native';
import {TextInput} from 'react-native';
import database from '@react-native-firebase/database';

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
interface groupChatInfo {
  searchMembers: any;
  filterSearchList: any;
}

const BASE_URL='https://api.klimatelink.com/api/v1/'

class GroupChat extends Component<Props, groupChatInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchMembers: '',
      filterSearchList: {},
      topTitle: 'Active',
      communityMember: [],
      chatParticipants: [],
      uuid: '',
      showDetailsModal: false,
      groupName: '',
      userId:''
    };
    this.client = new RtmAdapter();
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  agorainit = async uuid => {
    console.log('uuiduuiduuid========================', uuid);
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

      console.log(
        responseJson,
        'responseJsonresponseJsonresponseJsonresponseJsonresponseJson',
      );
      console.log(JSON.stringify(responseJson, null, 1), 'ress');
      if (responseJson?.rtmToken) {
        cred.agora_app_token = responseJson.rtmToken;
        this.client.login(uuid, responseJson.rtmToken).then(() => {
          console.log('login success');
          this.setState({
            uuid: uuid,
          });
        });
      }
    } catch (err) {
      console.log(err, 'init error');
      alert('Something went wrong. Please try later');
    }
  };

  async componentDidMount() {
    await this.agorainit(uuidv4());
    console.log('Community Member 186', this.props);
    const {userUId} = this.props.user;
    console.log('User id is',userUId)
    this.setState({userId:userUId})
    if (this.props.route.params !== undefined) {
      if (this.props.route.params.navigateFrom == 'ProfileMutualFollowers') {
        this.setState({topTitle: 'Followers'});
      }
    } else {
      this.setState({topTitle: 'Active'});
    }
    const {communityInformation} = this.props.communities;
    console.log(
      'communityInformationcommunityInformationcommunityInformation',
      communityInformation,
    );
    await this.props.getCommunityMember(communityInformation.result.uid);
    const {communityMember} = this.props.communities;
    if (
      communityMember &&
      communityMember.message == 'GET Request successful.'
    ) {
      const {result} = communityMember;
      let members = [];
      let memberId = {};
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
        this.setState({communityMember: [...members]});
      }
    }
    let firebaseCommunityId = this.props.route.params.firebaseCommunityId;
        var ref = database().ref(`Group/${firebaseCommunityId}`);
        ref.on('value', snapshot => {
          this.getActiveMembers(snapshot);
        });
  }

  getActiveMembers = snapshot => {
    let a = snapshot.val();
    console.log('This is the listener value', JSON.stringify(a));
    let members = [...this.state.communityMember];
    members.forEach(element => {
      let userId = element.userId;
      console.log('user id', userId);
      if (a.hasOwnProperty(userId)) {
        console.log('this is in if condition', a);
        element.isActive = a[userId].isOnline;
      } else {
        element.isActive = false;
      }
    });
    this.setState({communityMember: members});
  };

  componentWillUnmount() {
    // this.client?.logout();
    // this.client?.destroy();
  }

  renderItem({item, index}) {
    //console.log("item....", item.title);
    return (
      <View style={styles.listImageView}>
        <View style={styles.activeListView}>
          <Badge status="success" badgeStyle={styles.activeBadge} />
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

  onCreateGroup() {
    this.setState({showDetailsModal: true});
  }

  onPressCreateGroup() {
    this.setState({showDetailsModal: false});
    let arr = [];
    let names = [];
    const {communityInformation} = this.props.communities;
    // this.props.getCommunityUserDeviceToken(communityInformation.result.uid);
    // console.log('This is the result after function call', this.props.communities.getCommunityUserDeviceToken.result);

    // let communityMembersDeviceToken=this.props.communities.getCommunityUserDeviceToken.result.participantInfos


    const {result} = this.props.user.showAllUsers;

    result.forEach(element => {
      if (element.uid === this.props.user.userUId) {
        arr.push(element.id);
        names.push(element.name + ',');
      }
    });

    this.state.chatParticipants.forEach((element, i) => {
      result.forEach(item => {
        if (element.userId === item.uid) {
          arr.push(item.id);
          names.push(item.name);
        }
      });
    });

    for (let i = 0; i < this.state.chatParticipants.length; i++) {
      result.forEach(element => {
        element.uid === this.state.chatParticipants[i].userId;
      });
    }

    let channel = arr.sort().join().replace(',', '');
    // let name = names.join().replace(',', '');

    console.log({
      token: cred.agora_app_token,
      channel,
      uid: '',
      // name: name,
      isGroupChat: true,
      names,
      arr,
      dd: this.state.chatParticipants,
    });
    this.createGroupApi(names, channel);
  }

  async createGroupApi(names) {
    const {communityInformation} = this.props.communities;
    console.log({
      channelId: this.state.uuid,
      communityDetailId: 1,
      channelDisplayname: this.state.groupName,
      isPublic: true,
      isText: true,
      isAudio: true,
      isVideo: true,
      numOfParticipants: names.length,
    });
    const response = await fetch(
      BASE_URL+'chatmaster',
      {
        method: 'POST',
        body: JSON.stringify({
          channelId: this.state.uuid,
          communityDetailId: communityInformation.result.id,
          channelDisplayname: this.state.groupName,
          isPublic: true,
          isText: true,
          isAudio: true,
          isVideo: true,
          isDeleted:false,
          numOfParticipants: names.length,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const responseJson = await response.json();
    console.log(
      'responseresponseresponseresponse',
      JSON.stringify(responseJson),
    );

    this.addUserInGroup(responseJson.result.chatMasterId);
  }

  async addUserInGroup(channelMasterId) {
    let selectedUser = [];
    console.log(
      'This is chat participants' + JSON.stringify(this.state.chatParticipants),
    );
    this.state.chatParticipants.map((item, index) => {
      selectedUser.push({
        chatMasterId: channelMasterId,
        participantUid: item.userId,
        isDeleted: false,
      });
    });

    console.log('Selected users after mapping' + JSON.stringify(selectedUser));
    selectedUser.push({
      chatMasterId: channelMasterId,
      participantUid: this.props.user.userUId,
      isDeleted: false,
    });
    console.log('Final selected users' + JSON.stringify(selectedUser));
    const response = await fetch(
      BASE_URL+'chatparticipantdetails/',
      {
        method: 'POST',
        body: JSON.stringify(selectedUser),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const responseJson = await response.json();
    console.log(JSON.stringify(responseJson),'casbjchbahsvchjasvcjhsavcjhasvjhcvsajh');
    let channelMembersNames = this.state.chatParticipants.map((item, index) => {
      return item.memberName;
    });
    console.log('These are the chat participants',this.state.chatParticipants)
    const {communityInformation} = this.props.communities;
    this.props.getCommunityUserDeviceToken(communityInformation.result.uid);
    console.log('This is the result after function call', this.props.communities.getCommunityUserDeviceToken.result);

    let communityMembersDeviceToken=this.props.communities.getCommunityUserDeviceToken.result.participantInfos
    let arrFCMTokens=[]
    // this.state.chatParticipants.forEach(x=>{
    //   communityMembersDeviceToken.forEach(y=>{
    //     if(x.)
    //   })
    // })

    let userData=this.props.user
    let name='';
    if (userData.register) {
      name = userData.register.result.firstName + ' ' + userData.register.result.lastName;
      console.log('name in if', name);
    } else if (userData.loginWithPhoneNum) {
      name =
      userData.loginWithPhoneNum.result.firstName +
        ' ' +
        userData.loginWithPhoneNum.result.lastName;
      console.log('name in else if', name);
    }
    console.log('This is the userData',JSON.stringify(userData))
    this.props.navigation.push('AgoraChat', {
      token: cred.agora_app_token,
      channel: channelMasterId,
      uid: this.state.userId,
      name: searchMembersList.sort().join().replace(',', ''),
      groupMembers: channelMembersNames,
      groupName: this.state.groupName,
      isGroupChat:true,
      chatParticipants:this.state.chatParticipants,
      myName:name
      // profilePic: value.profilePic,
    });
  }

  onSelectChat(value) {
    // console.log(value)
    // const {result} = this.props.user.showAllUsers;
    // console.log("<><><><><> result", result);
    // let users = result.filter(x=>x.uid==this.props.user.userUId || x.uid == value.userId)
    // let arr = [];
    // console.log("<><><><><>", users);
    // if(users && users.length > 1){
    //   for(let i=0; i<users.length; i++){
    //     arr.push(users[i].id);
    //   }
    // }
    // let channel = arr.sort().join().replace(",","");
    // console.log("<><><><><>channel", channel);
    // this.props.navigation.push("AgoraChat", { token: cred.agora_app_token, channel, uid: "", name: value.name});

    let {chatParticipants} = this.state;

    console.log('Data before updation' + JSON.stringify(chatParticipants));
    if (chatParticipants.indexOf(value) >= 0) {
      chatParticipants.splice(chatParticipants.indexOf(value), 1);
    } else {
      chatParticipants.push(value);
    }

    console.log('Data after updation' + JSON.stringify(chatParticipants));

    this.setState({
      chatParticipants,
    });
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
    console.log('item is',item)
    return (
      <TouchableOpacity
        key={index}
        style={[styles.chatListView, {justifyContent: 'space-between'}]}
        onPress={this.onSelectChat.bind(this, item)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.listImageView}>
            <View style={styles.chatListLeft}>
              <Badge status="success" badgeStyle={[styles.activeBadge,{backgroundColor:item.isActive?'#00aa00':'#cccccc'}]} />
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
            {/* <Text style={styles.chatlistMsg}>{item.message}</Text> */}
          </View>
        </View>
        {this.state.chatParticipants.indexOf(item) >= 0 && (
          <View style={[styles.chatListRight, {paddingRight: 20}]}>
            <Icon
              name={'check-circle'}
              type={'FontAwesome'}
              style={{
                color: '#003237',
                fontSize: windowWidth * 0.056,
                alignSelf: 'center',
                marginTop: windowWidth * 0.0,
              }}
            />
          </View>
        )}
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
    await console.log('this.state.filteredData', this.state.filterSearchList);
  }

  searchListRender({item, index}) {
    return (
      <View
        key={index}
        style={[styles.chatListView, {padding: windowWidth * 0.036}]}>
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

  render() {
    //const { navigate } = this.props
    console.log(this.state);
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header
              textStyle={{fontWeight: '700'}}
              createGroupFontName="check-square"
              onPressCreateGroup={() => this.onCreateGroup()}
              createGroup={
                this.state.chatParticipants.length > 0 ? true : false
              }
              onLeftPress={this.onLeft.bind(this)}>
              Add Participants
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

              <View style={{flex: 1}}>
                {this.state.searchMembers != '' ? (
                  <FlatList
                    contentContainerStyle={{paddingBottom: windowWidth * 0.6}}
                    data={this.state.filterSearchList}
                    renderItem={this.searchListRender.bind(this)}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <View style={{flex: 1}}>
                    {/* <View style={{}}>
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
                    </View> */}
                    <View style={{}}>
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
                  </View>
                )}
              </View>
            </View>
          </View>
          <Modal visible={this.state.showDetailsModal} transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: '70%',
                  width: '100%',
                  backgroundColor: '#ffffff',
                  alignItems: 'center',
                  borderRadius: 10,
                  paddingTop: 20,
                }}>
                <Text style={{fontSize: 24, color: '#101618'}}>
                  Enter group name
                </Text>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 20,
                  }}>
                  <TextInput
                    style={{
                      marginTop: 20,
                      borderWidth: 1,
                      borderColor: '#e3e3e3',
                      borderRadius: 8,
                      width: 250,
                    }}
                    onChangeText={text => {
                      this.setState({groupName: text});
                    }}
                    placeholder="Enter group name here"></TextInput>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#e1625b',
                      borderRadius: 8,
                      padding: 20,
                      width: 250,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      this.onPressCreateGroup();
                    }}>
                    <Text style={{color: '#ffffff', fontSize: 20}}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
)(GroupChat);
