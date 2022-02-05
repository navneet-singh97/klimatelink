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

interface Props {
  hideBottomTab: any;
  navigation: any;
}
interface communitiesInfo {
  searchCommunity: any;
  filteredData: any;
}

class Communities extends Component<Props, communitiesInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchCommunity: '',
      filteredData: [],
      communities: [],
      showLoader: false,
    };
    console.disableYellowBox = true;
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    try {
      this.setState({showLoader: true});
      await this.props.getCommunities();
      if (this.props.communities) {
        this.setState({communities: this.props.communities.communities.result});
      }
      this.setState({showLoader: false});
    } catch (err) {
      console.log('componentDidMount_err_communities', err);
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.props.hideBottomTab(true);
  }

  _keyboardDidHide() {
    setTimeout(() => {
      this.props.hideBottomTab(false);
    }, 300);
  }

  async updateSearch(searchText) {
    this.setState({searchCommunity: searchText});
    let communnityText;
    let filteredData = this.state.communities.filter(function (item) {
      communnityText = item.name.toLowerCase();
      return communnityText.includes(searchText.toLowerCase());
    });

    await this.setState({filteredData: filteredData});
    await console.log('this.state.filteredData', this.state.filteredData);
  }

  onSelectedType(community) {
    //console.log('onSelectedType', community);
    this.props.navigation.push('CommunityInformation', {community:community});
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onSelectedType.bind(this, item)}
        style={styles.listImageView}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.listImageStyle}
          imageStyle={{borderRadius: windowWidth * 0.0196}}>
          {/* <Text style={styles.listTitleStyle}>{item.title}</Text> */}
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <View style={{flexDirection: 'column'}}>
              <SearchBar
                placeholder="Search Community"
                onChangeText={this.updateSearch.bind(this)}
                value={this.state.searchCommunity}
                inputStyle={{
                  fontFamily: 'CenturyGothic',
                  color: 'black',
                  fontSize: windowWidth * 0.0416,
                }}
                containerStyle={styles.searchBarContainer}
                round={false}
                inputContainerStyle={{
                  backgroundColor: 'white',
                }}
                lightTheme={true}
                onClear={() => {
                  Keyboard.dismiss();
                }}
                searchIcon={{size: windowWidth * 0.06}}
                clearIcon={{size: windowWidth * 0.06}}
              />
              {this.state.searchCommunity == ''
                ? null
                : this.state.filteredData.map((res, i) => {
                    return (
                      <View style={styles.filterList}>
                        <Text style={styles.filterListText}>{res.name}</Text>
                      </View>
                    );
                  })}
            </View>
            <FlatList
              contentContainerStyle={{paddingTop: windowWidth * 0.036}}
              numColumns={2}
              extraData={this.state.communities}
              data={this.state.communities}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={item => item.uid}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </SafeAreaView>
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
      </View>
    );
  }
}
export default connect(
  state => ({
    communities: state.communities,
  }),
  {getCommunities},
)(Communities);
