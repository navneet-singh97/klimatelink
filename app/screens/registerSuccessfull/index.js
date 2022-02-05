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
import {connect} from 'react-redux';
import {isUserRegistered} from '../../redux/actions/user';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let keyboard;
let pins;
let pinArray = [];

let backAsset = '⌫';

interface Props {}

class RegisterSuccessfull extends Component<Props> {
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

  async onProceed() {
    let userId;
    let userIntegerId;
    try {
      if (this.props.route.params.navigateFrom == 'SignUp Screen' || this.props.route.params.navigateFrom == "Social Login") {
        userId = this.props.user.register.result.uid;
        userIntegerId = this.props.user.register.result.id;
      } else {
        userId = this.props.user.loginWithPhoneNum.result.uid;
        userIntegerId = this.props.user.loginWithPhoneNum.result.id;
      }

      await this.props.isUserRegistered(true);
      await this.props.navigation.push('PersonaliseGoalAndSkills', {
        navigateFrom: 'RegisterSuccessScreen',
        userId: userId,
        userIntegerId: userIntegerId,
      });
    } catch (err) {
      console.log('RegisterSuccessfull_err', err);
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.appGreen,
        }}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          {/* <Header onLeftPress={this.onLeft.bind(this)} transparent></Header> */}
          <View style={styles.subContainer}>
            <Avatar
              rounded
              source={require('../../Images/userImage.jpg')}
              size={windowWidth * 0.1999}
              containerStyle={{
                alignSelf: 'center',
                borderColor: 'white',
                borderWidth: 1,
                marginTop: windowWidth * 0.36,
              }}
            />
            <Text style={styles.welcomeText}>Welcome</Text>
            {/* <Text style={styles.welcomeText}>Mr. Madan Prasad</Text> */}
            <Text style={styles.descText}>
              Your Account was Created Successfully
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={this.onProceed.bind(this)}>
              <Text style={styles.buttonText}>PROCEED</Text>
            </TouchableOpacity>
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
  {isUserRegistered},
)(RegisterSuccessfull);
