import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SectionList,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getPersonaliseCategory,
  sendUserPersonalityCategory,
} from '../../redux/actions/user';
import {color} from './../../theme';
import styles from './styles';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {ScrollView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

qualificationList = [
  {id: 0, name: '4 Years Experience in digital transformation'},
  {id: 1, name: 'Certified in climate finance or green bond'},
  {id: 2, name: '6 Years Experience in Hydrogen Economy'},
  {id: 3, name: 'Certified in climate finance or green Amonia'},
];

class JobExpressInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHandActive: false,
    };
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log('JobExpressInterest_screen_err', err);
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: color.appGreen,
            height: windowHeight,
          }}
          forceInset={{bottom: 'never'}}>
          <View style={{}}></View>
          <View style={{flex: 1, backgroundColor: color.background}}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>JOBS</Text>
            </Header>
            <ScrollView>
              <View style={{flex: 1}}>
                <View style={styles.topContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.suitCaseBox}>
                      <Image
                        source={require('../../Images/moreImages/job.png')}
                        style={styles.suitCase}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: windowWidth * 0.036,
                      }}>
                      <Text style={styles.subTitle}>
                        Sustainability Director
                      </Text>
                      <Text style={styles.subTitle}>London, Remote</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: windowWidth * 0.06,
                    }}>
                    <TouchableOpacity style={styles.topButton}>
                      <Text style={styles.topButtonText}>Full time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.topButton,
                        {backgroundColor: color.background},
                      ]}>
                      <Text
                        style={[styles.topButtonText, {color: color.appGreen}]}>
                        Global
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={[styles.topButtonText, {color: color.blackText}]}>
                      £ 6000/Monthly
                    </Text>
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <View style={{padding: windowWidth * 0.036}}>
                    <Text style={styles.infoSubTitle}>About the job</Text>
                    <Text style={styles.infoDescription}>
                      The Group Sustainability Director will report to the Group
                      Strategy Director with focus on the integration of the
                      Sustainability Strategy into our 31 Regional Businesses.
                      Primarily this role is to continue to develop, manage and
                      implement the Group’s Sustainability Strategy thus
                      contributing to future direction, change and improvement
                      within the Group.
                    </Text>
                  </View>
                  <View style={{padding: windowWidth * 0.036, paddingTop: 0}}>
                    <Text style={styles.infoSubTitle}>
                      Minimum Qualification
                    </Text>

                    {qualificationList.map((res, i) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginBottom: windowWidth * 0.0316,
                          }}>
                          <View style={styles.dot} />

                          <Text style={styles.qualificationText}>
                            {res.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      this.setState({isHandActive: !this.state.isHandActive});
                    }}>
                    <View style={{flex: 0.7, alignItems: 'flex-end'}}>
                      <Text style={styles.buttonText}>Express Interest</Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Icon
                        type={'Ionicons'}
                        name={'hand-right-sharp'}
                        style={
                          this.state.isHandActive
                            ? styles.handImageActive
                            : styles.handImage
                        }
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
export default connect(
  state => ({
    initial: state,
    user: state.user,
  }),
  {getPersonaliseCategory, sendUserPersonalityCategory},
)(JobExpressInterest);
