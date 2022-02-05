import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Vibration,
  PermissionsAndroid,
} from 'react-native';

import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {Button} from './../../components/button';
import _ from 'lodash';
import moment from 'moment';

import styles from './styles';
import {Input, Divider, colors} from 'react-native-elements';
import {color} from '../../theme';
import DatePicker from 'react-native-datepicker';
import AnimatedLoader from 'react-native-animated-loader';

import {connect} from 'react-redux';
import {
  uploadProfile,
  onEditProfile,
  getUserDetails,
} from './../../redux/actions/user';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const genderRadioButtons = [
  {id: 0, value: 'Male'},
  {id: 1, value: 'Female'},
];

let ChoosePics = [
  {
    title: 'Take Photo',
    icon: 'camera',
  },
  {
    title: 'Choose from Gallery',
    icon: 'photo',
  },
];

interface Props {
  navigation: any;
  editProfileInfo: any;
  onEditProfile: any;
}
interface EditProfileState {
  userName: any;
  about: any;
  email: any;
  location: any;
  phoneNumber: any;
  profilePicModal: any;
  userImage: any;
  photoModal: any;
  type: any;
}

class EditProfile extends Component<Props, EditProfileState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userName: '',
      about: '',
      email: '',
      location: '',
      phoneNumber: '',
      profilePicModal: false,
      userProfilePic: '',
      userfirstLastName: '',
      profilePicBase64: '',
      userLocation: '',
      dateOfBirth: '',
      gender: 'Gender',
      genderModal: false,
      editEmail: false,
      userNameError: '',
      aboutError: '',
      emailError: '',
      locationError: '',
      phoneNumberError: '',
      genderError: '',
      dateOfBirthError: '',
      //selectedRadioButton: 0,
      firstName: '',
      lastName: '',
    };
  }

  onLeft() {
    this.props.navigation.goBack();
    this.props.route.params.onSelectRefresh({isRefresh: true});
  }

  async componentDidMount() {
    //alert(JSON.stringify(this.props.route.params.userInfo));
    try {
      this.setState({showLoader: true});
      let userID = await this.props.user.userUId;
      await this.props.getUserDetails(userID);
      await this.showUpdateUserInfo();
      this.setState({showLoader: false});
    } catch (err) {
      this.setState({showLoader: false});

      console.log('showUpdateUserInfo_error_123', err);
    }
  }

  showUpdateUserInfo() {
    if (this.props.user != undefined) {
      if (this.props.user.getUserInfo != undefined) {
        console.log('JSON.stringify(_123', this.props.user.getUserInfo);
        if (this.props.user.getUserInfo.result.isProfileMissing == false) {
          this.setState({
            firstName: this.props.user.getUserInfo.result.firstName,
            lastName: this.props.user.getUserInfo.result.lastName,

            userfirstLastName: this.props.user.getUserInfo.result
              .additionalUserInfo.username,
            userName: this.props.user.getUserInfo.result.additionalUserInfo
              .username,
            about: this.props.user.getUserInfo.result.additionalUserInfo.about,
            email: this.props.user.getUserInfo.result.email,
            location: this.props.user.getUserInfo.result.additionalUserInfo
              .address,
            phoneNumber: this.props.user.getUserInfo.result.phoneNumber,
            profilePicModal: false,
            userProfilePic: this.props.user.getUserInfo.result
              .additionalUserInfo.profilePicture,
            userLocation: this.props.user.getUserInfo.result.additionalUserInfo
              .address,
            editEmail: false,
            gender:
              this.props.user.getUserInfo.result.gender == 0
                ? 'Male'
                : 'Female',
            selectedRadioButton: this.props.user.getUserInfo.result.gender,
            dateOfBirth:
              this.props.user.getUserInfo.result.dateOfBirth == null
                ? ''
                : moment(this.props.user.getUserInfo.result.dateOfBirth).format(
                    'YYYY-MM-DD',
                  ),
          });
        } else {
          this.setState({
            phoneNumber: this.props.user.getUserInfo.result.phoneNumber,
            editEmail: true,
          });
        }
      }
    }
  }

  async profileUpdateSuccess() {
    await this.setState({showLoader: false});
    await this.props.getUserDetails(this.props.user.getUserInfo.result.uid);
    await this.showUpdateUserInfo();
  }

  async onChoosePic(val) {
    if (val === 'Take Photo') {
      await this.setState({profilePicModal: false});
      await this.onSelectCamera();
    } else {
      await this.setState({profilePicModal: false});
      await this.onSelectGallery();
    }
  }

  async onSelectCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        console.log('onSelectCamera', image);
        await this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadProfile(this.state.profilePicBase64);
          await this.setState({
            userProfilePic: this.props.user.uploadProfile.result,
          });
        });
      })
      .catch(error => {
        console.log('onSelectCamera_error', error);
      });
  }

  async onSelectGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        console.log('onSelectGallery', image);
        await this.setState({profilePicBase64: image.data}, async () => {
          await this.props.uploadProfile(this.state.profilePicBase64);
          await this.setState({
            userProfilePic: this.props.user.uploadProfile.result,
          });
        });
      })
      .catch(error => {
        console.log('onSelectGallery_error', error);
      });
  }

  validateEmail = email => {
    var re = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  async updateProfile() {
    // if (this.state.userName == '') {
    //   this.setState({userNameError: 'Please enter username'});
    // } else if (this.state.about == '') {
    //   this.setState({aboutError: 'Please enter about yourself'});
    // } else if (this.state.email == '') {
    //   this.setState({emailError: 'Please enter email'});
    // } else if (!this.validateEmail(this.state.email)) {
    //   this.setState({emailError: 'Please enter a valid email'});
    // } else if (this.state.address == '') {
    //   this.setState({locationError: 'Please enter location'});
    // } else if (this.state.gender == 'Gender') {
    //   this.setState({genderError: 'Please select gender'});
    // } else if (this.state.dateOfBirth == '') {
    //   this.setState({dateOfBirthError: 'Please enter location'});
    // }
    if (
      this.state.firstName == '' ||
      this.state.lastName == '' ||
      this.state.userName == '' ||
      this.state.about == '' ||
      this.state.email == '' ||
      this.state.address == '' ||
      this.state.address == '' ||
      this.state.dateOfBirth == ''
    ) {
      Alert.alert(
        'ClimateLink',
        'Please enter all the required fields',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (!this.validateEmail(this.state.email)) {
      Alert.alert(
        'ClimateLink',
        'Please enter a valid email',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else if (this.state.gender == 'Gender') {
      Alert.alert(
        'ClimateLink',
        'Please choose gender',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      let editProfileInfo = {
        userID: this.props.user.getUserInfo.result.uid,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dateOfBirth: this.state.dateOfBirth,
        gender: this.state.selectedRadioButton,
        email: this.state.email.trim(),
        userName: this.state.userName,
        about: this.state.about,
        address: this.state.location,
        profilePicPath: this.state.userProfilePic,
      };

      console.log('editProfileInfo_123456', editProfileInfo);
      this.setState({showLoader: true});
      await this.props.onEditProfile(editProfileInfo);

      if (this.props.user.editProfile.message == 'PUT Request successful.') {
        Alert.alert(
          'ClimateLink',
          'Profile Updated Successfully',
          [{text: 'OK', onPress: () => this.profileUpdateSuccess()}],
          {cancelable: false},
        );
      } else {
        this.setState({showLoader: false});
        Alert.alert(
          'ClimateLink',
          'Something Went Wrong',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    }
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <Header
          //notification
          //leftMenu
          onLeftPress={this.onLeft.bind(this)}
          //onRightPress={this.onNotification.bind(this)}
        >
          Edit Profile
        </Header>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ScrollView>
            <View style={styles.topProfileContainer}>
              <Text style={styles.name}>{this.state.userfirstLastName}</Text>
              {this.state.userLocation != '' ? (
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    type="SimpleLineIcons"
                    name="location-pin"
                    style={styles.locationIcon}
                  />
                  <Text style={styles.locationText}>{this.state.location}</Text>
                </View>
              ) : null}
              <View style={{marginTop: windowWidth * 0.036}}>
                {this.state.userProfilePic == '' ? (
                  <ImageBackground
                    resizeMode="cover"
                    source={require('../../Images/user_placeholder.png')}
                    imageStyle={{
                      borderRadius: windowWidth * 0.0196,
                      borderWidth: 0.1,
                      backgroundColor: color.lightGrey,
                    }}
                    style={styles.profilePic}>
                    <TouchableOpacity
                      style={styles.picButton}
                      onPress={() => {
                        this.setState({profilePicModal: true});
                      }}>
                      <Icon
                        type="Entypo"
                        name="camera"
                        style={{color: 'white', padding: 10}}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                ) : (
                  <ImageBackground
                    resizeMode="cover"
                    source={{
                      uri: this.state.userProfilePic,
                    }}
                    imageStyle={{
                      borderRadius: windowWidth * 0.0196,
                      borderWidth: 0.1,
                      backgroundColor: color.lightGrey,
                    }}
                    style={styles.profilePic}>
                    <TouchableOpacity
                      style={styles.picButton}
                      onPress={() => {
                        this.setState({profilePicModal: true});
                      }}>
                      <Icon
                        type="Entypo"
                        name="camera"
                        style={{color: 'white', padding: 10}}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                )}
              </View>
            </View>
            <Divider
              style={{
                backgroundColor: color.greyText,
                marginTop: windowWidth * 0.036,
              }}
            />

            <View style={{width: windowWidth, padding: windowWidth * 0.036}}>
              <Input
                placeholder="Firstname"
                inputStyle={styles.inputStyle}
                value={this.state.firstName}
                onChangeText={value => this.setState({firstName: value})}
                rightIcon={
                  <Icon
                    type="FontAwesome"
                    name="user"
                    style={styles.inputIcon}
                  />
                }
                errorStyle={styles.errorTextStyle}
                errorMessage={this.state.userNameError}
              />
              <Input
                placeholder="Lastname"
                inputStyle={styles.inputStyle}
                value={this.state.lastName}
                onChangeText={value => this.setState({lastName: value})}
                rightIcon={
                  <Icon
                    type="FontAwesome"
                    name="user"
                    style={styles.inputIcon}
                  />
                }
                errorStyle={styles.errorTextStyle}
                errorMessage={this.state.userNameError}
              />

              <Input
                placeholder="Username"
                inputStyle={styles.inputStyle}
                value={this.state.userName}
                onChangeText={value => this.setState({userName: value})}
                rightIcon={
                  <Icon
                    type="FontAwesome"
                    name="user"
                    style={styles.inputIcon}
                  />
                }
                errorStyle={styles.errorTextStyle}
                errorMessage={this.state.userNameError}
              />

              <Input
                placeholder="About"
                inputStyle={styles.inputStyle}
                value={this.state.about}
                onChangeText={value => this.setState({about: value})}
                rightIcon={
                  <Icon
                    name={'edit'}
                    type={'AntDesign'}
                    style={styles.inputIcon}
                  />
                }
                errorStyle={styles.errorTextStyle}
                errorMessage={this.state.aboutError}
              />
              <Input
                placeholder="Email"
                inputStyle={styles.inputStyle}
                keyboardType={'email-address'}
                editable={this.state.editEmail}
                value={this.state.email}
                onChangeText={value => this.setState({email: value})}
                rightIcon={
                  <Icon
                    name={'mail'}
                    type={'Octicons'}
                    style={styles.inputIcon}
                  />
                }
                errorStyle={styles.errorTextStyle}
                errorMessage={this.state.emailError}
              />
              <Input
                placeholder="Location"
                inputStyle={styles.inputStyle}
                value={this.state.location}
                onChangeText={value => this.setState({location: value})}
                rightIcon={
                  <Icon
                    name={'location-pin'}
                    type={'SimpleLineIcons'}
                    style={styles.inputIcon}
                  />
                }
                errorStyle={styles.errorTextStyle}
                errorMessage={this.state.locationError}
              />
              <Input
                placeholder="Phone Number"
                inputStyle={styles.inputStyle}
                keyboardType={'phone-pad'}
                editable={false}
                value={this.state.phoneNumber}
                onChangeText={value => this.setState({phoneNumber: value})}
                rightIcon={
                  <Icon
                    name={'phone'}
                    type={'Feather'}
                    style={styles.inputIcon}
                  />
                }
              />

              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => {
                  this.setState({genderModal: true});
                }}>
                <Text
                  style={
                    this.state.gender != 'Gender'
                      ? styles.genderTextStyle
                      : styles.genderPlaceHolderStyle
                  }>
                  {this.state.gender}
                </Text>
              </TouchableOpacity>
              {this.state.userNameError != '' ? (
                <Text style={styles.normalErrorTextStyle}>
                  {this.state.genderError}
                </Text>
              ) : null}
              <DatePicker
                style={styles.datePicker}
                allowFontScaling={false}
                date={this.state.dateOfBirth}
                mode="date"
                placeholder="Date of Birth"
                format={'YYYY-MM-DD'}
                //minDate={moment().format("DD-MM-YYYY")}
                maxDate={moment().format('YYYY-MM-DD')}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={true}
                onDateChange={date => {
                  console.log('DD-MM-YYYY:', date);
                  this.setState({dateOfBirth: date, dobError: ''});
                }}
                onCloseModal={() => {
                  if (this.state.dateOfBirth == '') {
                    this.setState({
                      dobError: 'Date of Birth field should not be empty',
                    });
                  }
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
                }}
                iconComponent={
                  <Icon
                    type="MaterialCommunityIcons"
                    name="calendar-range"
                    style={{
                      color: color.greyBg,
                      marginRight: windowWidth * 0.08464,
                      marginTop: windowWidth * 0.0336,
                      fontSize: windowWidth * 0.0766,
                    }}
                  />
                }></DatePicker>
              <View style={styles.datePickerLine} />
              {this.state.userNameError != '' ? (
                <Text style={styles.normalErrorTextStyle}>
                  {this.state.dateOfBirthError}
                </Text>
              ) : null}
            </View>
            <Button
              style={styles.button}
              onPress={this.updateProfile.bind(this)}>
              <Text style={styles.buttonText}>UPDATE PROFILE</Text>
            </Button>
          </ScrollView>
        </View>
        <Modal isVisible={this.state.profilePicModal}>
          <View style={styles.modalBox}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // height: windowWidth * 0.1346,
                borderBottomWidth: 1,
                flex: 0.45,
              }}>
              <Text style={styles.avatarTitle}>Select Avatar</Text>
            </View>
            <View
              style={{
                flex: 0.55,
                marginHorizontal: windowWidth * 0.06,
                marginBottom: windowWidth * 0.096,
              }}>
              {ChoosePics.map(res => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: windowWidth * 0.0516,
                    }}
                    onPress={this.onChoosePic.bind(this, res.title)}>
                    <Text style={styles.chooseOptionTitle}>{res.title}</Text>
                    <Icon
                      type="FontAwesome"
                      name={res.icon}
                      style={{color: 'black'}}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <TouchableOpacity
              style={styles.avatarCancelBtn}
              onPress={() => this.setState({profilePicModal: false})}>
              <Text style={styles.avatarbuttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal isVisible={this.state.genderModal}>
          <View style={styles.modalShareBox}>
            <Text
              style={{
                fontSize: windowWidth * 0.0516,
                fontFamily: 'CenturyGothic',
                color: color.primaryColor,
                marginBottom: windowWidth * 0.0146,
              }}>
              Select Gender
            </Text>
            <View style={{}}>
              {genderRadioButtons.map((res, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => {
                      this.setState({
                        selectedRadioButton: res.id,
                        gender: res.value,
                        genderModal: false,
                      });
                    }}>
                    <Text style={styles.modalShareText}>{res.value}</Text>

                    <Icon
                      type={'Ionicons'}
                      name={
                        this.state.selectedRadioButton == res.id
                          ? 'radio-button-on'
                          : 'radio-button-off'
                      }
                      style={{
                        color: 'black',
                        fontSize: windowWidth * 0.06,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>
        <AnimatedLoader
          visible={this.state.showLoader}
          overlayColor="rgba(255,255,255,0.36)"
          source={require('./../animationLoaders/loader_4.json')}
          animationStyle={{
            width: windowWidth * 0.36,
            height: windowWidth * 0.36,
          }}
          speed={1}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {uploadProfile, onEditProfile, getUserDetails},
)(EditProfile);
