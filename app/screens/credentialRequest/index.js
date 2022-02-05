import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {Icon, Switch} from 'native-base';
import {Header} from '../../components/header';
import {Button} from './../../components/button';
import {TextField} from './../../components/textInput';
import _ from 'lodash';
import styles from './styles';
import {color} from '../../theme';
import {Divider} from 'react-native-elements';
import {SuccessModal} from './../../components/successModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const credentialRequestList = [
  {Id: 0, type: 'Uniflow Software'},
  {Id: 0, type: 'First Name : Sandeep'},
  {Id: 1, type: 'Last Name : Krishnappa'},
  {Id: 2, type: 'Desigination : Senior Transformation Advisor'},
  {Id: 3, type: 'Start Date : 05/05/2018'},
  {Id: 4, type: 'End Date : 05/05/2019'},
  {Id: 5, type: 'Employee ID : 854535598'},
  {Id: 6, type: 'Salary : 40L'},
];

const validateList = [
  // {
  //   id: 0,
  //   title: "Uniflow Software",
  //   description: "",
  //   validationError: false,
  // },
  {
    id: 1,
    title: 'First Name : Sandeep',
    description: '',
    validationError: false,
  },
  {
    id: 2,
    title: 'Last Name : Krishnappa',
    description: '',
    validationError: false,
  },
  {
    id: 3,
    title: 'Desigination : Senior Transformation Advisor',
    description: '',
    validationError: false,
  },
  {
    id: 4,
    title: 'Start Date : 05/05/2018',
    description: '',
    validationError: false,
  },
  {
    id: 5,
    title: 'End Date : 05/05/2019',
    description: '',
    validationError: false,
  },
  {id: 6, title: 'Salary : 40L', description: '', validationError: false},
];

interface Props {}
interface stateValidate {
  isSelectValidate: any;
  selectedList: any;
  switchValue: any;
  notes: any;
  validationList: any;
  enableAcceptButton: any;
  sentSuccessModal: any;
}

