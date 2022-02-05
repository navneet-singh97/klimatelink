import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {getData} from '../../redux/actions/initial';
import {color} from './../../theme';
import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Input, Button} from 'react-native-elements';
import {toUpper} from 'lodash';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {ScrollView} from 'react-native';
import {Divider, SearchBar, Avatar, Badge} from 'react-native-elements';
// import {Dropdown} from 'react-native-material-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Dropdown} from 'react-native-material-dropdown-v2';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let _menu = null;
let _menuContent = null;
let _menuTime = null;
let _menuFormat = null;

let resultChallenges = [
  {
    id: 0,
    title: 'Green Funding Challenge - Financial Analyst',
    experience: '4-5 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'London,UK',
    job: 'Voluntary',
  },
  {
    id: 1,
    title: 'Energy Market Challenge - Blockchain Analyst',
    experience: '4-5 years of experience',
    role: 'Smart Contract, Confidential Computing',
    location: 'London,UK',
    job: '£3500 - £8000',
  },
  {
    id: 2,
    title: 'Energy Market Challenge - Blockchain Analyst',
    experience: '4-5 years of experience',
    role: 'Smart Contract, Confidential Computing',
    location: 'London,UK',
    job: '£3500 - £8000',
  },
  {
    id: 3,
    title: 'Green Funding Challenge - Financial Analyst',
    experience: '4-5 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'London,UK',
    job: 'Voluntary',
  },
];

let peopleType = [
  {
    value: 'Experts',
  },
  {
    value: 'Mentor',
  },
  {
    value: 'Community Leader',
  },
];

let formatType = [
  {
    value: 'Video',
  },
  {
    value: 'Podcast',
  },
  {
    value: 'Events',
  },
];

let contentType = [
  {
    value: 'Beginner',
  },
  {
    value: 'Intermediate',
  },
  {
    value: 'Expert',
  },
];

