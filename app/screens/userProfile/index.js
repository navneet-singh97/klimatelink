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
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import {Dropdown} from 'react-native-material-dropdown-v2';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let _menuYears = null;
let _menuMonths = null;

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

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengesList: [
        'Analyst',
        'Finance',
        'Volunteer',
        'Tech',
        'London',
        'Blockchain',
      ],
      selectedChallenges: [],
      challengeType: '',
      expYears: '3 Years',
      expMonths: '5 Months',
      isSelected: false,
      totalYears: [],
      totalMonths: [],
    };
    _menuYears = null;
    _menuMonths = null;
  }

  setMenuRefYears = ref => {
    this._menuYears = ref;
  };

  setMenuRefMonths = ref => {
    this._menuMonths = ref;
  };

  onSelectedYear(menuItem) {
    this._menuYears.hide();
    this.setState({expYears: menuItem.value});
  }

  onSelectedMonth(menuItem) {
    this._menuMonths.hide();
    this.setState({expMonths: menuItem.value});
  }

  renderAccessory() {
    return (
      <Icon
        type="MaterialIcons"
        name="arrow-drop-down"
        style={styles.dropdownArrow}
      />
    );
  }

  onCheckBox(value) {
    this.setState({isSelected: value});
    if (this.state.isSelected == true) {
      this.setState({isSelected: false});
    } else {
      this.setState({isSelected: true});
    }
    //alert(value);
  }

  componentDidMount() {
    let totalYears = [];
    let totalMonths = [];
    for (let i = 1; i <= 60; i++) {
      totalYears.push({value: i + ' ' + 'Years'});
    }
    for (let i = 1; i <= 12; i++) {
      totalMonths.push({value: i + ' ' + 'Months'});
    }
    //console.log('totalYears', totalYears);
    this.setState({totalYears: totalYears, totalMonths: totalMonths});
  }

  onLeft() {}

  onSubmit() {}

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        {/* <Header onLeftPress={this.onLeft.bind(this)}>
          <Text>PROFILE</Text>
        </Header> */}
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.topContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  // alignItems: 'flex-start',
                  justifyContent: 'space-around',
                  marginTop: windowWidth * 0.06,
                  marginHorizontal: windowWidth * 0.06,
                }}>
                <Image
                  source={require('../../Images/userImage.jpg')}
                  style={{
                    width: windowWidth * 0.163,
                    height: windowWidth * 0.163,
                    borderRadius: (windowWidth * 0.163) / 2,
                    marginRight: windowWidth * 0.06,
                  }}
                />
                <View>
                  <Text style={styles.commonBlackTitle}>Daisy Atkins </Text>
                  <Text style={styles.subTitle}>
                    Sustainable Finance Analyst
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <Text style={styles.shortText}>Climate Policy</Text>
                      <Text style={styles.shortText}>- £4500</Text>
                    </View>
                    <View>
                      <Text style={styles.shortText}>
                        - 3.5 Year Experience
                      </Text>
                      <Text style={styles.shortText}>London, UK</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View
                style={{
                  minHeight: windowHeight / 1.36,
                  width: windowWidth - 30,
                  backgroundColor: 'white',
                  marginTop: -windowWidth * 0.2496,
                  alignSelf: 'center',
                  marginBottom: windowWidth * 0.096,
                  borderWidth: 4.36,
                  borderColor: '#316392',
                  borderRadius: windowWidth * 0.036,
                  paddingTop: windowWidth * 0.06,
                }}>
                <Input
                  label="Contact Details"
                  placeholder="Daisy@gmail.com"
                  labelStyle={styles.inputLabel}
                  containerStyle={{borderWidth: 0}}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  onChangeText={value => this.setState({password: value})}
                  secureTextEntry={this.state.showPassword}
                />
                <Input
                  label="Location"
                  placeholder="London UK"
                  labelStyle={styles.inputLabel}
                  containerStyle={{borderWidth: 0}}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  onChangeText={value => this.setState({password: value})}
                  secureTextEntry={this.state.showPassword}
                />
                <Input
                  label="Introduction Headline"
                  placeholder="Looking for changes on fiancial model"
                  labelStyle={styles.inputLabel}
                  containerStyle={{borderWidth: 0}}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  onChangeText={value => this.setState({password: value})}
                  secureTextEntry={this.state.showPassword}
                />
                <Input
                  label="Profile Summary"
                  placeholder="Please reach out if you need any help"
                  labelStyle={styles.inputLabel}
                  containerStyle={{borderWidth: 0}}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  onChangeText={value => this.setState({password: value})}
                  secureTextEntry={this.state.showPassword}
                />
                <Text
                  style={[
                    styles.inputStyle,
                    {
                      marginLeft: windowWidth * 0.036,
                      marginBottom: -windowWidth * 0.036,
                    },
                  ]}>
                  Experience
                </Text>

                <View style={styles.sepDropdown}>
                  <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <Dropdown
                      label=""
                      data={this.state.totalYears}
                      lineWidth={0}
                      value={this.state.expYears}
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
                        backgroundColor: 'white',
                        width: windowWidth / 2.6,
                        height: windowWidth * 0.136,
                        marginRight: windowWidth * 0.06,
                      }}
                    />
                    {this.renderAccessory()}
                  </View>
                  <View style={{flex: 0.5, flexDirection: 'row'}}>
                    <Dropdown
                      label=""
                      data={this.state.totalMonths}
                      value={this.state.expMonths}
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
                      inputContainerStyle={{borderBottomColor: 'transparent'}}
                      style={{
                        backgroundColor: 'white',
                        width: windowWidth / 2.6,
                        height: windowWidth * 0.136,
                      }}
                    />
                    {this.renderAccessory()}
                  </View>
                </View>
                <Text
                  style={[
                    styles.inputStyle,
                    {
                      marginLeft: windowWidth * 0.036,
                      marginTop: windowWidth * 0.0416,
                    },
                  ]}>
                  Online Portfolio
                </Text>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{flexDirection: 'row', margin: windowWidth * 0.036}}
                  onPress={this.onCheckBox.bind(this)}>
                  <Icon
                    type="MaterialCommunityIcons"
                    name={
                      this.state.isSelected == false
                        ? 'checkbox-blank-circle-outline'
                        : 'checkbox-marked-circle'
                    }
                    style={[
                      styles.checkBox,
                      {
                        color:
                          this.state.isSelected == false
                            ? 'grey'
                            : color.secondaryColor,
                      },
                    ]}
                  />

                  <Text style={styles.checkBoxText}>
                    I consent to share my profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default connect(
  state => ({
    initial: state,
  }),
  {},
)(Challenge);