class CredentialRequest extends Component<Props, stateValidate> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSelectValidate: false,
      selectedList: [],
      switchValue: false,
      notes: '',
      validationList: validateList,
      enableAcceptButton: false,
      sentSuccessModal: false,
    };
  }
  onLeft() {
    if (this.state.isSelectValidate == true) {
      this.setState({isSelectValidate: false});
    } else {
      this.props.navigation.goBack();
    }
  }

  onDoneSuccessModal() {
    this.setState({sentSuccessModal: false}, () => {
      setTimeout(() => {
        this.props.navigation.push('Main');
      }, 1000);
    });
  }

  onValidAccept() {
    this.setState({isSelectValidate: true});
  }

  onSelect(item) {
    let count = 0;
    if (this.state.selectedList.length == 0) {
      this.state.selectedList.push({
        id: item.id,
        title: item.title,
        description: item.description,
        validationError: true,
      });
      item.validationError = true;
    } else {
      this.state.selectedList.map((res, i) => {
        if (item.id == res.id) {
          item.description = '';
          item.validationError = false;
          this.state.selectedList.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedList.push({
          id: item.id,
          title: item.title,
          description: item.description,
          validationError: true,
        });
        item.validationError = true;
      }
    }
    this.setState({selectedList: this.state.selectedList}, () => {
      if (_.includes(this.state.selectedList, true) == true) {
        this.setState({enableAcceptButton: false});
      } else if (this.state.selectedList.length == 0) {
        this.setState({enableAcceptButton: true});
      } else if (_.includes(this.state.selectedList, true) == false) {
        this.setState({enableAcceptButton: false});
      }
    });
    console.log('enableAcceptButton', this.state.enableAcceptButton);
    console.log(
      'this.state.selectedList',
      JSON.stringify(this.state.selectedList),
    );
    //console.log("changeValidateList", this.state.validationList);
  }

  renderItem({item, index, separators}) {
    var count = 0;
    var showCheck;

    this.state.selectedList.map((res, i) => {
      if (res.id == item.id) {
        showCheck = true;
        count = count + 1;
      }
      if (count === 0) {
        showCheck = false;
      }
    });
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            flex: 7,
            flexDirection: 'column',
            marginBottom: windowWidth * 0.06,
          }}>
          <Text style={styles.vcListText}>{item.title}</Text>
          {showCheck ? (
            <View>
              <Text style={styles.errorText}>Error Identified</Text>
              <TextField
                placeholder={'Please write the description'}
                inputStyle={{fontSize: windowWidth * 0.036}}
                onChangeText={text => {
                  this._onChangeText(text, index);
                }}
                value={item.description}
              />
            </View>
          ) : null}
        </TouchableOpacity>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={
              this.state.switchValue ? this.onSelect.bind(this, item) : null
            }>
            <Icon
              type="Ionicons"
              name={
                !showCheck
                  ? 'ios-checkmark-circle-outline'
                  : 'ios-close-circle-outline'
              }
              style={{
                fontSize: windowWidth * 0.069,
                color: !showCheck ? '#39b54a' : '#f15a24',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          {!this.state.switchValue ? (
            <TouchableOpacity>
              <Icon
                type="Ionicons"
                name="ios-close-circle-outline"
                style={{
                  fontSize: windowWidth * 0.069,
                  color: '#f15a24',
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }

  _onChangeText(text, index) {
    console.log('text:', text);
    this.state.validationList[index].description = text;
    this.setState({
      validationList: this.state.validationList,
    });
  }

  toggleSwitch() {
    this.setState({switchValue: !this.state.switchValue}, () => {
      if (this.state.switchValue) {
        this.setState({enableAcceptButton: true});
      } else {
        this.setState({enableAcceptButton: false, selectedList: []});
      }
    });
  }

  onAccept() {
    if (
      this.state.switchValue == false &&
      this.state.enableAcceptButton == false
    ) {
      Alert.alert(
        'Consent',
        'Please enable switch to validate',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (
      this.state.switchValue == true &&
      this.state.enableAcceptButton == false
    ) {
      Alert.alert(
        'Consent',
        'Please fill the valid details',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (
      this.state.switchValue == true &&
      this.state.enableAcceptButton == true
    ) {
      this.setState({sentSuccessModal: true});
      //this.props.navigation.push("SscVcStatus");
    }

    console.log('resultArray', this.state.validationList);
    console.log(
      'resultArray',
      this.state.switchValue + '......' + this.state.enableAcceptButton,
    );
  }

  onDecline() {
    this.setState({isSelectValidate: false});
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <Header onLeftPress={this.onLeft.bind(this)}>
          {!this.state.isSelectValidate
            ? 'New Credential Request'
            : 'Credential Validation'}
        </Header>
        <View style={styles.mainContainer}>
          {!this.state.isSelectValidate ? (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: windowWidth * 0.16,
              }}>
              <View style={styles.emailFormatContainer}>
                <View style={styles.emailFormatTopContainer}>
                  <View>
                    <Text style={styles.emailLightText}>
                      From: contact@uniflow.in
                    </Text>
                    <Text style={styles.emailLightText}>
                      Contact: +44 8088880888
                    </Text>
                  </View>
                  <Text style={styles.timeText}>Today @12:45PM</Text>
                </View>
                <View style={styles.mailContentContainer}>
                  <Text style={styles.emailLightText}>
                    Hi please find your credentials from HR...
                  </Text>
                </View>
              </View>
              {/* <View style={styles.emailFormatContainer}>
                <View style={styles.emailFormatTopContainer}>
                  <View>
                    <Text style={styles.emailDarkText}>
                      From: raja@university.com
                    </Text>
                    <Text style={styles.emailDarkText}>
                      Contact: +91 8080889999
                    </Text>
                  </View>
                  <Text style={styles.timeText}>Today @1:30PM</Text>
                </View>
                <View style={styles.mailContentContainer}>
                  <Text style={styles.emailDarkText}>
                    Dear Requester, Lorem ipsum the copy and info here is a
                    dummy text and the
                  </Text>
                </View>
              </View> */}
              <Divider />
              <View style={styles.sscCreatedContainer}>
                <Text style={styles.sscCreatedText}>Credential Generated</Text>
              </View>
              <View style={{}}>
                {credentialRequestList.map((res, i) => {
                  return <Text style={styles.generateText}>{res.type}</Text>;
                })}
              </View>
              <Divider style={{marginTop: windowWidth * 0.096}} />
              <Button
                // buttonType="gradient"
                style={styles.enableButton}
                onPress={this.onValidAccept.bind(this)}>
                <Text style={styles.enableButtonText}>VALIDATE & ACCEPT</Text>
              </Button>
            </ScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: windowWidth * 0.16,
              }}>
              <View style={styles.sscCreatedContainer}>
                <Text style={styles.sscCreatedText}>
                  Verifiable Credentials
                </Text>
              </View>
              <Divider />
              <View style={styles.vcContentContainer}>
                <Text style={styles.vcSubTitle}>
                  Please validate all the detailed entered below are correct as
                  per your documents before accepting
                </Text>
              </View>
              <Divider />
              <View style={styles.switchContainer}>
                <Text
                  style={{
                    fontFamily: 'CenturyGothic-Bold',
                    fontSize: windowWidth * 0.036,
                  }}>
                  Enable Switch to Validate All
                </Text>
                <Switch
                  trackColor={{false: '#767577', true: '#767577'}}
                  thumbColor={this.state.switchValue ? '#39b54a' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.toggleSwitch.bind(this)}
                  value={this.state.switchValue}
                />
              </View>
              <Divider />
              <View style={{paddingTop: windowWidth * 0.06}}>
                <FlatList
                  data={this.state.validationList}
                  extraData={this.state}
                  renderItem={this.renderItem.bind(this)}
                />
              </View>
              <View>
                <Divider />
                {!this.state.enableAcceptButton && this.state.switchValue ? (
                  <View style={styles.notesContainer}>
                    <Text style={styles.noteHeader}>Notes</Text>
                    <Divider />
                    <TextField
                      inputStyle={{marginTop: windowWidth * 0.046}}
                      placeholder={'Notes'}
                      onChangeText={value => this.setState({notes: value})}
                      maxLength={30}
                    />
                    <Text style={styles.notesText}>
                      {this.state.notes.length} / 30
                    </Text>
                  </View>
                ) : null}
              </View>

              <Button
                style={
                  this.state.enableAcceptButton
                    ? styles.enableButton
                    : styles.button
                }
                onPress={
                  this.state.enableAcceptButton
                    ? this.onAccept.bind(this)
                    : null
                }>
                <Text
                  style={
                    this.state.enableAcceptButton
                      ? styles.enableButtonText
                      : styles.buttonText
                  }>
                  ACCEPT
                </Text>
              </Button>
              <Button
                style={
                  !this.state.enableAcceptButton
                    ? styles.enableButton
                    : styles.button
                }
                onPress={this.onDecline.bind(this)}>
                <Text
                  style={
                    !this.state.enableAcceptButton
                      ? styles.enableButtonText
                      : styles.buttonText
                  }>
                  DECLINE
                </Text>
              </Button>
            </ScrollView>
          )}
        </View>
        <SuccessModal
          isVisible={this.state.sentSuccessModal}
          centerText={
            'Your Employment VC generation process has been completed successfully'
          }
          onPress={this.onDoneSuccessModal.bind(this)}
        />
      </View>
    );
  }
}

export default CredentialRequest;