let timeType = [
  {
    value: '10 Mins',
  },
  {
    value: '15 Mins',
  },
  ,
  {
    value: '20 Mins',
  },
  {
    value: '25 Mins',
  },
];

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communitiesList: ['Farming', 'Soil', 'Fuel', 'e-Waste', 'Space'],
      selectedChallenges: [],
      challengeType: '',
      searchValue: '',
      shape: '',
      peopleTypeValue: 'Experts',
      contentValue: 'Beginner',
      timeValue: '15 Mins',
      formatValue: 'Video',
    };
    _menu = null;
    _menuContent = null;
    _menuTime = null;
    _menuFormat = null;
  }

  setMenuRef = ref => {
    this._menu = ref;
  };

  setMenuRefContent = ref => {
    this._menuContent = ref;
  };
  setMenuRefTime = ref => {
    this._menuTime = ref;
  };

  setMenuRefFormat = ref => {
    this._menuFormat = ref;
  };

  componentDidMount() {}

  onLeft() {
    this.props.navigation.goBack();
  }

  onSubmit() {}

  onSelectMultiButton(item) {
    this.setState({challengeType: item});
    let count = 0;
    if (this.state.selectedChallenges.length == 0) {
      this.state.selectedChallenges.push(item);
    } else {
      this.state.selectedChallenges.map((res, i) => {
        if (item == res) {
          this.state.selectedChallenges.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedChallenges.push(item);
      }
    }
    this.setState({selectedChallenges: this.state.selectedChallenges});
    console.log('this.state.selectedChallenges', this.state.selectedChallenges);
  }

  renderItem({item}) {
    var count = 0;
    var showActive = false;

    this.state.selectedChallenges.map((res, i) => {
      if (res == item) {
        showActive = true;
        count = count + 1;
      }
      if (count === 0) {
        showActive = false;
      }
    });
    return (
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginLeft: windowWidth * 0.0136,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            borderWidth: 1,
            borderColor: showActive ? color.blackText : color.paleYellow,
            borderRadius: windowWidth * 0.0136,
            margin: windowWidth * 0.0136,
            backgroundColor: showActive ? color.blackText : color.paleYellow,
          }}
          onPress={this.onSelectMultiButton.bind(this, item)}>
          <Text
            style={[
              styles.multiBtnText,
              {
                color: showActive ? color.textColor : color.appGreen,
              },
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  updateSearch(searchText) {
    this.setState({searchValue: searchText});

    // let filteredData = searchMembersList.filter(function (item) {
    //   let value = item.title.toLowerCase();
    //   return value.includes(searchText.toLowerCase());
    // });

    // await this.setState({filterSearchList: filteredData});
  }

  onSelectedPeople(menuItem) {
    this._menu.hide();

    this.setState({peopleTypeValue: menuItem.value});
  }

  onSelectedContent(menuItem) {
    this._menuContent.hide();
    this.setState({contentValue: menuItem.value});
  }

  onSelectedTime(menuItem) {
    this._menuTime.hide();
    this.setState({timeValue: menuItem.value});
  }

  onSelectedFormat(menuItem) {
    this._menuFormat.hide();
    this.setState({formatValue: menuItem.value});
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        {/* <Header onLeftPress={this.onLeft.bind(this)}>
          <Text>CONTENT FORM</Text>
        </Header> */}
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>CONTENT</Text>
            </Header>

            <ScrollView style={{flex: 1}}>
              <View style={styles.container}>
                <View style={styles.topContainer}>
                  <SearchBar
                    placeholder="Type to search..."
                    onChangeText={this.updateSearch.bind(this)}
                    value={this.state.searchValue}
                    placeholderTextColor="white"
                    inputStyle={{
                      fontFamily: 'CenturyGothic',
                      color: 'white',
                    }}
                    containerStyle={styles.searchBarContainer}
                    round={false}
                    inputContainerStyle={{
                      backgroundColor: color.secondaryColor,
                      borderWidth: 0,
                      borderBottomWidth: 0,
                      borderRadius: windowWidth * 0.06,
                    }}
                    lightTheme={true}
                    onClear={() => {
                      Keyboard.dismiss();
                    }}
                    searchIcon={{
                      size: windowWidth * 0.06,
                      color: 'white',
                      alignSelf: 'flex-end',
                    }}
                    clearIcon={{size: windowWidth * 0.06, color: 'white'}}
                  />
                </View>
                <View style={styles.bottomContainer}>
                  <View style={styles.boxView}>
                    <Text style={styles.commonBlackTitle}>Communities</Text>
                    <FlatList
                      contentContainerStyle={{paddingTop: windowWidth * 0.0136}}
                      data={this.state.communitiesList}
                      extraData={this.state}
                      renderItem={this.renderItem.bind(this)}
                      keyExtractor={item => item}
                      numColumns={4}
                    />

                    <View style={{marginTop: windowWidth * 0.06}}>
                      <Input
                        label="Experience"
                        placeholder="Enter city name"
                        labelStyle={[
                          styles.inputLabel,
                          {marginLeft: windowWidth * 0.006},
                        ]}
                        containerStyle={{borderWidth: 0}}
                        inputContainerStyle={[
                          styles.inputContainer,
                          {width: windowWidth / 1.196},
                        ]}
                        inputStyle={[
                          styles.inputStyle,
                          {
                            marginLeft: windowWidth * 0.01946,
                          },
                        ]}
                        onChangeText={value => this.setState({password: value})}
                        secureTextEntry={this.state.showPassword}
                      />
                      <Text style={styles.inputLabel}>People Type</Text>
                      <View style={{flexDirection: 'row'}}>
                        <Dropdown
                          label=""
                          data={peopleType}
                          lineWidth={0}
                          value={this.state.peopleTypeValue}
                          right={this.renderAccessory()}
                          containerStyle={{
                            width: windowWidth / 1.296,
                            marginLeft: windowWidth * 0.0316,
                          }}
                          fontSize={windowWidth * 0.0416}
                          inputContainerStyle={{
                            fontSize: windowWidth * 0.0416,
                            fontFamily: 'CenturyGothic',
                            borderBottomWidth: 0,
                          }}
                          placeholderTextColor={'grey'}
                          baseColor={'black'}
                          itemTextStyle={{
                            fontSize: windowWidth * 0.0416,
                            fontFamily: 'CenturyGothic',
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            width: windowWidth / 1.196,
                            height: windowWidth * 0.136,
                          }}
                          fontSize={windowWidth * 0.0416}
                        />
                        {this.renderAccessory()}
                      </View>

                      <View style={styles.sepDropdown}>
                        <View style={{flex: 0.5, flexDirection: 'column'}}>
                          <Text style={styles.inputLabel}>Content</Text>
                          <View style={{flexDirection: 'row'}}>
                            <Dropdown
                              label=""
                              data={contentType}
                              lineWidth={0}
                              value={this.state.contentValue}
                              right={this.renderAccessory()}
                              containerStyle={{
                                width: windowWidth / 3.16,
                                marginLeft: windowWidth * 0.036,
                              }}
                              fontSize={windowWidth * 0.0416}
                              inputContainerStyle={{
                                fontSize: windowWidth * 0.0416,
                                fontFamily: 'CenturyGothic',
                                borderBottomWidth: 0,
                              }}
                              placeholderTextColor={'grey'}
                              baseColor={'black'}
                              itemTextStyle={{
                                fontSize: windowWidth * 0.0416,
                                //fontFamily: 'CenturyGothic',
                              }}
                              style={{
                                backgroundColor: 'transparent',
                                width: windowWidth / 2.6,
                                height: windowWidth * 0.136,
                                marginRight: windowWidth * 0.06,
                              }}
                            />
                            {this.renderAccessory()}
                          </View>
                        </View>
                        <View style={{flex: 0.5, flexDirection: 'column'}}>
                          <Text style={styles.inputLabel}>Time</Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginLeft: windowWidth * 0.01649,
                            }}>
                            <Dropdown
                              label=""
                              data={timeType}
                              value={this.state.timeValue}
                              right={this.renderAccessory()}
                              containerStyle={{
                                width: windowWidth / 3,
                              }}
                              fontSize={windowWidth * 0.0416}
                              inputContainerStyle={{
                                fontSize: windowWidth * 0.0416,
                                fontFamily: 'CenturyGothic',
                                borderBottomWidth: 0,
                              }}
                              placeholderTextColor={'grey'}
                              baseColor={'black'}
                              itemTextStyle={{
                                fontSize: windowWidth * 0.0416,
                                //fontFamily: 'CenturyGothic',
                              }}
                              useNativeDriver={true}
                              inputContainerStyle={{
                                borderBottomColor: 'transparent',
                              }}
                              style={{
                                backgroundColor: 'transparent',
                                width: windowWidth / 2.6,
                                height: windowWidth * 0.136,
                              }}
                            />
                            {this.renderAccessory()}
                          </View>
                        </View>
                      </View>

                      <Text
                        style={[
                          styles.inputLabel,
                          {marginTop: windowWidth * 0.036},
                        ]}>
                        Format
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Dropdown
                          label=""
                          data={formatType}
                          lineWidth={0}
                          value={this.state.formatValue}
                          right={this.renderAccessory()}
                          containerStyle={{
                            width: windowWidth / 1.296,
                            marginLeft: windowWidth * 0.0316,
                          }}
                          fontSize={windowWidth * 0.0416}
                          inputContainerStyle={{
                            fontSize: windowWidth * 0.0416,
                            fontFamily: 'CenturyGothic',
                            borderBottomWidth: 0,
                          }}
                          placeholderTextColor={'grey'}
                          baseColor={'black'}
                          itemTextStyle={{
                            fontSize: windowWidth * 0.0416,
                            //fontFamily: 'CenturyGothic',
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            width: windowWidth / 1.196,
                            height: windowWidth * 0.136,
                          }}
                        />
                        {this.renderAccessory()}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
  onChangeHandler = value => {
    alert(value);
    console.log(`Selected value: ${value}`);
  };
  renderAccessory() {
    return (
      <Icon
        type="MaterialIcons"
        name="arrow-drop-down"
        style={styles.dropdownArrow}
      />
    );
  }
}
export default connect(
  state => ({
    initial: state,
  }),
  {},
)(Challenge);
