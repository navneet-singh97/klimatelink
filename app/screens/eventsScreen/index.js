import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Keyboard,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {CardView} from './../../components/cardView';
import _ from 'lodash';

import styles from './styles';
import {SearchBar, Divider, colors} from 'react-native-elements';
import {color} from '../../theme';
import {Button} from '../../components/button';
import SafeAreaView from 'react-native-safe-area-view';
import {
  getCommunityEvents,
  getCommunityMember,
  getCommunityUserDeviceToken,
} from './../../redux/actions/communities';
import {connect} from 'react-redux';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EventsList = [
  {
    id: 0,
    time: '19:00',
    date: 'June 01',
    year: '2021',
    image: require('./../../Images/events/event_1.png'),
    price: '₹ 10000',
    address: '12 Member confirmed - BOOKING FULL',
    title: 'London Meetup',
    description: 'Charter House, Convent Garden...',
    imagesType: [
      {imgType: require('./../../Images/events/music.png')},
      {imgType: require('./../../Images/events/wifi.png')},
      {imgType: require('./../../Images/events/drinks.png')},
      {imgType: require('./../../Images/events/pizza.png')},
    ],
  },
  {
    id: 1,
    time: '21:00',
    date: 'July 16',
    year: '2021',
    image: require('./../../Images/events/event_2.png'),
    price: '₹ 60000',
    address: '12 Member confirmed - BOOKING FULL',
    title: 'United Kingdom Meetup',
    description: 'chapter house, London WC2E 8HH, United Kingdom',
    imagesType: [
      {imgType: require('./../../Images/events/music.png')},
      {imgType: require('./../../Images/events/wifi.png')},
      {imgType: require('./../../Images/events/drinks.png')},
      {imgType: require('./../../Images/events/pizza.png')},
    ],
  },
];

interface Props {}

interface evenState {
  searchEvent: any;
  filterEventList: any;
}

class EventsScreen extends Component<Props, evenState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchEvent: '',
      filterEventList: [],
      eventList: [],
      channelId: '',
    };
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    await this.props.getCommunityEvents();
    await this.props.getCommunityMember();
    let communityInformation = this.props.communities;
    await this.props.getCommunityUserDeviceToken(
      communityInformation.result?.uid,
    );
    const {communityEvents} = this.props.communities;
    if (
      communityEvents &&
      communityEvents.message == 'GET Request successful.'
    ) {
      this.setState({eventList: [...communityEvents.result]});
    }
    console.log(this.props.user, 'schvasjhcvasjcbhjsahjcas');
  }

  async updateSearch(searchText) {
    this.setState({searchEvent: searchText});

    let filteredData = this.state.eventList.filter(function (item) {
      let value = item.title.toLowerCase();
      return value.includes(searchText.toLowerCase());
    });

    await this.setState({filterEventList: filteredData});
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

    // console.log('this.state.communityMember', this.state.communityMember);

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
  }

  onBookings() {}
  renderItem({item}) {
    const dateTime = moment('2021-07-15T13:16:25.913')
      .format('MMMM Do YYYY, HH:mm A')
      .split(',');
    return (
      <View style={styles.eventsListContainer}>
        <View style={styles.eventsTopContainer}>
          <View style={styles.topLeftContainer}>
            <Text style={styles.timeText}>{dateTime[1]}</Text>
            <View>
              <Text style={styles.dateText}>{dateTime[0]}</Text>
            </View>
            <Text style={styles.priceText}>{item.cost}</Text>
          </View>
          <Image
            //resizeMode="contain"
            source={require('./../../Images/events/event_1.png')}
            style={styles.eventImg}
          />
        </View>
        <View style={styles.eventsCenterContainer}>
          <Text style={styles.addressText}>{item.description}</Text>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventTitle}>
            {item.venue}
            <Text style={styles.purpleDots}> ...</Text>
          </Text>
        </View>
        <View style={styles.eventsBottomContainer}>
          {/* <View style={styles.featuresContainer}>
            {item.imagesType.map((res, i) => {
              return (
                <View style={styles.featureImgContainer}>
                  <Image source={res.imgType} style={styles.featureImg} />
                </View>
              );
            })}
          </View> */}
          <Button buttonType="gradient" onPress={this.onBookings.bind(this)}>
            <Text style={styles.buttonText}>Booking</Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>EXPERIENCE</Header>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'column'}}>
                <SearchBar
                  placeholder="Type to search ..."
                  placeholderTextColor={color.textColor}
                  onChangeText={this.updateSearch.bind(this)}
                  value={this.state.searchEvent}
                  inputStyle={styles.searchBarInputStyle}
                  containerStyle={styles.searchBarContainer}
                  round={false}
                  inputContainerStyle={styles.searchBarInputContainer}
                  lightTheme={true}
                  onClear={() => {
                    Keyboard.dismiss();
                  }}
                  searchIcon={
                    <Icon
                      type="Ionicons"
                      name="search"
                      style={{
                        fontSize: windowWidth * 0.06,
                        color: 'white',
                        alignSef: 'flex-end',
                      }}
                    />
                  }
                />
                {/*this.state.searchCommunity == ""
              ? null
              : this.state.filteredData.map((res, i) => {
                  return (
                    <View style={styles.filterList}>
                      <Text style={styles.filterListText}>{res.title}</Text>
                    </View>
                  );
                })*/}
                {/* </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#7a7a7a',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                  alignSelf: 'center',
                  borderRadius: 10,
                }} onPress={()=>{
                  this.props.navigation.navigate('AgoraLivestream')
                }}>
                <Text style={{color: '#ffffff'}}>
                  Click to start live stream
                </Text>
              </TouchableOpacity>
              <View> */}

                <View>
                  <TextInput
                    onChangeText={text =>
                      this.setState({
                        channelId: text,
                      })
                    }
                    placeholder={'Channel Id'}
                    style={{
                      borderColor: 'black',
                      borderWidth: 1,
                      width: '90%',
                      color: 'black',
                      marginHorizontal: 20,
                      marginBottom: 10,
                    }}
                    placeholderTextColor={'black'}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#7a7a7a',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        alignSelf: 'center',
                        borderRadius: 10,
                      }}
                      onPress={this.onSelectLiveStream.bind(this, 'Start')}>
                      <Text style={{color: '#ffffff'}}>
                        Click to start live stream
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#7a7a7a',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        alignSelf: 'center',
                        borderRadius: 10,
                      }}
                      onPress={this.onSelectLiveStream.bind(this, 'Join')}>
                      <Text style={{color: '#ffffff'}}>Join Live Stream</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <FlatList
                  contentContainerStyle={{paddingBottom: 160}}
                  data={
                    this.state.searchEvent == ''
                      ? this.state.eventList
                      : this.state.filterEventList
                  }
                  renderItem={this.renderItem.bind(this)}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={true}
                />
              </View>
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
  {getCommunityEvents, getCommunityMember, getCommunityUserDeviceToken},
)(EventsScreen);
