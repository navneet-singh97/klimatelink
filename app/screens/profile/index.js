import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Alert,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'native-base';
import {CardView} from '../../components/cardView';
import {Avatar, Divider} from 'react-native-elements';
import {color} from './../../theme';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  getUserDetails,
  reachOutByUserId,
  getUserFollowers,
  showUserPersonaliseCategory,
  uploadProfile,
  onEditProfile,
} from '../../redux/actions/user';
import moment from 'moment';
import {
  getCommunities,
  getUserCommunities,
} from './../../redux/actions/communities';

import TransactionHistory from '../transactionHistory';
import AnimatedLoader from 'react-native-animated-loader';
import ImagePicker from 'react-native-image-crop-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

let countList = [
  {
    type: 'Posts',
    count: '124',
  },
  {
    type: 'Followers',
    count: '400',
  },
  {
    type: 'Following',
    count: '364',
  },
];

const activeList = [
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
  {
    title: 'Rohith',
    image: require('./../../Images/members/1.png'),
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

const certificatesList = [
  {
    id: 0,
    title: 'Employment Profile',
    data: [
      {
        _id: 0,
        title: 'PricewaterhouseCoopers',
        jobTitle: 'Chief Product Officer',
        start_date: '05/05/2018',
        end_date: '05/05/2019',
        employee_id: '854535598',
        salary: '50L',
        location: 'Hyderabad',
      },
      {
        _id: 1,
        title: 'Hibu India Pvt. Ltd',
        jobTitle: 'Head of Product Strategic',
        start_date: '05/05/2017',
        end_date: '01/05/2018',
        employee_id: '854535591',
        salary: '40L',
        location: 'Bengaluru',
      },
      {
        _id: 2,
        title: 'Sweya Infotech',
        jobTitle: 'Senior Transformation Advisor',
        start_date: '05/04/2016',
        end_date: '01/04/2017',
        employee_id: '8545366661',
        salary: '35L',
        location: 'Visakhapatnam',
      },
      {
        _id: 3,
        title: 'Infosys',
        jobTitle: 'Senior Advisor',
        start_date: '19/04/2015',
        end_date: '01/04/2016',
        employee_id: '85499991',
        salary: '30L',
        location: 'Chennai',
      },
    ],
  },
  {
    id: 1,
    title: 'Other Certifications',
    data: [
      {
        _id: 4,
        title: 'Award of Excellence',
        jobTitle: 'From the St. Anns School',
        location: 'Chennai',
      },
      {
        _id: 5,
        title: 'Painting competition 2001',
        jobTitle: 'From the St. Anns School',
        location: 'Chennai',
      },
    ],
  },
];

const HotMatchList = [
  {
    id: 0,
    leftImage: require('./../../Images/job-search.png'),
    title: 'Unlisted Job',
    content: 'Consulting and Advisory Work - £400/day',
  },
  {
    id: 1,
    leftImage: require('./../../Images/drink.png'),
    title: 'Virtual Coffee',
    content: 'Individual Career Mentoring Weekends',
  },
  {
    id: 2,
    leftImage: require('./../../Images/dinner.png'),
    title: 'London China Town Dinner',
    content: 'Green Hydrogen - Yara',
  },
  {
    id: 3,
    leftImage: require('./../../Images/networking.png'),
    title: 'Community Collabration',
    content: 'Energy Trading Platform- Blockchain',
  },
];

let RecommendedTags = [
  'Green Hydrogen',
  'Sustainable Finance',
  'Sustainable Farming',
  'Green Ammonia',
  'Green Ethanol',
  'Solar Grid',
  'Space Tech',
  'Sustainable Design',
];

interface Props {
  navigation: any;
}

interface profileState {
  selectedEmployments: any;
  selectedCards: any;
  userImage: any;
}

class Profile extends Component<Props, profileState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedEmployments: [],
      selectedCards: [],
      userImage: '',
      userId: '',
      userName: '',
      userInfo: null,
      userLocation: '',
      isRefresh: false,
      showLoader: false,
      selectedmatches: [],
      selectedStarmatches: [],
      followers: 0,
      following: 0,
      posts: 0,
      countList: [],
      reachOutsList: [],
      followersList: [],
      getCommunitiesByUserId: [],
      getSkills: [],
      profilePicModal: false,
      profilePicBase64: '',
      userProfilePic: '',
      about:
        'Product Owner, Community Manager, ToIP ViceChair, Tech Officer and loves reading',
      editAbout: false,
    };
  }

  async onSelectRefresh(data) {
    try {
      let userID = await this.props.user.userUId;
      //await this.props.getUserDetails(userID);
      await this.getUserInformation();
      this.setState({isRefresh: data.isRefresh});
    } catch (err) {
      console.log('getbacktoprofile_error', err);
    }
  }

  async componentDidMount() {
    try {
      this.setState({showLoader: true});
      let userID = await this.props.user.userUId;
      this.setState({userId: userID});
      //await this.props.getUserDetails(userID);
      await this.getUserInformation();
      this.setState({showLoader: false});
    } catch (err) {
      this.setState({showLoader: false});

      console.log('getUserInformation_profile_err', err);
    }

    try {
      await this.props.reachOutByUserId(this.state.userId);
      if (this.props.user) {
        this.setState({
          reachOutsList: this.props.user.getReachOutsByUserId.result,
        });
      }
    } catch (err) {
      console.log('componentDidMount_err_reachOutByUserId', err);
    }
    try {
      await this.props.getUserFollowers(this.state.userId);
      if (this.props.user) {
        this.setState({
          followersList: this.props.user.getFollowers.result,
        });
      }
    } catch (err) {
      console.log('componentDidMount_err_getUserFollowers', err);
    }
    try {
      await this.props.getUserCommunities(this.state.userId);
      if (this.props.communities) {
        this.setState({
          getCommunitiesByUserId: this.props.communities.getCommunitiesByUserId
            .result,
        });
      }
    } catch (err) {
      console.log('componentDidMount_err_getUserCommunities', err);
    }
    try {
      await this.props.showUserPersonaliseCategory(this.state.userId);
      if (this.props.user) {
        this.setState({
          getSkills: this.props.user.userPersonaliseCategories.result[1]
            .subCategories,
        });
        //console.log('getSkills_123', this.state.getSkills);
      }
    } catch (err) {
      console.log('getSkills_catch_err', err);
    }
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        await this.getUserInformation();
        //Put your Data loading function here instead of my this.loadData()
      },
    );
  }

  async getUserInformation() {
    // console.log('getUserInformation_123456789', this.props.user.userUId);
    if (this.props.user != undefined) {
      let userID = await this.props.user.userUId;
      await this.props.getUserDetails(userID);
      // console.log(
      //   'this.props.user.getUserInfo_123456789',
      //   this.props.user.getUserInfo.result,
      // );
      if (
        this.props.user.getUserInfo.result !== null ||
        this.props.user.getUserInfo.result !== undefined
      ) {
        if (this.props.user.getUserInfo.result.isProfileMissing == false) {
          const {additionalUserInfo} = this.props.user.getUserInfo.result;
          let about =
            additionalUserInfo && additionalUserInfo.about
              ? additionalUserInfo.about
              : this.state.about;
          await this.setState({
            userName: this.props.user.getUserInfo.result.additionalUserInfo
              .username,
            userImage: this.props.user.getUserInfo.result.additionalUserInfo
              .profilePicture,
            userInfo: this.props.user.getUserInfo.result,
            userLocation: this.props.user.getUserInfo.result.additionalUserInfo
              .address,
            followers: this.props.user.getUserInfo.result.followers,
            following: this.props.user.getUserInfo.result.following,
            posts: this.props.user.getUserInfo.result.posts,
            about: about,
          });
        } else {
          await this.setState({
            userInfo: this.props.user.getUserInfo.result,
          });
        }
        let countList = [
          {
            type: 'Posts',
            count: this.state.posts,
          },
          {
            type: 'Followers',
            count: this.state.followers,
          },
          {
            type: 'Following',
            count: this.state.following,
          },
        ];
        this.setState({countList: countList});
      }
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  navigateToProfile = item => {
    this.props.navigation.push('UserDetail', {
      guid: item.uid,
      user: item,
    });
  };

  renderItem({item, index}) {
    return (
      <View style={styles.listImageView} key={item.uid}>
        <TouchableOpacity onPress={() => this.navigateToProfile(item)}>
          <View style={styles.activeListView}>
            <Avatar
              rounded
              source={{uri: item.profilePic}}
              size={windowWidth * 0.18}
              containerStyle={{
                alignSelf: 'center',
                borderColor: 'green',
                borderWidth: 2,
              }}
            />
          </View>

          {/* <Text style={styles.activeListName}>{item.name.split(' ')[0]}</Text>
          <Text style={styles.activeListName}>{item.name.split(' ')[1]}</Text> */}
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
        </TouchableOpacity>
      </View>
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

  onEditProfile = () => {
    //Previous Code
    // this.props.navigation.push('EditProfile', {
    //   userId: this.state.userId,
    //   userInfo: this.state.userInfo,
    //   onSelectRefresh: this.onSelectRefresh.bind(this),
    // });
    const userDetails = this.props.user;
    let user = {};
    if (userDetails.editProfile) {
      user = userDetails.editProfile;
    } else if (userDetails.loginWithPhoneNum) {
      user = userDetails.loginWithPhoneNum;
    } else if (userDetails.register) {
      user = userDetails.register;
    } else {
      user = userDetails.login;
    }
    this.props.navigation.push('EditProfile_V1', {
      user: user,
      isSocialLogin: false,
      onSelectRefresh: this.onSelectRefresh.bind(this),
    });
    //this.setState({profilePicModal: true})
  };

  onCommunities() {
    this.props.navigation.push('Main', {navigateFrom: 'ProfileCommunity'});
  }

  onMutualFollowers() {
    this.props.navigation.push('CommunityMembers', {
      navigateFrom: 'ProfileMutualFollowers',
    });
  }

  onHighFiHand(item) {
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

  onCardExtension(item) {
    var count = 0;
    if (this.state.selectedCards.length == 0) {
      this.state.selectedCards.push({
        _id: item._id,
        title: item.title,
      });
    } else {
      this.state.selectedCards.map((res, i) => {
        if (item._id == res._id) {
          this.state.selectedCards.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedCards.push({
          _id: item._id,
          title: item.title,
        });
      }
    }
    this.setState({selectedCards: this.state.selectedCards});
    //console.log('this.state.selectedCards', this.state.selectedCards);
  }

  employmentsSectionRender({item, index, section: {title}}) {
    var count = 0;
    var cardCount = 0;
    var isSwitch;
    var showSubList;
    var visibiltyType = 'Private';

    this.state.selectedEmployments.map((res, i) => {
      if (res._id == item._id) {
        isSwitch = true;
        visibiltyType = 'Public';
        count = count + 1;
      }
      if (count === 0) {
        visibiltyType = 'Private';
        isSwitch = false;
      }
    });

    this.state.selectedCards.map((res, i) => {
      if (res._id == item._id) {
        showSubList = true;
        cardCount = cardCount + 1;
      }
      if (cardCount === 0) {
        showSubList = false;
      }
    });
    //console.log("title", this.state.employmentMainList.includes(title));

    return (
      <View>
        <View>
          <CardView style={styles.cardView}>
            <View style={styles.innerCardView}>
              <View style={styles.notificationView}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: windowWidth * 0.113,
                      height: windowWidth * 0.113,
                      borderRadius: (windowWidth * 0.113) / 2,
                      borderWidth: 1.6,
                      borderColor: item.color,
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={
                        item.title == 'Employment Profile'
                          ? require('../../Images/employmentSuitCase.png')
                          : require('../../Images/agreement.png')
                      }
                      style={{
                        width: windowWidth * 0.06,
                        height: windowWidth * 0.06,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.titleView}>
                  <Text style={styles.notificationTitleText}>{item.title}</Text>
                  <Text style={styles.notificationText}>{item.jobTitle}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    marginLeft: windowWidth * 0.036,
                  }}>
                  <Text
                    style={[
                      styles.visibiltyText,
                      {color: isSwitch ? color.primary : color.primaryColor},
                    ]}>
                    {visibiltyType}
                  </Text>
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                      //padding: windowWidth * 0.036,
                      //backgroundColor: "pink",
                    }}
                    onPress={this.onSwitch.bind(this, item)}>
                    <Icon
                      type={'FontAwesome'}
                      name={isSwitch ? 'toggle-on' : 'toggle-off'}
                      style={{
                        fontSize: windowWidth * 0.069,
                        color: isSwitch ? color.primary : color.greyText,
                        ///alignSelf: "flex-end",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {showSubList ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: windowWidth * 0.13,
                  }}>
                  {title == 'Employment Profile' ? (
                    <View
                      style={{
                        flexDirection: 'column',
                      }}>
                      <Text style={styles.toggleInfoText}>
                        Start Date: {item.start_date}
                      </Text>
                      <Text style={styles.toggleInfoText}>
                        End Date: {item.end_date}
                      </Text>
                      <Text style={styles.toggleInfoText}>
                        Employee ID: {item.employee_id}
                      </Text>
                      <Text style={styles.toggleInfoText}>
                        Salary: {item.salary}
                      </Text>
                      <Text style={styles.toggleInfoText}>
                        Location: {item.location}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'column',
                      }}>
                      <Text style={styles.toggleInfoText}>
                        Location: {item.location}
                      </Text>
                    </View>
                  )}
                </View>
              ) : null}
              <TouchableOpacity
                onPress={this.onCardExtension.bind(this, item)}
                activeOpacity={1}>
                <Icon
                  type={'FontAwesome'}
                  name={showSubList ? 'angle-double-up' : 'angle-double-down'}
                  style={{
                    fontSize: windowWidth * 0.0649,
                    color: color.greyText,
                    alignSelf: 'center',
                    marginTop: windowWidth * 0.006,
                    marginBottom: windowWidth * 0.016,
                  }}
                />
              </TouchableOpacity>
            </View>
          </CardView>
        </View>
      </View>
    );
  }

  employmentSectionHeader({section: {title, data}}) {
    return (
      <View style={{marginVertical: windowWidth * 0.06}}>
        <Text style={styles.subTitle}>{title}</Text>
      </View>
    );
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

  renderMatchItem({item, index}) {
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
        <View style={styles.cardMatchView}>
          <View style={styles.innerMatchCardView}>
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
              <TouchableOpacity onPress={this.onHighFiHand.bind(this, item)}>
                <Image source={handImage} style={styles.leftContainImage} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  async onChoosePic(val) {
    if (val === 'Take Photo') {
      await this.setState({profilePicModal: false});
      // setTimeout(async () => {
      //   await this.onSelectCamera();
      // }, 1000);
      await this.onSelectCamera();
    } else {
      await this.setState({profilePicModal: false});
      // setTimeout(async () => {
      //   await this.onSelectGallery();
      // }, 1000);
      await this.onSelectGallery();
    }
  }

  async onSelectCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        //console.log('onSelectCamera', image);
        await this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadProfile(this.state.profilePicBase64);
          await this.setState(
            {
              userImage: this.props.user.uploadProfile.result,
            },
            async () => {
              await this.updateProfile();
            },
          );
        });
        //await this.updateProfile();
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
      includeBase64: true,
    })
      .then(async image => {
        //console.log('onSelectGallery', image);
        await this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadProfile(this.state.profilePicBase64);
          await this.setState(
            {
              userImage: this.props.user.uploadProfile.result,
            },
            async () => {
              await this.updateProfile();
            },
          );
        });
        //await this.updateProfile();
      })
      .catch(error => {
        console.log('onSelectGallery_error', error);
      });
  }

  async updateProfile() {
    const {result} = this.props.user.getUserInfo;
    let userName = result.additionalUserInfo
      ? result.additionalUserInfo.username
      : result.firstName + ' ' + result.lastName;
    let editProfileInfo = {
      userID: this.props.user.userUId,
      about: this.state.about,
      address: this.state.location,
      profilePicPath: this.state.userImage,
      isSocialLogin: false,
      provider: '',
      providerId: '',
      userName,
      email: result.email,
      dateOfBirth: moment(result.dateOfBirth).format('YYYY-MM-DD'),
      firstName: result.firstName,
      lastName: result.lastName,
    };

    await this.props.onEditProfile(editProfileInfo);

    //console.log("nunununun", this.props.user.editProfile)

    if (this.props.user.editProfile.message == 'PUT Request successful.') {
      //console.log(this.props.user);
      Alert.alert(
        'ClimateLink',
        'Profile Updated Successfully',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'ClimateLink',
        'Something Went Wrong',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  }

  editAbout = async () => {
    const {editAbout} = this.state;
    if (editAbout) {
      await this.updateProfile();
    }
    this.setState({editAbout: !editAbout});
  };

  render() {
    //const { navigate } = this.props
    //console.log('this.state.userLocation_123' + this.state.userLocation);
    //console.log(this.state)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.topProfileContainer}>
            <View style={{flexDirection: 'row', borderWidth: 0}}>
              <View style={{flex: 0.91}}>
                <Text style={styles.name}>{this.state.userName}</Text>
                {this.state.userLocation !== '' ? (
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      type="SimpleLineIcons"
                      name="location-pin"
                      style={styles.locationIcon}
                    />
                    <Text style={styles.locationText}>
                      {this.state.userLocation}
                    </Text>
                  </View>
                ) : null}
              </View>
              <TouchableOpacity
                style={{flex: 0.09}}
                onPress={() => this.onEditProfile()}>
                <Icon
                  type="FontAwesome5"
                  name="user-edit"
                  style={{
                    color: 'black',
                    fontSize: windowWidth * 0.06,
                    marginTop: windowWidth * 0.036,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: windowWidth * 0.036}}>
              {this.state.userImage == '' ||
              this.state.userImage == undefined ? (
                <ImageBackground
                  resizeMode="cover"
                  source={require('../../Images/user_placeholder.png')}
                  //source={{uri: this.state.userImage}}
                  imageStyle={{
                    borderRadius: windowWidth * 0.0196,
                    borderWidth: 0.6,
                    width: windowWidth / 1.12,
                    height: windowWidth / 1.536,
                  }}
                  style={styles.profilePic}>
                  {/* <TouchableOpacity style={styles.followBtn}>
                    <Text style={styles.followText}>Follow +</Text>
                  </TouchableOpacity> */}
                </ImageBackground>
              ) : (
                <ImageBackground
                  resizeMode="cover"
                  //source={require('../../Images/user_placeholder.png')}
                  source={{uri: this.state.userImage}}
                  imageStyle={{
                    borderRadius: windowWidth * 0.0196,
                    width: windowWidth / 1.12,
                    height: windowWidth / 1.536,
                  }}
                  style={styles.profilePic}>
                  {/* <TouchableOpacity style={styles.followBtn}>
                    <Text style={styles.followText}>Follow +</Text>
                  </TouchableOpacity> */}
                </ImageBackground>
              )}
            </View>
            <View style={styles.interactionContainer}>
              {this.state.countList.map((res, i) => {
                return (
                  <View style={styles.subInteraction}>
                    <Text style={styles.countText}>{res.count}</Text>
                    <Text style={styles.interactionTitle}>{res.type}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <Divider style={{backgroundColor: color.greyText}} />
          <View style={styles.aboutContainer}>
            <View style={{flex: 0.2}}>
              <Text style={styles.aboutText}>About</Text>
            </View>

            <View style={{flex: 0.8}}>
              <Text style={styles.aboutInfo}>{this.state.about}</Text>
            </View>
            {/* <TouchableOpacity onPress={()=>{this.editAbout()}} style={{marginLeft: 5}}>
              <Icon type="MaterialCommunityIcons" name={this.state.editAbout ? "check":"pencil-outline"} style={{fontSize: 24}}/>
            </TouchableOpacity> */}
          </View>
          <Divider style={{backgroundColor: color.greyText}} />
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.matchListTitle}>Reach out to me!</Text>
              <View style={styles.smallCircle}>
                <Text style={styles.matchCount}>
                  {this.state.reachOutsList.length}
                </Text>
              </View>
            </View>
            {this.state.reachOutsList.length > 0 ? (
              <View
                style={{
                  backgroundColor: '#e1e4eb',
                  padding: windowWidth * 0.01316,
                  marginHorizontal: windowWidth * 0.0316,
                  paddingBottom: windowWidth * 0.036,
                  borderRadius: windowWidth * 0.036,
                  borderWidth: 0.36,
                }}>
                <FlatList
                  data={this.state.reachOutsList}
                  renderItem={this.renderMatchItem.bind(this)}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : (
              <Text style={styles.noResultsText}>No Reach Outs Found</Text>
            )}
          </View>
          <View style={styles.mutualFollowersContainer}>
            <View style={styles.topSpaceContainer}>
              <Text style={styles.subTitle}>Followers</Text>
              <TouchableOpacity onPress={this.onMutualFollowers.bind(this)}>
                {this.state.followersList &&
                this.state.followersList.length > 0 ? (
                  <Text style={styles.viewAlltext}>View All</Text>
                ) : null}
              </TouchableOpacity>
            </View>
            {this.state.followersList && this.state.followersList.length > 0 ? (
              <FlatList
                horizontal={true}
                data={this.state.followersList}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.noResultsText}>No Followers Found</Text>
            )}
          </View>
          <Divider style={{backgroundColor: color.greyText}} />
          <View style={styles.CommunityContainer}>
            <View style={styles.topSpaceContainer}>
              <Text style={styles.subTitle}>Community Membership</Text>
              <TouchableOpacity onPress={this.onCommunities.bind(this)}>
                {this.state.getCommunitiesByUserId &&
                this.state.getCommunitiesByUserId.length > 0 ? (
                  <Text style={styles.viewAlltext}>View All</Text>
                ) : null}
              </TouchableOpacity>
            </View>
            {this.state.getCommunitiesByUserId &&
            this.state.getCommunitiesByUserId.length > 0 ? (
              <FlatList
                horizontal={true}
                contentContainerStyle={{paddingRight: 0}}
                data={this.state.getCommunitiesByUserId}
                renderItem={this.renderCommunities.bind(this)}
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
              />
            ) : (
              <TouchableOpacity
                style={styles.communitiesBtn}
                onPress={this.onCommunities.bind(this)}>
                <Text style={styles.communitiesBtnText}>Check Communities</Text>
              </TouchableOpacity>
            )}

            {/* <SectionList
              extraData={this.state}
              sections={certificatesList}
              keyExtractor={(item, index) => item + index}
              renderItem={this.employmentsSectionRender.bind(this)}
              renderSectionHeader={this.employmentSectionHeader.bind(this)}
            /> */}
          </View>
          <View
            style={{
              marginHorizontal: windowWidth * 0.036,
              marginVertical: windowWidth * 0.036,
            }}>
            <Text style={styles.communitySubTitle}>My Skills</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: windowWidth * 0.0136,
              }}>
              {this.state.getSkills.map((res, i) => {
                return (
                  <View style={styles.tagView}>
                    <Text style={styles.tagText}>{res.subcategoryName}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <AnimatedLoader
          visible={this.state.showLoader}
          overlayColor="rgba(255,255,255,0.36)"
          source={require('./../animationLoaders/loader_4.json')}
          animationStyle={{
            width: windowWidth * 0.36,
            height: windowWidth * 0.36,
          }}
          speed={1}
        />
        <Modal isVisible={this.state.profilePicModal}>
          <View style={styles.modalBox}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // height: windowWidth * 0.1346,
                borderBottomWidth: 1,
                flex: 0.45,
              }}>
              <Text style={styles.avatarTitle}>Select Avatar</Text>
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
                    key={res.title}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: windowWidth * 0.0516,
                    }}
                    onPress={this.onChoosePic.bind(this, res.title)}>
                    <Text style={styles.chooseOptionTitle}>{res.title}</Text>
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
              style={styles.avatarCancelBtn}
              onPress={() => this.setState({profilePicModal: false})}>
              <Text style={styles.avatarbuttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
export default connect(
  state => ({
    user: state.user,
    communities: state.communities,
  }),
  {
    getUserDetails,
    getCommunities,
    reachOutByUserId,
    getUserFollowers,
    getUserCommunities,
    showUserPersonaliseCategory,
    uploadProfile,
    onEditProfile,
  },
)(Profile);
