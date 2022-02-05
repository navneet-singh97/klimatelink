import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon, Subtitle} from 'native-base';
import {Header} from '../../components/header';
import {CardView} from '../../components/cardView';
import {Button} from './../../components/button';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';

import {
  getCommunityInformation,
  checkmapping,
  joinCommunity,
  leaveCommunity,
} from './../../redux/actions/communities';

import styles from './styles';

import {color} from '../../theme';
import database from '@react-native-firebase/database';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CommunitiesList = [
  {
    title: 'Members',
    image: require('./../../Images/Members.png'),
  },
  {
    title: 'Experience',
    image: require('./../../Images/Events.png'),
  },
  {
    title: 'Contact',
    image: require('./../../Images/Contact.png'),
  },
];

interface Props {}

class CommunityInformation extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      aboutText: '',
      subTitle: '',
      communities: [],
      detailImage: '',
      followed: false,
      communityUid: '',
      communityInformation:{},
      userID:''
    };
    //this.community = this.props.route.params.community;
  }
  onLeft() {
    const {communityInformation} = this.props.communities;
    const userData = this.props.user.getReachOutsInHome.result;
    // let communityID = this.state.communityUid
    // let userID = userData[0].userId;
    // database()
    //   .ref(`Group/${communityID}/${userID}`)
    //   .set({userId: userID, isOnline: false})
    //   .then(data => {
    //     //success callback
    //     console.log('data ', data);
    //   })
    //   .catch(error => {
    //     //error callback
    //     console.log('error ', error);
    //   });
    this.props.navigation.goBack();
  }

  onSelect(value) {
    // const {communityInformation} = this.props.communities;
    // const userData = this.props.user.getReachOutsInHome.result;
    // let communityID = communityInformation.result.uid;
    // let userID = userData[0].userId;
    // database()
    //   .ref(`Group/${communityID}/${userID}`)
    //   .set({userId: userID, isOnline: false})
    //   .then(data => {
    //     //success callback
    //     console.log('data ', data);
    //   })
    //   .catch(error => {
    //     //error callback
    //     console.log('error ', error);
    //   });
    if (value == 'Members') {
      this.props.navigation.push('CommunityMembers', {
        firebaseCommunityId: this.state.communityUid,
      });
    } else if (value == 'Contact') {
      this.props.navigation.push('ContactScreen', {
        communityTitle: this.state.title,
      });
    } else if (value === 'Posts') {
      this.props.navigation.push('CommunityPosts',{communityId:this.state.communityInformation.result.uid,userId:this.state.userID});
    } else {
      this.props.navigation.push('EventsScreen');
    }
  }

  async componentDidMount() {
    console.log(
      'Community data from previous screen',
      this.props.route.params.community,
    );
    this.setState({communityUid: this.props.route.params.community.uid});
    await this.props.getCommunityInformation(
      this.props.route.params.community.uid,
    );
    if (this.props.communities.communityInformation) {
      if (
        this.props.communities.communityInformation.message ==
        'GET Request successful.'
      ) {
        const information = this.props.communities.communityInformation.result;
        this.setState({
          title: information.title,
          aboutText: information.heading,
          subTitle: information.description,
          communities: [...this.state.communities, ...information.tabItems],
          detailImage: information.detailImage,
        });
      }
    }
    const {user} = this.props;
    const {communityInformation} = this.props.communities;
    this.setState({communityInformation:communityInformation,userID:user.userUId})
    const data = {
      communityDetailId: communityInformation.result.uid,
      userId: user.userUId,
    };

    await this.props.checkmapping(data);
    const {checkMapping} = this.props.communities;
    if (checkMapping && checkMapping.message == 'POST Request successful.') {
      if (checkMapping.result == true) {
        const {communityInformation} = this.props.communities;
        const userData = this.props.user.getReachOutsInHome.result;
        let communityID = this.state.communityUid;
        let userID = userData[0].userId;
        database()
          .ref(`Group/${communityID}/${userID}`)
          .set({userId: userID, isOnline: true});
      } else {
        const {communityInformation} = this.props.communities;
        const userData = this.props.user.getReachOutsInHome.result;
        let communityID = this.state.communityUid;
        let userID = userData[0].userId;
        database()
          .ref(`Group/${communityID}/${userID}`)
          .set({userId: userID, isOnline: false});
      }
      this.setState({followed: checkMapping.result});
    }
  }

  followUnfollow = async () => {
    const {user} = this.props;
    const {communityInformation} = this.props.communities;
    this.setState({communityInformation:communityInformation})
    const data = {
      communityDetailId: communityInformation.result.uid,
      userId: user.userUId,
    };
    const userData = this.props.user.getReachOutsInHome.result;
    let communityID = this.state.communityUid;
    console.log('user data user data',user)
    let userID = userData[0].userId;
    console.log('This is the user id', userID);
    if (this.state.followed) {
      await this.props.leaveCommunity(data);
      const {leaveCommunityDetails} = this.props.communities;
      if (
        leaveCommunityDetails &&
        leaveCommunityDetails.message == 'POST Request successful.'
      ) {
        this.setState({followed: false});
      } else {
        alert('Something went wrong.');
      }
      database()
        .ref(`Group/${communityID}/${userID}`)
        .set({userId: userID, isOnline: false})
        .then(data => {
          //success callback
          console.log('data ', data);
        })
        .catch(error => {
          //error callback
          console.log('error ', error);
        });
    } else {
      await this.props.joinCommunity(data);
      const {joinCommunityDetails} = this.props.communities;
      if (
        joinCommunityDetails &&
        joinCommunityDetails.message == 'POST Request successful.'
      ) {
        this.setState({followed: true});
      } else {
        alert('Something went wrong.');
      }
      database()
        .ref(`Group/${communityID}/${userID}`)
        .set({userId: userID, isOnline: true})
        .then(data => {
          //success callback
          console.log('data ', data);
        })
        .catch(error => {
          //error callback
          console.log('error ', error);
        });
    }
  };

  carouselRender({item, index}) {
    return (
      <View style={styles.listImageView}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.onSelect.bind(this, item.tabName)}>
          <ImageBackground
            source={{uri: item.tabImage}}
            style={styles.listImageStyle}
            imageStyle={{borderRadius: windowWidth * 0.0196}}>
            <Text style={styles.listTitleStyle}>{item.tabName}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {title, subTitle, aboutText, communities, detailImage} = this.state;
    return (
      <ScrollView>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}></Header>
            <View>
              <ImageBackground
                source={{uri: detailImage}}
                style={styles.bgImagStyle}>
                <TouchableOpacity
                  style={
                    this.state.followed ? styles.unFollowBtn : styles.followBtn
                  }
                  onPress={() => this.followUnfollow()}>
                  <Text
                    style={
                      this.state.followed
                        ? styles.followText
                        : styles.unfollowText
                    }>
                    {this.state.followed ? 'Unfollow' : 'Follow +'}
                  </Text>
                </TouchableOpacity>
                <View style={styles.curveView}>
                  <View style={{padding: windowWidth * 0.0416}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.aboutText}>{aboutText}</Text>
                    <Divider style={styles.lineDivider} />
                    <Text style={styles.subTitle}>{subTitle}</Text>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.carouselMainView}>
                <Carousel
                  layout={'default'}
                  ref={ref => (this.carousel = ref)}
                  data={communities}
                  sliderWidth={windowWidth}
                  itemWidth={windowWidth / 2.3}
                  renderItem={item => this.carouselRender(item)}
                  activeSlideAlignment={'start'}
                  onSnapToItem={index => this.setState({activeIndex: index})}
                  contentContainerCustomStyle={{}}
                  inactiveSlideScale={1}
                  inactiveSlideOpacity={1}
                  slideStyle={{padding: windowWidth * 0.036}}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
export default connect(
  state => ({
    communities: state.communities,
    user: state.user,
  }),
  {getCommunityInformation, checkmapping, joinCommunity, leaveCommunity},
)(CommunityInformation);
