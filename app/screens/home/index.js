import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import {CardView} from './../../components/cardView';
import {Icon} from 'native-base';
import SafeAreaView from 'react-native-safe-area-view';
import {Header} from '../../components/header';
import {Avatar, Divider} from 'react-native-elements';
import {getCommunities} from './../../redux/actions/communities';
import {
  getAllUsers,
  getReachOuts,
  getRecommendedTags,
  getHomeReachOuts,
  updateFcmToken,
  getUserCommunities,
} from './../../redux/actions/user';
import styles from './styles';
import staticObject from '../staticObject/staticObject';
import {color} from '../../theme';
import {connect} from 'react-redux';
import JWT from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, {firebase} from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface Props {
  navigation: any;
}

const HotMatchList = [
  {
    id: 0,
    leftImage: require('./../../Images/job-search.png'),
    title: 'Unlisted Job',
    content: 'Sustainability Director - £150k',
  },
  {
    id: 1,
    leftImage: require('./../../Images/drink.png'),
    title: 'Virtual Coffee',
    content: 'Group Career Mentoring - Tomorrow',
  },
  {
    id: 2,
    leftImage: require('./../../Images/dinner.png'),
    title: 'London China Town Dinner',
    content: 'Green Hydrogen roundtable - 20/9/2021',
  },
  {
    id: 3,
    leftImage: require('./../../Images/networking.png'),
    title: 'Community Collabration',
    content: 'Energy Trading Platform - Bloackchain',
  },
];

const CommunitiesList = [
  {
    title: 'Space',
    image: require('./../../Images/space.png'),
  },
  {
    title: 'Soil',
    image: require('./../../Images/soil.png'),
  },
  {
    title: 'Fuel',
    image: require('./../../Images/fuel.png'),
  },
  {
    title: 'waste',
    image: require('./../../Images/waste.png'),
  },
  {
    title: 'Design',
    image: require('./../../Images/Design.png'),
  },
  {
    title: 'Finance',
    image: require('./../../Images/finance.png'),
  },
];

const expertsList = [
  {
    title: 'Lakshmi',
    image: require('../../Images/StoriesIcons/Person1.png'),
  },
  {
    title: 'Vijay',
    image: require('./../../Images/StoriesIcons/Person2.png'),
  },
  {
    title: 'Deepa',
    image: require('./../../Images/StoriesIcons/Person3.png'),
  },
  {
    title: 'Santosh',
    image: require('./../../Images/StoriesIcons/Person4.png'),
  },
  {
    title: 'Nitesh',
    image: require('./../../Images/StoriesIcons/Person5.png'),
  },
];

let videoList = [
  {
    id: 0,
    title: 'Career Transition',
    image: require('./../../Images/Kevin.jpg'),
    name: 'Kevin Clarke',
    iconType: require('./../../Images/headphones.jpeg'),
    duration: '15mins',
  },
  {
    id: 1,
    title: 'Sustainable Finance',
    image: require('./../../Images/podcastimageLib.png'),
    name: 'Ninna Clarke',
    iconType: require('./../../Images/videocam.jpeg'),
    duration: '36mins',
  },
  {
    id: 2,
    title: 'Lesson 4',
    title: 'Career Transition Opportunities',
    image: require('./../../Images/careerVideo.jpeg'),
    name: 'Daisy',
    iconType: require('./../../Images/headphones.jpeg'),
    duration: '49mins',
  },
];

