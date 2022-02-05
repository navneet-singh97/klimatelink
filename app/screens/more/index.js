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
} from 'react-native';
import styles from './styles';
import {getCommunities} from './../../redux/actions/communities';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import AnimatedLoader from 'react-native-animated-loader';

import {color} from '../../theme';
import {Icon} from 'native-base';
import {SearchBar} from 'react-native-elements';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MoreList = [
  {
    title: 'Opportunities',
    description: 'Exclusive jobs and partner opportunity',
    image: require('./../../Images/moreImages/job.png'),
  },
  {
    title: 'Library',
    description: 'Video, Podcast and Blogs',
    image: require('./../../Images/moreImages/multimedia.png'),
  },
  {
    title: 'Notification',
    description: 'Get Updates on all activities',
    image: require('./../../Images/moreImages/notification.png'),
  },
  {
    title: 'Favorite',
    description: 'Your Favourites in one place',
    image: require('./../../Images/moreImages/favorite.png'),
  },
  {
    title: 'Search',
    description: 'Search all app contents',
    image: require('./../../Images/moreImages/search.png'),
  },
  {
    title: 'Account',
    description: 'Update Account details',
    image: require('./../../Images/moreImages/settings.png'),
  },
];

class More extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCommunity: '',
      filteredData: [],
      communities: [],
      showLoader: false,
      selectedItem: '',
    };
    console.disableYellowBox = true;
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    try {
      console.log('this.props.....123', this.props.user);
    } catch (err) {}
  }

  // componentWillMount() {
  //   this.keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     this._keyboardDidShow.bind(this),
  //   );
  //   this.keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     this._keyboardDidHide.bind(this),
  //   );
  // }

  // componentWillUnmount() {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }

  // _keyboardDidShow() {
  //   this.props.hideBottomTab(true);
  // }

  // _keyboardDidHide() {
  //   setTimeout(() => {
  //     this.props.hideBottomTab(false);
  //   }, 300);
  // }

  onSelectedType(value) {
    this.setState({selectedItem: value.title});
    if (value.title == 'Opportunities') {
      this.props.navigation.push('Jobs', {});
    } else if (value.title == 'Library') {
      this.props.navigation.push('Library', {});
    } else if (value.title == 'Notification') {
      this.props.navigation.push('Notifications', {});
    } else if (value.title == 'Favorite') {
      this.props.navigation.push('Favourites', {});
    } else if (value.title == 'Search') {
      this.props.navigation.push('ContentFormScreen', {});
    } else if (value.title == 'Account') {
      this.props.navigation.push('Account', {user: this.props.user});
    }
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onSelectedType.bind(this, item)}
        style={styles.gridView}>
        {/* <View style={styles.insideCrossView}></View> */}
        <View style={styles.gridContent}>
          <View style={styles.moreIconView}>
            <Image source={item.image} style={styles.moreIcons} />
          </View>
          <Text style={styles.moreTitle}>{item.title}</Text>
          <Text style={styles.moreDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View>{}</View>
          <View style={styles.container}>
            <View style={styles.inviteView}>
              <Text style={styles.inviteTitle}>
                Invite friends. Get free Tokens!
              </Text>
              <View style={styles.inviteInnerView}>
                <Text style={styles.inviteDescription}>
                  Earn tokens for every invite.
                </Text>
                <TouchableOpacity style={styles.inviteButton}>
                  <Text style={styles.getStarted}>Coming Soon</Text>
                </TouchableOpacity>
              </View>
            </View>
            <FlatList
              contentContainerStyle={{}}
              numColumns={2}
              //extraData={this.state.communities}
              data={MoreList}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={item => item.uid}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
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
    );
  }
}
export default connect(
  state => ({
    communities: state.communities,
  }),
  {getCommunities},
)(More);
