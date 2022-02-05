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
import {getSubscriptions} from '../../redux/actions/payments';
import {color} from './../../theme';
import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Input, Button} from 'react-native-elements';
import {toUpper} from 'lodash';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {ScrollView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let subscriptionList = [
  {
    id: 0,
    title: 'Freemium',
    amount: '£ 0',
    description: 'Lorem Ipsum has been the industrys standard dummy text ',
  },
  {
    id: 1,
    title: 'Premium',
    amount: '£ 10',
    description: 'Lorem Ipsum has been the industrys standard dummy text',
  },
];

class ContactAndHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubscriptionId: null,
      subscriptionList: [],
      subscriptionType: '',
    };
  }

  async componentDidMount() {
    await this.props.getSubscriptions();
    if (this.props.payments != undefined) {
      if (
        this.props.payments.subscriptionsList.message ==
        'GET Request successful.'
      ) {
        this.setState({
          subscriptionList: this.props.payments.subscriptionsList.result,
        });
      }
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  onSubmit() {
    this.props.navigation.push('Main', {
      userId: this.props.route.params.userId,
    });
  }

  onSelectMultiButton(item) {
    if (this.state.selectedSubscriptionId == item.uid) {
      this.setState({selectedSubscriptionId: null});
    } else {
      this.setState({
        selectedSubscriptionId: item.uid,
        subscriptionType: item.subscriptionName,
      });
    }
  }

  renderItem({item}) {
    console.log('item_123', item);
    var count = 0;
    var showActive;

    if (this.state.selectedSubscriptionId == item.uid) {
      showActive = true;
    } else {
      showActive = false;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onSelectMultiButton.bind(this, item)}
        style={{
          backgroundColor: 'white',
          borderRadius: windowWidth * 0.036,
          padding: windowWidth * 0.036,
          marginBottom: windowWidth * 0.06,
          borderWidth: showActive ? 1.6 : 0,
          borderColor: color.secondaryColor,
        }}>
        {showActive ? (
          <Icon
            type="MaterialCommunityIcons"
            name="checkbox-marked"
            style={{fontSize: windowWidth * 0.06, color: color.secondaryColor}}
          />
        ) : null}

        <View
          style={{
            flexDirection: 'column',
            marginVertical: windowWidth * 0.0136,
          }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              borderRadius: windowWidth * 0.0316,
            }}>
            <Text style={styles.rowTitle}>{item.subscriptionName}</Text>
            <Text style={styles.amountText}>
              {item.currency}
              {item.amount}
              <Text style={styles.perMonthText}> / {item.duration}</Text>
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column',
              marginLeft: windowWidth * 0.036,
            }}>
            <Text style={styles.rowDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={{}}></View>
          <View style={{flex: 1, backgroundColor: color.greyBg}}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>CONTACT & HELP</Text>
            </Header>
            <View style={styles.container}>
              <Text style={styles.commonGreyTitle}>COMING SOON ...</Text>
            </View>
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
    payments: state.payments,
  }),
  {},
)(ContactAndHelp);
