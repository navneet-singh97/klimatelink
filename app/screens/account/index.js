import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SectionList,
  Dimensions,
} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import {connect} from 'react-redux';
import {Header} from '../../components/header';
import SafeAreaView from 'react-native-safe-area-view';
import {signOut} from '../../redux/actions/user';
import {color} from '../../theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DATA = [
  {
    title: 'Personal Details',
    data: ['Edit Public Profile', 'Edit Account Details'],
  },
  {
    title: 'My Subscription',
    data: ['Subscribe', 'Reedem voucher card'],
  },
  {
    title: 'My Account',
    data: ['Change Password', 'Sign Out', 'Contact & Help', 'Delete Account'],
  },
];

class Account extends Component {
  constructor() {
    super();
    this.state = {
      generalView: true,
      settingsView: false,
      user: {},
      userName: '',
    };
  }

  componentDidMount() {
    // console.log('klklkk', this.props.route.params.user);

    try {
      const userDetails = this.props.route.params.user;
      let user = {};
      if(userDetails.editProfile){
        user = userDetails.editProfile;
      }
      else if (userDetails.loginWithPhoneNum) {
        user = userDetails.loginWithPhoneNum;
      } else if (userDetails.register) {
        user = userDetails.register;
      } else {
        user = userDetails.login;
      }
      this.setState({user}, () => {
        console.log('account_user_results', this.state.user);
        this.setState({
          userName:
            this.state.user.result.firstName +
            ' ' +
            this.state.user.result.lastName,
        });
      });
    } catch (err) {
      console.log('account_didmout_err', err);
    }
  }

  toggleTriangle = view => {
    if (view == 'general') {
      this.setState({generalView: true, settingsView: false});
    } else {
      this.setState({generalView: false, settingsView: true});
    }
  };

  async manageNavigation(value) {
    const {user} = this.state;
    if (value == 'Edit Public Profile') {
      this.props.navigation.push('EditProfile_V1', {
        user: user,
        isSocialLogin: false,
      });
    } else if (value == 'Edit Account Details') {
      this.props.navigation.push('EditAccountDetails', {user});
    } else if (value == 'Subscribe') {
      this.props.navigation.push('PersonaliseSubscriptions');
    } else if (value == 'Reedem voucher card') {
      // alert('navigate to Reedem voucher card');
    } else if (value == 'Change Password') {
      // alert('navigate to Change Password');
      this.props.navigation.push('ResetPassword', {
        phoneNumber: user.result.phoneNumber,
      });
    } else if (value == 'Sign Out') {
      Alert.alert(
        'ClimateLink',
        'Are you sure you want to sign out?',
        [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            onPress: () => this.SignOutUser(),
          },
        ],
        {cancelable: true},
      );
    } else if (value == 'Contact & Help') {
      this.props.navigation.push('ContactAndHelp');
    } else if (value == 'Delete Account') {
      // alert('navigate to Delete Account');
    }
  }

  async SignOutUser() {
    try {
      //console.log('navigation_123456', this.props);
      await this.props.signOut();
      await this.props.navigation.push('OnBoarding');
      let guid = this.props.user.userUId;
      let userCommunities = this.props.user.userCommunities;
      // (async () => {
         userCommunities.forEach(element => {
          database()
            .ref(`Group/${element.uid}/${guid}`)
            .set({userId: guid, isOnline: false})
            .then(data => {
              //success callback
              console.log('data ', data);
            })
            .catch(error => {
              //error callback
              console.log('error ', error);
            });
        });
    } catch (err) {
      console.log('SignOutUser_123456', this.props);
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  async onUpdateMatch() {
    // console.log('onUpdateMatch', this.state.user.result.uid);
    this.props.navigation.push('PersonaliseGoalAndSkills', {
      navigateFrom: 'Account',
      userId: this.state.user.result.uid,
      userIntegerId: this.state.user.result.id,
    });
  }

  renderItem({item}) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginBottom: 4,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={this.manageNavigation.bind(this, item)}>
          <Text style={styles.listContent}>{item}</Text>
          <Icon
            type="Ionicons"
            name={'caret-forward-outline'}
            style={{fontSize: 16}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>ACCOUNT</Text>
            </Header>
            <View style={styles.buttonView}>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.toggleTriangle('general');
                  }}>
                  <Text
                    style={[
                      this.state.generalView
                        ? styles.orangeText
                        : styles.whiteText,
                    ]}>
                    GENERAL
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    this.state.generalView
                      ? styles.triangleView
                      : styles.triangleViewHidden
                  }
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.toggleTriangle('setting')}>
                  <Text
                    style={[
                      this.state.settingsView
                        ? styles.orangeText
                        : styles.whiteText,
                    ]}>
                    SETTINGS
                  </Text>
                </TouchableOpacity>
                <View
                  style={
                    this.state.settingsView
                      ? styles.triangleView
                      : styles.triangleViewHidden
                  }
                />
              </View>
            </View>
            {this.state.generalView ? (
              <View style={{flex: 1}}>
                <View style={styles.planView}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.title}>{this.state.userName}</Text>
                    <Text style={styles.currentPlan}>
                      Current Membership Plan:
                    </Text>
                    <Text style={[styles.access, {marginTop: 12}]}>
                      Freemium Access
                    </Text>
                    <TouchableOpacity style={styles.freeTrialBtn}>
                      <Text style={[styles.greenText, {}]}>
                        START FREE TRIAL
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.border} />
                </View>
                <View style={styles.planView}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.title}>Personalise Content</Text>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 12,
                      }}>
                      <Text style={[styles.access, {marginBottom: 4}]}>
                        Great! You've answered all our
                      </Text>
                      <Text style={[styles.access, {marginBottom: 4}]}>
                        questions, your ClimateLink
                      </Text>
                      <Text style={[styles.access, {marginBottom: 4}]}>
                        experience has been matched to
                      </Text>
                      <Text style={styles.access}>
                        things that are relevant to your needs.
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.freeTrialBtn}
                      onPress={this.onUpdateMatch.bind(this)}>
                      <Text style={[styles.greenText, {}]}>
                        UPDATE YOUR MATCH
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.border} />
                </View>
              </View>
            ) : (
              <View
                style={{
                  paddingHorizontal: 20,
                  flex: 1,
                }}>
                <SectionList
                  sections={DATA}
                  keyExtractor={(item, index) => item + index}
                  renderItem={this.renderItem.bind(this)}
                  renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.listHeader}>{title}</Text>
                  )}
                />
              </View>
            )}
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
  {signOut},
)(Account);
