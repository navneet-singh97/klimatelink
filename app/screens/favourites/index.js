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

const OthersList = [
  {
    id: 0,
    title: 'JOBS - 15 APPLICANTS',
    designation: 'Sustainability Director',
    location: 'London, UK',
    time: '21/06/2021',
    image: require('../../Images/job-search.png'),
  },
  {
    id: 1,
    title: 'EXPERIENCE - 4 SEATS LEFT',
    designation: 'Business Development Coaching',
    location: 'Liverpool, UK',
    time: '21/06/2021',
    image: require('../../Images/drink.png'),
  },
  {
    id: 2,
    title: 'JOBS - 0 APPLICANTS',
    designation: 'Associate Consultant',
    location: 'Beijing, China',
    time: '21/06/2021',
    image: require('../../Images/job-search.png'),
  },
  {
    id: 3,
    title: 'EXPERIENCES - COMPLETELY BOOKED',
    designation: 'Hydrogen Economy - Talk',
    location: 'Tokyo, Japan',
    time: '21/06/2021',
    image: require('../../Images/drink.png'),
  },
  {
    id: 4,
    title: 'COLLABORATION - ACCEPTING',
    designation: 'Net Zero Fuel Working Group',
    location: 'Banglore, India',
    time: '21/06/2021',
    image: require('../../Images/networking.png'),
  },
  {
    id: 5,
    title: 'EXPERIENCES - COMPLETELY BOOKED',
    designation: 'Hydrogen Economy - Talk',
    location: 'Tokyo, Japan',
    time: '21/06/2021',
    image: require('../../Images/drink.png'),
  },
  {
    id: 6,
    title: 'COLLABORATION - ACCEPTING',
    designation: 'Net Zero Fuel Working Group',
    location: 'Banglore, India',
    time: '21/06/2021',
    image: require('../../Images/networking.png'),
  },
];

const HotMatch = [
  {
    id: 0,
    title: 'JOBS - 15 APPLICANTS',
    designation: 'Sustainability Director',
    location: 'London, UK',
    time: '21/06/2021',
    image: require('../../Images/job-search.png'),
  },
  {
    id: 1,
    title: 'EXPERIENCE - 4 SEATS LEFT',
    designation: 'Business Development Coaching',
    location: 'Liverpool, UK',
    time: '21/06/2021',
    image: require('../../Images/drink.png'),
  },
  {
    id: 2,
    title: 'JOBS - 0 APPLICANTS',
    designation: 'Associate Consultant',
    location: 'Beijing, China',
    time: '21/06/2021',
    image: require('../../Images/job-search.png'),
  },
  {
    id: 3,
    title: 'EXPERIENCES - COMPLETELY BOOKED',
    designation: 'Hydrogen Economy - Talk',
    location: 'Tokyo, Japan',
    time: '21/06/2021',
    image: require('../../Images/drink.png'),
  },
  {
    id: 4,
    title: 'COLLABORATION - ACCEPTING',
    designation: 'Net Zero Fuel Working Group',
    location: 'Banglore, India',
    time: '21/06/2021',
    image: require('../../Images/networking.png'),
  },
];

let topTabs = [
  {id: 0, title: 'Others'},
  {id: 1, title: 'Hot Match'},
];

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      selectedmatches: [],
      selectedTab: 0,
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

  renderHotMatchItem({item, index}) {
    return (
      <View style={{}}>
        <View style={styles.renderRow}>
          <View style={styles.renderTopView}>
            <View style={styles.rowImageCircle}>
              <Image source={item.image} style={styles.rowImage} />
            </View>
            <View style={styles.renderTopInnerView}>
              <Text style={styles.renderItemStyle}>{item.title}</Text>
              <Text style={styles.renderItemStyle}>{item.designation}</Text>
            </View>
            <TouchableOpacity>
              <Icon
                type={'Ionicons'}
                name={'share-social-outline'}
                style={styles.shareIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.renderBottomView}>
            <Text style={styles.renderItemStyle}>{item.location}</Text>
            <Text
              style={[
                styles.renderItemStyle,
                {marginLeft: windowWidth * 0.36},
              ]}>
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderOthersItem({item, index}) {
    return (
      <View style={{}}>
        <View style={styles.renderRow}>
          <View style={styles.renderTopView}>
            <View style={styles.rowImageCircle}>
              <Image source={item.image} style={styles.rowImage} />
            </View>
            <View style={styles.renderTopInnerView}>
              <Text style={styles.renderItemStyle}>{item.title}</Text>
              <Text style={styles.renderItemStyle}>{item.designation}</Text>
            </View>
            <TouchableOpacity>
              <Icon
                type={'Ionicons'}
                name={'share-social-outline'}
                style={styles.shareIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.renderBottomView}>
            <Text style={styles.renderItemStyle}>{item.location}</Text>
            <Text
              style={[
                styles.renderItemStyle,
                {marginLeft: windowWidth * 0.36},
              ]}>
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  async onSelectTab(res) {
    await this.setState({selectedTab: res.id}, () => {});
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
              <Text>FAVOURTIES</Text>
            </Header>
            <View style={styles.tabContainer}>
              {topTabs.map((res, i) => {
                return (
                  <TouchableOpacity
                    style={
                      this.state.selectedTab == res.id
                        ? styles.tabActive
                        : styles.tabInActive
                    }
                    onPress={this.onSelectTab.bind(this, res)}>
                    <Text
                      style={
                        this.state.selectedTab == res.id
                          ? styles.tabActiveText
                          : styles.tabInActiveText
                      }>
                      {res.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <ScrollView>
              <View>
                {this.state.selectedTab == 0 ? (
                  <FlatList
                    contentContainerStyle={{}}
                    data={OthersList}
                    renderItem={this.renderOthersItem.bind(this)}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                  />
                ) : (
                  <FlatList
                    contentContainerStyle={{}}
                    data={HotMatch}
                    renderItem={this.renderHotMatchItem.bind(this)}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                  />
                )}
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
)(Notifications);
