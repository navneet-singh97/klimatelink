import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import {TextField} from '../../components/textInput';
import {DocsImagePicker} from '../../components/docsImagePicker';
import {CollapsibleView} from '../../components/collapsibleView';
import {Header} from '../../components/header';
import {Button} from '../../components/button';
import {SuccessModal} from '../../components/successModal';
import {color} from '../../theme';
import styles from './styles';
import {Divider} from 'react-native-elements';
// import * as ImagePicker from "expo-image-picker";
// import { Camera } from "expo-camera";
// import * as Permissions from "expo-permissions";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {connect} from 'react-redux';
import {onEmploymentVc} from './../../redux/actions/certificates';
import user from '../../redux/reducers/user';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  navigation: any;
  onEmploymentVc: any;
}
interface employmentState {
  personalDetails: any;
  fullName: any;
  showDocuments: any;
  isSelected: any;
  showData: any;
  companyName: any;
  address: any;
  pinCode: any;
  date: any;
  notes: any;
  employmentImage: any;
  relievingLetterImage: any;
  PreviewAndSend: any;
  sentSuccessModal: any;
  fullNameError: any;
  companyNameError: any;
  addressError: any;
  pinCodeError: any;
  dateError: any;
  notesError: any;
  extraScrollHeight: any;
}

