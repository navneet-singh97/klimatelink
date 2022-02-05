import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {getData} from '../../redux/actions/initial';
import styles from './styles';
// import { LinearGradient } from "expo-linear-gradient";
import {Header} from './../../components/header';
import {OtpInput} from './../../components/otpInput';
import {Icon, Item, Picker} from 'native-base';
import {PinInput, PinKeyboard} from 'react-native-awesome-pin';
import {color} from '../../theme';
import {TextField} from './../../components/textInput';
import {Avatar} from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let keyboard;
let pins;
let pinArray = [];

let backAsset = '⌫';

interface Props {}

class PinScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      secureText: true,
      pinInputValue: '',
      enterdPin: 0,
      showKeyBoard: false,
    };
  }

  componentDidMount() {}
  onLeft() {
    this.props.navigation.goBack();
  }

  async onSecure() {
    if (this.state.secureText === true) {
      await this.setState({secureText: false});
      console.log('if');
    } else {
      await this.setState({secureText: true});
      console.log('else');
    }
  }

  keyDown(pin) {
    if (
      pin != backAsset &&
      pin != '⌫' &&
      pin !== 'Done' &&
      pinArray.length != 4
    ) {
      let array = pinArray.push(pin);
    } else if (pin == '⌫') {
      let removeValue = pinArray.pop();
      this.setState({enteredPin: removeValue});
    } else if (pin == 'Done') {
      this.setState({showKeyBoard: false});
      if (pinArray.length == 4) {
        this.props.navigation.navigate('Main');
      } else {
        alert('Please enter 4 digit Pin');
      }
    }

    this.setState({enteredPin: pinArray.join('')});
    // console.log("result___123", this.state.enteredPin);
  }

  onInput() {
    if (this.state.showKeyBoard == true) {
      this.setState({showKeyBoard: false});
    } else {
      this.setState({showKeyBoard: true});
    }
  }

  render() {
    //const { navigate } = this.props

    console.log('pinInputValue', this.state.pinInputValue);
    console.log('Array', pinArray);
    console.log('pinInputValue', this.state.enteredPin);

    return (
      <LinearGradient
        start={{x: 0.0, y: 0.6}}
        end={{x: 0.6, y: 0.0}}
        locations={[0, 0.5, 1]}
        //colors={["#c63894", "#d9465c", "#f58559"]}
        colors={[color.primary, color.primary, color.primary]}
        style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <Header onLeftPress={this.onLeft.bind(this)} transparent></Header>
          <View style={styles.subContainer}>
            <Avatar
              rounded
              source={require('../../Images/userImage.jpg')}
              size={windowWidth * 0.1999}
              containerStyle={{
                alignSelf: 'center',
                borderColor: 'white',
                borderWidth: 1,
                marginBottom: windowWidth * 0.016,
              }}
            />
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.welcomeText}>Mr. Madan Prasad</Text>

            <View
              style={{
                flexDirection: 'column',
                // paddingVertical: windowWidth * 0.01,
                paddingHorizontal: windowWidth * 0.031,
                borderRadius: windowWidth * 0.09,
                backgroundColor: 'white',
                marginTop: windowWidth * 0.13,
                width: windowWidth * 0.536,
                alignSelf: 'center',
              }}>
              {this.state.secureText ? (
                <View style={{height: windowWidth * 0.151}}>
                  <TextInput
                    placeholder={'1234'}
                    value={this.state.enteredPin}
                    style={{
                      height: windowWidth * 0.151,
                      fontSize: windowWidth * 0.041,
                      fontFamily: 'CenturyGothic-Bold',
                      //textAlign: "center",
                      //backgroundColor: "pink",
                      borderColor: 'blue',
                      paddingLeft: windowWidth * 0.04,
                    }}
                    autoFocus={false}
                    keyboardType={'numeric'}
                    spellCheck={false}
                    showSoftInputOnFocus={false}
                    //autoCorrect={false}
                    letterSpacing={windowWidth * 0.079}
                    maxLength={4}
                    underlineColorAndroid="transparent"
                    onChangeText={value => this.setState({enteredPin: value})}
                    onTouchStart={this.onInput.bind(this)}
                  />
                </View>
              ) : (
                <TouchableOpacity onPress={this.onInput.bind(this)}>
                  <PinInput
                    onRef={ref => (pins = ref)}
                    numberOfPins={4}
                    numberOfPinsActive={pinArray.length}
                    pinStyle={{
                      backgroundColor: color.lightGrey,
                      borderColor: color.lightGrey,
                      borderWidth: 0,
                      opacity: 0.6,
                      height: windowWidth * 0.03,
                      width: windowWidth * 0.03,
                    }}
                    pinActiveStyle={{
                      backgroundColor: 'black',
                      borderColor: 'black',
                      borderWidth: 1,
                      opacity: 1,
                      height: windowWidth * 0.03,
                      width: windowWidth * 0.03,
                    }}
                    containerStyle={{
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 1,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity onPress={this.onSecure.bind(this)}>
              <Icon
                type="Feather"
                name={this.state.secureText ? 'eye' : 'eye-off'}
                style={{
                  fontSize: windowWidth * 0.079,
                  color: color.text,
                  alignSelf: 'center',
                  marginTop: windowWidth * 0.03,
                  marginBottom: windowWidth * 0.0963,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: windowWidth * 0.036,
                color: color.text,
                fontFamily: 'CenturyGothic',
                alignSelf: 'center',
              }}>
              Use Fingerprint or Enter Passcode
            </Text>
            <Image
              resizeMode="contain"
              source={require('../../Images/whiteConsentLogo.png')}
              style={{
                height: windowWidth * 0.2416,
                width: windowWidth * 0.2416,
                alignSelf: 'center',
                marginTop: windowWidth * 0.096,
              }}
            />
            <Text
              style={{
                fontSize: windowWidth * 0.0416,
                color: color.text,
                fontFamily: 'CenturyGothic-Bold',
                alignSelf: 'center',
                marginTop: windowWidth * 0.069,
              }}>
              FORGOT PIN
            </Text>
          </View>
          {this.state.showKeyBoard == true ? (
            <PinKeyboard
              onRef={ref => (this.keyboard = ref)}
              keyDown={this.keyDown.bind(this)}
              keyboard={[
                [1, 2, 3, backAsset],
                [4, 5, 6, null],
                [7, 8, 9, null],
                [null, 0, null, 'Done'],
              ]}
            />
          ) : null}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
export default PinScreen;
