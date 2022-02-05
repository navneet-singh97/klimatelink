import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  SectionList,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Icon} from 'native-base';
import {CardView} from '../../components/cardView';
import {Avatar, Divider} from 'react-native-elements';
import {color} from './../../theme';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {getUserDetails} from '../../redux/actions/user';
import TransactionHistory from '../transactionHistory';
import AnimatedLoader from 'react-native-animated-loader';
import {Header} from '../../components/header';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const videoList = [
  {
    id: 0,
    title: 'Opportunity in Green Hydrogen by Jason Response',
    image: require('../../Images/StoriesIcons/Person2.png'),
  },
  {
    id: 1,
    title: 'Energy Efficiency 101 for beginners by Hanson Deck',
    image: require('../../Images/StoriesIcons/Person3.png'),
  },
  {
    id: 2,
    title: 'Opportunity in Green Hydrogen by Jason Response',
    image: require('../../Images/StoriesIcons/Person2.png'),
  },
];

const podCastList = [
  {
    id: 0,
    title: 'Career transition into digital by Piff Jenkins',
    image: require('../../Images/StoriesIcons/Person1.png'),
  },
  {
    id: 1,
    title: 'The power of Blockchain  Technology by Jake Weary',
    image: require('../../Images/StoriesIcons/Person5.png'),
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

interface Props {
  navigation: any;
}

interface profileState {
  selectedEmployments: any;
  selectedCards: any;
  userImage: any;
}

class Library extends Component<Props, profileState> {
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
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log('Libarray_Screen_err', err);
    }
  }

  async getUserInformation() {
    // console.log('getUserInformation_123456789', this.props.user.userUId);
    if (this.props.user != undefined) {
      let userID = await this.props.user.userUId;
      await this.props.getUserDetails(userID);
      console.log(
        'this.props.user.getUserInfo_123456789',
        this.props.user.getUserInfo.result,
      );
      if (
        this.props.user.getUserInfo.result !== null ||
        this.props.user.getUserInfo.result !== undefined
      ) {
        if (this.props.user.getUserInfo.result.isProfileMissing == false) {
          await this.setState({
            userName: this.props.user.getUserInfo.result.additionalUserInfo
              .username,
            userImage: this.props.user.getUserInfo.result.additionalUserInfo
              .profilePicture,
            userInfo: this.props.user.getUserInfo.result,
            userLocation: this.props.user.getUserInfo.result.additionalUserInfo
              .address,
          });
        } else {
          await this.setState({
            userInfo: this.props.user.getUserInfo.result,
          });
        }
      }
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  renderItem({item, index}) {
    //console.log("item....", item.title);
    return (
      <View style={styles.listImageView}>
        <View style={styles.activeListView}>
          <Avatar
            rounded
            source={item.image}
            size={windowWidth * 0.156}
            containerStyle={{alignSelf: 'center'}}
          />
        </View>
        <Text style={styles.activeListName}>{item.title}</Text>
      </View>
    );
  }

  renderCommunities({item, index}) {
    //console.log("item....", item.title);
    return <Image source={item.image} style={styles.communityImage} />;
  }

  onCommunities() {
    this.props.navigation.push('Main', {navigateFrom: 'ProfileCommunity'});
  }

  onClickRow(value, item) {
    this.props.navigation.push('FormatScreen', {
      libraryType: value,
      item: item,
    });
  }

  renderVideosItem({item, index}) {
    return (
      <View>
        <TouchableOpacity
          style={styles.renderView}
          onPress={this.onClickRow.bind(this, 'videos', item)}>
          <Image source={item.image} style={styles.renderImage} />
        </TouchableOpacity>
        <Text style={styles.renderItemStyle}>{item.title}</Text>
      </View>
    );
  }

  renderPodcastItem({item, index}) {
    return (
      <View>
        <TouchableOpacity
          style={styles.renderView}
          onPress={this.onClickRow.bind(this, 'podcast', item)}>
          <Image source={item.image} style={styles.renderImage} />
        </TouchableOpacity>
        <Text style={styles.renderItemStyle}>{item.title}</Text>
      </View>
    );
  }

  render() {
    //const { navigate } = this.props
    console.log('this.state.userLocation_123' + this.state.userLocation);
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>LIBRARY</Text>
            </Header>

            <ScrollView>
              <View style={styles.topProfileContainer}></View>

              <View
                style={{
                  marginHorizontal: windowWidth * 0.036,
                  // marginVertical: windowWidth * 0.036,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: windowWidth * 0.036,
                  }}>
                  <Text style={styles.subTitle}>Categories</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewAlltext}>View All</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: windowWidth * 0.0136,
                  }}>
                  {RecommendedTags.map((res, i) => {
                    return (
                      <View style={styles.tagView}>
                        <Text style={styles.tagText}>{res}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={{margin: windowWidth * 0.036}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.subTitle}>Videos</Text>
                </View>
              </View>

              <View style={{marginVertical: windowWidth * 0.036}}>
                <FlatList
                  contentContainerStyle={{paddingLeft: windowWidth * 0.036}}
                  horizontal={true}
                  data={videoList}
                  renderItem={this.renderVideosItem.bind(this)}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
              <View style={{margin: windowWidth * 0.036}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.subTitle}>Podcast</Text>
                </View>
              </View>
              <View style={{marginVertical: windowWidth * 0.036}}>
                <FlatList
                  contentContainerStyle={{
                    paddingLeft: windowWidth * 0.036,
                    marginBottom: windowWidth * 0.066,
                  }}
                  horizontal={true}
                  data={podCastList}
                  renderItem={this.renderPodcastItem.bind(this)}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </ScrollView>
            {/* <AnimatedLoader
              visible={this.state.showLoader}
              overlayColor="rgba(255,255,255,0.36)"
              source={require('./../animationLoaders/loader_4.json')}
              animationStyle={{
                width: windowWidth * 0.36,
                height: windowWidth * 0.36,
              }}
              speed={1}
            /> */}
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
export default connect(
  state => ({
    user: state.user,
  }),
  {getUserDetails},
)(Library);