class EmploymentVc extends Component<Props, employmentState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      personalDetails: false,
      fullName: '',
      showDocuments: false,
      isSelected: false,
      showData: false,
      companyName: '',
      address: '',
      pinCode: '',
      date: '',
      notes: '',
      employmentImage: '',
      relievingLetterImage: '',
      PreviewAndSend: false,
      sentSuccessModal: false,
      fullNameError: '',
      companyNameError: '',
      addressError: '',
      pinCodeError: '',
      dateError: '',
      notesError: '',
      extraScrollHeight: windowWidth * 0.416,
    };
  }

  onLeft() {
    if (this.state.PreviewAndSend == true) {
      this.setState({PreviewAndSend: false});
    } else {
      this.props.navigation.goBack();
    }
  }

  onCheckBox() {
    this.setState({isSelected: !this.state.isSelected}, () => {
      if (this.state.isSelected == false) {
        this.setState({
          companyName: '',
          address: '',
          pinCode: '',
          date: '',
          notes: '',
        });
      }
    });
  }

  onPreview() {
    if (this.state.fullName == '') {
      this.setState({fullNameError: 'Please enter full name'});
    } else if (this.state.isSelected == true) {
      if (this.state.fullName != '') {
        this.setState({fullNameError: ''});
      }
      if (
        this.state.companyName == '' ||
        this.state.address == '' ||
        this.state.pinCode == '' ||
        this.state.date == '' ||
        this.state.notes == ''
      ) {
        if (this.state.companyName == '') {
          this.setState({companyNameError: 'Please enter company name'});
        } else {
          this.setState({companyNameError: ''});
        }
        if (this.state.address == '') {
          this.setState({addressError: 'Please enter address'});
        } else {
          this.setState({addressError: ''});
        }
        if (this.state.pinCode == '') {
          this.setState({pinCodeError: 'Please enter pincode'});
        } else {
          this.setState({pinCodeError: ''});
        }
        if (this.state.date == '') {
          this.setState({dateError: 'Please enter date'});
        } else {
          this.setState({dateError: ''});
        }
        if (this.state.notes == '') {
          this.setState({notesError: 'Please enter notes'});
        } else {
          this.setState({notesError: ''});
        }
      } else {
        this.setState({
          PreviewAndSend: true,
          fullNameError: '',
          companyNameError: '',
          addressError: '',
          pinCodeError: '',
          dateError: '',
          notesError: '',
        });
      }
    } else {
      this.setState({
        PreviewAndSend: true,
        fullNameError: '',
      });
    }
  }

  onSave() {}

  onSend() {
    let employmentInfo = {
      fullName: this.state.fullName,
      isSelected: this.state.isSelected,
      companyName: this.state.companyName,
      address: this.state.address,
      pinCode: this.state.pinCode,
      date: this.state.date,
      notes: this.state.notes,
    };
    this.props.onEmploymentVc(employmentInfo);
    this.setState({sentSuccessModal: true});
  }

  async selectImagePicker(type) {
    try {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          console.log('result_123', result);
          if (type == 'onEmploymentDoc') {
            this.setState({employmentImage: result.uri});
          } else {
            this.setState({relievingLetterImage: result.uri});
          }
        }
      }
    } catch (ImagePickerError) {
      console.log('imagePicker', ImagePickerError);
    }
  }

  onEmploymentDoc() {
    this.selectImagePicker('onEmploymentDoc');
  }

  onRelievingLetter() {
    this.selectImagePicker('onRelievingLetter');
  }

  onDoneSuccessModal() {
    this.setState({sentSuccessModal: false});
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <Header onLeftPress={this.onLeft.bind(this)}>
          <Text>Employment VC</Text>
        </Header>
        <View>
          {!this.state.PreviewAndSend ? (
            <KeyboardAwareScrollView
              extraScrollHeight={this.state.extraScrollHeight}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled">
              <View
                style={
                  this.state.personalDetails
                    ? styles.personalDetailsContainer
                    : null
                }>
                <CollapsibleView
                  label="Personal Details"
                  labelStyle={styles.collapsibleLabel}
                  iconActive={this.state.personalDetails ? true : false}
                  onPress={() => {
                    this.setState({
                      personalDetails: !this.state.personalDetails,
                    });
                  }}
                />
                {this.state.personalDetails ? (
                  <TextField
                    inputStyle={styles.inputStyle}
                    placeholder={'Full Name as per Document'}
                    value={this.state.fullName}
                    onChangeText={value => this.setState({fullName: value})}
                    errorMessage={this.state.fullNameError}
                  />
                ) : null}
              </View>
              <View
                style={
                  this.state.showDocuments ? styles.documentsContainer : null
                }>
                <Divider />
                <CollapsibleView
                  label="Documents"
                  labelStyle={styles.collapsibleLabel}
                  iconActive={this.state.showDocuments ? true : false}
                  onPress={() => {
                    this.setState({
                      showDocuments: !this.state.showDocuments,
                    });
                  }}
                />
                {this.state.showDocuments ? (
                  <View style={styles.docSubContainer}>
                    {!this.state.isSelected ? (
                      <View>
                        <DocsImagePicker
                          label="Employment Document"
                          style={{marginBottom: windowWidth * 0.06}}
                          onPress={this.onEmploymentDoc.bind(this)}
                        />
                        <DocsImagePicker
                          label="Relieving Letter"
                          onPress={this.onRelievingLetter.bind(this)}
                        />
                      </View>
                    ) : null}

                    <TouchableOpacity
                      activeOpacity={1}
                      style={
                        this.state.isSelected
                          ? styles.selectcheckBoxContainer
                          : styles.checkBoxContainer
                      }
                      onPress={this.onCheckBox.bind(this)}>
                      <Icon
                        type="MaterialIcons"
                        name={
                          this.state.isSelected == false
                            ? 'check-box-outline-blank'
                            : 'check-box'
                        }
                        style={[
                          styles.checkBox,
                          {
                            color:
                              this.state.isSelected == false ? 'grey' : 'black',
                          },
                        ]}
                      />

                      <Text style={styles.checkBoxText}>
                        If No Documents Available
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                <Divider />
              </View>
              <View>
                {this.state.isSelected ? (
                  <View
                    style={
                      this.state.showData ? styles.documentsContainer : null
                    }>
                    <Divider />
                    <CollapsibleView
                      label="Data"
                      labelStyle={styles.collapsibleLabel}
                      iconActive={this.state.showData ? true : false}
                      onPress={() => {
                        this.setState({
                          showData: !this.state.showData,
                        });
                      }}
                    />
                    {this.state.showData ? (
                      <View style={{paddingBottom: windowWidth * 0.06}}>
                        <TextField
                          inputStyle={styles.dataInputStyle}
                          placeholder={'Company Name'}
                          value={this.state.companyName}
                          onChangeText={value =>
                            this.setState({companyName: value})
                          }
                          errorMessage={this.state.companyNameError}
                        />
                        <TextField
                          inputStyle={styles.dataInputStyle}
                          placeholder={'Address'}
                          value={this.state.address}
                          onChangeText={value =>
                            this.setState({address: value})
                          }
                          errorMessage={this.state.addressError}
                        />
                        <TextField
                          inputStyle={styles.dataInputStyle}
                          placeholder={'Pin Code'}
                          value={this.state.pinCode}
                          onChangeText={value =>
                            this.setState({pinCode: value})
                          }
                          errorMessage={this.state.pinCodeError}
                          onFocus={() => {
                            this.setState({
                              extraScrollHeight: windowWidth * 0.516,
                            });
                          }}
                        />
                        <DatePicker
                          style={styles.datePicker}
                          allowFontScaling={false}
                          date={this.state.date}
                          mode="date"
                          placeholder="Date"
                          format={'DD/MM/YYYY'}
                          //minDate={moment().format("DD-MM-YYYY")}
                          maxDate={moment().format('DD/MM/YYYY')}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          showIcon={false}
                          onDateChange={date => {
                            console.log('DD-MM-YYYY:', date);
                            this.setState({date: date});
                          }}
                          customStyles={{
                            dateText: {
                              color: 'black',
                              fontSize: windowWidth * 0.0416,
                              fontFamily: 'CenturyGothic',
                            },
                            placeholderText: {
                              color: color.lightGrey,
                              fontSize: windowWidth * 0.0416,
                              fontFamily: 'CenturyGothic',
                            },
                            dateInput: styles.datePickerInput,
                          }}></DatePicker>
                        {this.state.dateError != '' ? (
                          <Text style={styles.errorTextStyle}>
                            {this.state.dateError}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                    <Divider />
                    <View style={{}}>
                      {this.state.showData ? (
                        <View
                          style={
                            this.state.showData ? styles.notesContainer : null
                          }>
                          <Text style={styles.noteHeader}>Notes</Text>
                          <Divider />
                          <TextField
                            inputStyle={styles.notesInputStyle}
                            placeholder={'Notes'}
                            value={this.state.notes}
                            onChangeText={value =>
                              this.setState({notes: value})
                            }
                            maxLength={30}
                            errorMessage={this.state.notesError}
                            onFocus={() => {
                              this.setState({
                                extraScrollHeight: windowWidth * 0.536,
                              });
                            }}
                          />
                          <Text style={styles.notesCountText}>
                            {this.state.notes.length} / 30
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Divider />
                  </View>
                ) : null}
              </View>
              <View
                style={{
                  marginTop: this.state.showDocuments
                    ? windowWidth * 0.066
                    : windowWidth * 0.66,
                }}>
                <Button
                  buttonType="gradient"
                  style={styles.button}
                  onPress={this.onPreview.bind(this)}>
                  <Text style={styles.buttonText}>PREVIEW & SEND</Text>
                </Button>
                <Button
                  style={styles.plainbutton}
                  onPress={this.onSave.bind(this)}>
                  <Text style={[styles.buttonText, {color: 'grey'}]}>SAVE</Text>
                </Button>
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <ScrollView
              contentContainerStyle={{
                paddingBottom: windowWidth * 0.16,
              }}>
              <Divider />
              <View style={{}}>
                <View style={styles.notesContainer}>
                  <Text style={styles.previewHeader}>Personal Details</Text>
                  <Divider />
                  <Text style={styles.previewText}>{this.state.fullName}</Text>
                </View>
              </View>
              <Divider />
              <View style={{}}>
                <View style={styles.notesContainer}>
                  <Text style={styles.previewHeader}>Data</Text>
                  <Divider />
                  <Text style={styles.previewText}>
                    {this.state.companyName}
                  </Text>
                  <Text style={styles.previewText}>{this.state.address}</Text>
                  <Text style={styles.previewText}>{this.state.pinCode}</Text>
                  <Text style={styles.previewText}>{this.state.date}</Text>
                </View>
              </View>
              <Divider />
              <View style={{}}>
                <View style={styles.notesContainer}>
                  <Text style={styles.noteHeader}>Notes</Text>
                  <Divider />
                  <Text style={styles.previewText}>{this.state.notes}</Text>
                </View>
              </View>
              <Divider />

              <View
                style={{
                  marginTop: this.state.showDocuments
                    ? windowWidth * 0.066
                    : windowWidth * 0.66,
                }}>
                <Button
                  buttonType="gradient"
                  style={styles.button}
                  onPress={this.onSend.bind(this)}>
                  <Text style={styles.buttonText}>SEND</Text>
                </Button>
                <Button
                  style={styles.plainbutton}
                  onPress={this.onSave.bind(this)}>
                  <Text style={[styles.buttonText, {color: 'grey'}]}>SAVE</Text>
                </Button>
              </View>
            </ScrollView>
          )}
        </View>
        <SuccessModal
          isVisible={this.state.sentSuccessModal}
          centerText={
            'Your PwC ICC generation process has been initiated successfully'
          }
          onPress={this.onDoneSuccessModal.bind(this)}
        />
      </View>
    );
  }
}
export default connect(
  state => ({
    user: state.user,
  }),
  {onEmploymentVc},
)(EmploymentVc);
