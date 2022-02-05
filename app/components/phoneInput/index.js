import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
// native base imports
import {Container, Item, Input, Icon} from 'native-base';
import {color} from '../../theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import data from './Countries';

// Default render of country flag
const defaultFlag = data.filter(obj => obj.name === 'India')[0].flag;
interface Props {
  phoneNumber: any;
  value: any;
  updatePhNo: any;
}

export default class PhoneInput extends Component<Props> {
  state = {
    flag: defaultFlag,
    modalVisible: false,
    phoneNumber: this.props.phoneNumber,
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  showModal() {
    this.setState({modalVisible: true});
  }
  hideModal() {
    this.setState({modalVisible: false});
    // Refocus on the Input field after selecting the country code
    this.refs.PhoneInput._root.focus();
  }

  async getCountry(country) {
    const countryData = await data;
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country,
      )[0].dial_code;
      const countryFlag = await countryData.filter(
        obj => obj.name === country,
      )[0].flag;
      // Set data from user choice of country
      this.setState({phoneNumber: countryCode, flag: countryFlag});
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let {flag} = this.state;
    const countryData = data;
    var defaultCode = '+91';
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            marginHorizontal: windowWidth * 0.06,
            borderBottomWidth: 2.1,
            borderColor: color.lineColor,
          }}>
          <Input
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#adb4bc"
            keyboardType={'phone-pad'}
            // returnKeyType="done"
            // autoCapitalize="none"
            // autoCorrect={false}
            // secureTextEntry={false}
            ref="PhoneInput"
            value={this.state.phoneNumber}
            onChangeText={async val => {
              if (this.state.phoneNumber === '') {
                // render UK phone code by default when Modal is not open
                await this.onChangeText('phoneNumber', defaultCode + val);
                await this.props.updatePhNo(this.state.phoneNumber);
              } else {
                // render country code based on users choice with Modal
                await this.onChangeText('phoneNumber', val);
                await this.props.updatePhNo(this.state.phoneNumber);
              }
            }}
          />
          <TouchableOpacity
            onPress={() => this.showModal()}
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              marginTop: windowWidth * 0.03,
              marginRight: windowWidth * 0.0316,
            }}>
            <Text
              style={{
                fontSize: windowWidth * 0.06,
                marginLeft: windowWidth * 0.06,
              }}>
              {flag}
            </Text>
            <Icon
              active
              name="arrow-drop-down"
              type="MaterialIcons"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide" // fade
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                paddingTop: windowWidth * 0.016,
                backgroundColor: 'white',
              }}>
              <FlatList
                data={countryData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => this.getCountry(item.name)}>
                    <View
                      style={[
                        styles.countryStyle,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        },
                      ]}>
                      <Text style={styles.countryText}>
                        {item.name} ({item.dial_code})
                      </Text>
                      <Text style={{fontSize: windowWidth * 0.06}}>
                        {item.flag}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.hideModal()}
              style={styles.closeButtonStyle}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // justifyContent: "center",
    // flexDirection: "row",
  },
  input: {
    fontFamily: 'CenturyGothic',
    color: 'black',
    minHeight: 44,
    fontSize: windowWidth * 0.0416,
    // marginHorizontal: windowWidth * 0.06,
    borderBottomWidth: 0,
    borderColor: color.lineColor,
    padding: windowWidth * 0.0206,
    marginTop: windowWidth * 0.03,
    marginLeft: windowWidth * 0.0106,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#5059ae',
  },
  itemStyle: {
    // marginBottom: 10,
  },
  iconStyle: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.076,
    marginLeft: windowWidth * 0.006,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#b44666',
    padding: 14,
    marginBottom: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  textStyle: {
    fontSize: windowWidth * 0.046,
    color: color.textColor,
    fontFamily: 'CenturyGothic-Bold',
  },
  countryStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: color.lightGrey,
    borderBottomWidth: 0.6,
    padding: windowWidth * 0.036,
  },
  countryText: {
    fontSize: windowWidth * 0.036,
    color: color.blackText,
    fontFamily: 'CenturyGothic',
  },
  closeButtonStyle: {
    height: windowWidth * 0.16,
    width: windowWidth,
    padding: windowWidth * 0.036,
    alignItems: 'center',
    backgroundColor: color.primary,
    marginBottom: -windowWidth * 0.0016,
  },
});
