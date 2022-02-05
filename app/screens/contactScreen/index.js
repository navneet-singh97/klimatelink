import React, {Component} from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {CardView} from './../../components/cardView';
import {Divider} from 'react-native-elements';
import _ from 'lodash';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import {color} from '../../theme';
import {getContactDetails} from './../../redux/actions/communities';
import {connect} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const list = [
  {type: 'Ratings', value: '4.7/5'},
  {type: 'Events', value: '2'},
  {type: 'Likes', value: '300'},
];

interface Props {}

class ContactScreen extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      communityTitle: '',
      name: '',
      community: '',
      likes: 0,
      email: '',
      list: [],
      profilePic: '',
    };
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    try {
      this.setState({communityTitle: this.props.route.params.communityTitle});
      const {communityInformation} = this.props.communities;
      await this.props.getContactDetails(communityInformation.result.uid);
      const {contactDetails} = this.props.communities;
      if (
        contactDetails &&
        contactDetails.message == 'GET Request successful.'
      ) {
        const {result} = contactDetails;
        var list = [
          {type: 'Ratings', value: result.rating},
          {type: 'Events', value: result.totalEvents},
          {type: 'Likes', value: '0'},
        ];
        this.setState({
          community: result.communityName,
          email: result.contactEmail,
          name: result.name,
          list,
          profilePic: result.profilePic,
        });
      }
    } catch (err) {}
  }

  render() {
    //const { navigate } = this.props
    console.log('resultresultprofilePic', this.state.profilePic);
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>CONTACT</Header>
            <View style={styles.container}>
              {this.state.profilePic !== '' ? (
                <Image
                  source={{uri: this.state.profilePic}}
                  style={styles.contactImg}
                />
              ) : (
                <Image
                  source={require('./../../Images/user_placeholder.png')}
                  style={styles.contactImg}
                />
              )}

              <View style={styles.subContainer}>
                <ScrollView>
                  <View style={styles.topContainer}>
                    <Text style={styles.title}>{this.state.name}</Text>
                    <Text style={styles.subTitle}>
                      {this.state.communityTitle}
                    </Text>
                  </View>

                  <View style={styles.centerContainer}>
                    {this.state.list.map((res, i) => {
                      return (
                        <View style={styles.centerSubContainer}>
                          <Text style={styles.valueText}>{res.value}</Text>
                          <Text style={styles.typeText}>{res.type}</Text>
                        </View>
                      );
                    })}
                  </View>

                  <View style={styles.bottomContainer}>
                    <Text style={styles.title}>CONTACT</Text>
                    <Text style={styles.subTitle}>{this.state.email}</Text>
                  </View>
                </ScrollView>
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
  }),
  {getContactDetails},
)(ContactScreen);