let RecommendedTags = [
  'Green Hydrogen',
  'Artifical Intelligence',
  'Energy',
  'Sustainability',
  'NetZero Fuel',
  'Green Ammonia',
];
let recommendedColors = ['#123456', '#654321', '#989cc3', '#abcdef'];
class Home extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedTabName: '',
      activeIndex: 0,
      selectedmatches: [],
      selectedStarmatches: [],
      //carouselItems: staticObject.carouselItems,
      recommendedUsers: [],
      reachOutsList: [],
      getRecommendedTags: [],
      communityData: [],
    };
  }

  //componentDidMount() {
  // if (this.props.user != undefined) {
  //   var token = this.props.user.login.result.token;
  //   console.log('login_token:', token);
  //   try {
  //     var decoded = JWT(token);
  //     console.log('JWT_RESULT:', decoded);
  //   } catch (error) {
  //     console.log('JWT_ERROR:', error);
  //   }
  // }
  //console.log("bottomTabsList", staticObject);
  //}

  async componentDidMount() {
    // PushNotification.configure({
    //   // (optional) Called when Token is generated (iOS and Android)
    //   onRegister: function (token) {
    //     console.log('TOKEN:', token);
    //   },

    //   // (required) Called when a remote or local notification is opened or received
    //   onNotification: function (notification) {
    //     console.log('NOTIFICATION:', notification);

    //     // process the notification here

    //     // required on iOS only
    //     notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    //   // Android only
    //   senderID: '552401013462',
    //   // iOS only
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    //   popInitialNotification: true,
    //   requestPermissions: true,
    // });
    // const userData = this.props.user.getReachOutsInHome.result;
    // console.log('This is the user data', userData);

    // const communityData = this.props.communities.communities.result;

    // console.log('This is the community data', communityData);

    // const email = userData.email;
    // const fname = userData.firstName;
    // const lname = userData.lastName;
    // const userID = userData.uid;

    // database()
    //   .ref('Users/')
    //   .set({
    //     userID,
    //     email,
    //     fname,
    //     lname,
    //   })
    //   .then(data => {
    //     //success callback
    //     console.log('data ', data);
    //   })
    //   .catch(error => {
    //     //error callback
    //     console.log('error ', error);
    //   });

    // Assuming user is logged in
    // const userId = firebase.auth().onAuthStateChanged((res)=>{
    //   console.log('This is the response'+JSON.stringify(res))
    //   return res;
    // });

    // console.log('This is the user Id', userId);

    // const reference = database().ref(`/online/${userId}`);

    // console.log('This is the database', reference);

    // // Set the /users/:userId value to true
    // reference.set(true).then(() => console.log('Online presence set'));

    const fcmToken = await AsyncStorage.getItem('fcmToken');
    const aa = await updateFcmToken({
      userId: this.props.user.userUId,
      fcmToken: fcmToken,
    });
    console.log('fjsabfkjasbkbasjbasjkbvkjas',aa)
    await AsyncStorage.setItem('userID', this.props.user.userUId);
    try {
      let userList = [];
      await this.props.getAllUsers();
      this.props.user.showAllUsers.result.map((res, i) => {
        if (res.uid != this.props.user.userUId) {
          userList.push(res);
        }
      });
      //console.log('userList_123333', userList);
      if (this.props.user) {
        this.setState({
          recommendedUsers: userList,
        });
      }
    } catch (err) {
      console.log('componentDidMount_err_recommendedUsers', err);
    }
    console.log('Between try catch', this.props.user);
    try {
      let guid = this.props.user.userUId;
      // console.log('User props are',user)
      await this.props.getHomeReachOuts(guid);
      await this.props.getUserCommunities(guid);
      let userCommunities = this.props.user.userCommunities;
      await AsyncStorage.setItem(
        'userCommunities',
        JSON.stringify(this.props.user.userCommunities),
      );
      if (userCommunities.length > 0) {
        userCommunities.forEach(element => {
          database()
            .ref(`Group/${element.uid}/${guid}`)
            .set({userId: guid, isOnline: true})
            .then(data => {
              //success callback
              console.log('data ', data);
            })
            .catch(error => {
              //error callback
              console.log('error ', error);
            });
        });
      }
      if (this.props.user) {
        this.setState({
          reachOutsList: this.props.user.getReachOutsInHome.result,
        });
      }

      // if(this.props.user.comm)
    } catch (err) {
      console.log('componentDidMount_err_recommendedUsers', err);
    }
    try {
      await this.props.getCommunities();
      if (this.props.communities) {
        this.setState({communities: this.props.communities.communities.result});
      }
    } catch (err) {
      console.log('componentDidMount_err_communities', err);
    }

    try {
      await this.props.getRecommendedTags();
      if (this.props.user) {
        this.setState({
          getRecommendedTags: this.props.user.getRecommendedTags.result,
        });
      }
    } catch (err) {
      console.log('componentDidMount_err_recommendedUsers', err);
    }
  }

  onLeft() {}

  onTab(res) {
    this.setState({selectedTab: res.id, selectedTabName: res.name});
  }

  onBookMark(item) {
    var count = 0;
    if (this.state.selectedmatches.length == 0) {
      this.state.selectedmatches.push({
        id: item.id,
        title: item.title,
      });
    } else {
      this.state.selectedmatches.map((res, i) => {
        if (item.id == res.id) {
          this.state.selectedmatches.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedmatches.push({
          id: item.id,
          title: item.title,
        });
      }
    }
    this.setState({selectedmatches: this.state.selectedmatches});
    //console.log('this.state.selectedmatches', this.state.selectedmatches);
  }

  onStar(item) {
    var count = 0;
    if (this.state.selectedStarmatches.length == 0) {
      this.state.selectedStarmatches.push({
        id: item.id,
        title: item.title,
      });
    } else {
      this.state.selectedStarmatches.map((res, i) => {
        if (item.id == res.id) {
          this.state.selectedStarmatches.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedStarmatches.push({
          id: item.id,
          title: item.title,
        });
      }
    }
    this.setState({selectedStarmatches: this.state.selectedStarmatches});
    // console.log(
    //   'this.state.selectedStarmatches',
    //   this.state.selectedStarmatches,
    // );
  }

  renderItem({item, index}) {
    var count = 0;
    var showActive;
    var handImage;
    var showStarActive;
    var countStar = 0;
    this.state.selectedmatches.map((res, i) => {
      if (res.id == item.id) {
        showActive = true;
        count = count + 1;
      }
      if (count === 0) {
        showActive = false;
      }
    });
    this.state.selectedStarmatches.map((res, i) => {
      if (res.id == item.id) {
        showStarActive = true;
        countStar = countStar + 1;
      }
      if (countStar === 0) {
        showStarActive = false;
      }
    });

    if (showActive == true) {
      handImage = require('../../Images/open-hand.png');
    } else {
      handImage = require('../../Images/open-hand_empty.png');
    }
    return (
      <View style={{marginTop: windowWidth * 0.036}}>
        <View style={styles.cardView}>
          <View style={styles.innerCardView}>
            <View style={styles.cardSubContainer}>
              <Image
                source={{uri: item.image}}
                style={styles.leftContainImage}
              />

              <View style={styles.titleView}>
                <Text style={styles.titleStyle}>{item.label}</Text>
                <Text style={styles.textStyle}>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={this.onStar.bind(this, item)}>
                <Icon
                  type={'FontAwesome'}
                  name={showStarActive ? 'star' : 'star-o'}
                  style={
                    showStarActive ? styles.startIcon : styles.inActiveStar
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onBookMark.bind(this, item)}>
                <Image source={handImage} style={styles.rightContainImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  onTransaction() {
    this.props.navigation.push('TransactionHistory');
  }

  showSelectedUser(item) {
    this.props.navigation.push('UserDetail', {
      guid: this.props.user.userUId,
      user: item,
    });
  }

  renderExpertsItem({item, index}) {
    //console.log('item....', item);
    let showNameLetter;
    let firstname;
    let lastname;
    if (item.name != '') {
      firstname = item.name.substr(0, item.name.indexOf(' ')).charAt(0);
      lastname = item.name.substr(item.name.indexOf(' ') + 1).charAt(0);

      showNameLetter = firstname + '' + lastname;
    }
    return (
      <View style={styles.listImageView}>
        <View style={styles.activeListView}>
          {item.profilePic == '' || item.profilePic == null ? (
            <TouchableOpacity
              style={{
                width: windowWidth * 0.22,
                height: windowWidth * 0.22,
                borderRadius: (windowWidth * 0.22) / 2,
                backgroundColor:
                  recommendedColors[index % recommendedColors.length],
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'green',
                borderWidth: 2,
              }}
              onPress={this.showSelectedUser.bind(this, item)}>
              {showNameLetter == '' ? (
                <Avatar
                  rounded
                  source={require('./../../Images/user_placeholder.png')}
                  size={windowWidth * 0.22}
                  containerStyle={{alignSelf: 'center'}}
                />
              ) : (
                <Text style={styles.letterTitle}>{showNameLetter}</Text>
              )}
            </TouchableOpacity>
          ) : (
            <Avatar
              rounded
              source={{uri: item.profilePic}}
              size={windowWidth * 0.22}
              containerStyle={{
                alignSelf: 'center',
                borderColor: 'green',
                borderWidth: 2,
              }}
              onPress={this.showSelectedUser.bind(this, item)}
            />
          )}
          {/* <Text style={[styles.activeListName,{fontWeight:'bold'}]} numberOfLines={1}>{item.name}</Text>
          {item.jobTitle?<Text style={styles.activeListName} numberOfLines={1}>{item.jobTitle}</Text>:null}
          {item.companyName?<Text style={[styles.activeListName,{color: color.secondaryColor, fontWeight: 'bold'}]} numberOfLines={1}>{item.companyName}</Text>:null} */}
        </View>
        <Text
          style={[styles.activeListName, {fontWeight: 'bold'}]}
          numberOfLines={1}>
          {item.name}
        </Text>
        {item.jobTitle ? (
          <Text style={styles.activeListName} numberOfLines={1}>
            {item.jobTitle}
          </Text>
        ) : null}
        {item.companyName ? (
          <Text
            style={[
              styles.activeListName,
              {color: color.secondaryColor, fontWeight: 'bold'},
            ]}
            numberOfLines={1}>
            {item.companyName}
          </Text>
        ) : null}
      </View>
    );
  }

  onClickVideo() {
    this.props.navigation.push('Library');
  }

  renderVideoItem({item}) {
    return (
      <TouchableOpacity
        onPress={this.onClickVideo.bind(this, item)}
        style={{borderRadius: windowWidth * 0.036}}>
        <ImageBackground
          source={item.image}
          imageStyle={{borderRadius: windowWidth * 0.036}}
          style={{
            height: windowWidth / 2.46,
            width: windowWidth / 1.36,
            marginLeft: windowWidth * 0.036,
            flexDirection: 'column',
            padding: windowWidth * 0.036,
          }}>
          <Text style={styles.videoRowTitle}>{item.title}</Text>
          <View
            style={{
              marginTop: windowWidth * 0.1936,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.IconCircle}>
                <Image source={item.iconType} style={styles.videoListIcon} />
              </View>

              <Text style={styles.videoAuthorName}>{item.name}</Text>
            </View>
            <View style={styles.durationView}>
              <Image
                source={require('../../Images/durationTimer.jpeg')}
                style={styles.durationIcon}
              />
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  onSelectedType(community) {
    //console.log('onSelectedType', community);
    this.props.navigation.push('CommunityInformation', {community});
  }

  renderCommunities({item, index}) {
    //console.log('item....', item);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onSelectedType.bind(this, item)}>
        <Image source={{uri: item.image}} style={styles.communityImage} />
      </TouchableOpacity>
    );
  }

  onCommunities() {}

  _renderItem = ({item}) => (
    <View key={item.title}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={{}}></View>
          <View style={{flex: 1, backgroundColor: color.greyBg}}>
            {/* <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>HOME</Text>
            </Header> */}
            <View style={styles.container}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topContainer}>
                  <View>
                    <Text style={styles.title}>Recommended for you</Text>
                    <FlatList
                      contentContainerStyle={{paddingLeft: windowWidth * 0.036}}
                      horizontal={true}
                      data={this.state.recommendedUsers}
                      renderItem={this.renderExpertsItem.bind(this)}
                      keyExtractor={(_, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                    />
                    <FlatList
                      contentContainerStyle={{
                        paddingTop: windowWidth * 0.0196,
                      }}
                      data={videoList}
                      extraData={this.state}
                      renderItem={this.renderVideoItem.bind(this)}
                      keyExtractor={(_, index) => index.toString()}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    />

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.matchListTitle}>Hot Matches!</Text>
                      <View style={styles.smallCircle}>
                        <Text style={styles.matchCount}>
                          {this.state.reachOutsList.length}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#e1e4eb',
                        padding: windowWidth * 0.00136,
                        marginHorizontal: windowWidth * 0.036,
                        paddingBottom: windowWidth * 0.036,
                        borderRadius: windowWidth * 0.036,
                      }}>
                      <FlatList
                        data={this.state.reachOutsList}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(_, index) => index.toString()}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.centerContainer}>
                  {/* <Divider style={styles.lineDivider} /> */}
                  <View style={{}}>
                    <View style={styles.topSpaceContainer}>
                      <Text style={styles.communitySubTitle}>
                        Recommended Communities
                      </Text>
                      <TouchableOpacity onPress={this.onCommunities.bind(this)}>
                        <Text style={styles.viewAlltext}>Show more</Text>
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      contentContainerStyle={{paddingLeft: windowWidth * 0.036}}
                      horizontal={true}
                      data={this.state.communities}
                      renderItem={this.renderCommunities.bind(this)}
                      keyExtractor={(_, index) => index.toString()}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <View
                    style={{
                      marginHorizontal: windowWidth * 0.036,
                      marginVertical: windowWidth * 0.036,
                    }}>
                    <Text style={styles.communitySubTitle}>
                      Recommended Tags
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: windowWidth * 0.0136,
                      }}>
                      {this.state.getRecommendedTags.map((res, i) => {
                        return (
                          <View style={styles.tagView}>
                            <Text style={styles.tagText}>{res.name}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
          {/* <Text>Push Notifications</Text>
          <FlatList
            data={pushData}
            renderItem={(item ) => this._renderItem(item)}
            keyExtractor={(item ) => item.title}
          /> */}
          {/* <PushController/> */}
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  state => ({user: state.user, communities: state.communities}),
  {
    getCommunities,
    getAllUsers,
    getReachOuts,
    getRecommendedTags,
    getHomeReachOuts,
    getUserCommunities,
  },
)(Home);
