import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {color} from '../../theme';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const slides = [
  {
    id: 0,
    key: 'one',
    image: require('../../Images/appintro_1.png'),
    description:
      'Learn from experts, from entrepreneurs to  corporate leaders within Space Research, Energy Transition and Sustainable Finance',
    iconTitle: 'RECORD AUDIO',
    iconName: 'microphone',
    icontype: 'SimpleLineIcons',
  },
  {
    id: 1,
    key: 'two',
    image: require('../../Images/appintro_2.png'),
    description: 'Access exclusive Communities and Networks anytime, anywhere',
    iconTitle: 'SAVE AUDIO',
    iconName: 'save',
    icontype: 'MaterialIcons',
  },
  {
    id: 2,
    key: 'three',
    image: require('../../Images/appintro_3.png'),
    description:
      'Expand your network toconnect and build  meaningful relationship with industry experts  globally',
    iconTitle: 'SHARE AUDIO',
    iconName: 'share',
    icontype: 'MaterialIcons',
  },
  {
    id: 3,
    key: 'four',
    image: require('../../Images/appintro_4.png'),
    description: 'Be the influencer shaping the industry thought leadership.',
    iconTitle: 'SHARE AUDIO',
    iconName: 'share',
    icontype: 'MaterialIcons',
  },
];

class AppIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (
      Object.keys(this.props.user).length !== 0 &&
      this.props.user.constructor === Object
    ) {
      if (this.props.user !== undefined) {
        if (this.props.user.loginWithPhoneNum != undefined) {
          if (
            this.props.user.loginWithPhoneNum.message ==
            'POST Request successful.'
          ) {
            this.props.navigation.push('Main', {
              userId: this.props.user.loginWithPhoneNum.result.uid,
            });
          }
        }

        if (this.props.user.login != undefined) {
          if (this.props.user.login.message == 'POST Request successful.') {
            this.props.navigation.push('Main', {
              userId: this.props.user.login.result.uid,
            });
          }
        }

        if (this.props.user.register != undefined) {
          if (this.props.user.register.message == 'POST Request successful.') {
            this.props.navigation.push('Main', {
              userId: this.props.user.register.result.uid,
            });
          }
        }
      }
    }
  }

  onInitialSignUp() {
    this.props.navigation.push('SignUp');
  }

  onLogin() {
    this.props.navigation.push('Login');
  }

  listDescription(item) {
    return (
      <View style={styles.desBox}>
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </View>
    );
  }

  _renderItem = ({item}) => {
    return (
      <View style={styles.slideContainer}>
        <ImageBackground
          source={item.image}
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'cover',
          }}>
          <View
            style={{
              marginVertical: windowWidth * 0.06,
              marginTop: windowWidth * 0.1649,
            }}>
            {/* <Text style={styles.descriptionText}>{item.description}</Text> */}
            {this.listDescription(item)}
          </View>
        </ImageBackground>
      </View>
    );
  };

  _renderBottomButtons = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={styles.bottomButtonContainer}
          onPress={this.onInitialSignUp.bind(this)}>
          <Text style={styles.buttonTitle}>SIGNUP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButtonContainer,
            {backgroundColor: color.appGreen},
          ]}
          onPress={this.onLogin.bind(this)}>
          <Text style={[styles.buttonTitle, {color: color.text}]}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onDone() {
    this.props.navigation.push('Login');
  }

  onSkip() {
    this.props.navigation.push('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={color.primary} barStyle={'dark-content'} />
        <AppIntroSlider
          data={slides}
          renderItem={this._renderItem}
          renderDoneButton={this._renderBottomButtons}
          renderNextButton={this._renderBottomButtons}
          dotStyle={{backgroundColor: 'white'}}
          activeDotStyle={{backgroundColor: color.secondaryColor}}
          bottomButton={true}
          //onDone={this.onDone.bind(this)}
          //showDoneButton={false}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {},
)(AppIntro);
