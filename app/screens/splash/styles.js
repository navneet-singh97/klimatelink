import {StyleSheet, Dimensions} from 'react-native';
import {color} from './../../theme/color';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  climategainscreen: {
    width: windowWidth,
    height: windowHeight,
  },
  appName: {fontSize: 26, color: 'black'},
  pinMainView: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: "center",
    backgroundColor: color.primary,
  },
  errorTextStyle: {
    color: 'red',
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.0356,
    alignSelf: 'center',
  },
  inputContainer: {
    borderColor: 'white',
    borderWidth: 0,
    width: windowWidth / 1.6,
  },
  pinInput: {
    borderColor: 'white',
    borderWidth: 1,
    padding: windowWidth * 0.036,
    textAlign: 'center',
    color: 'white',
    width: windowWidth / 2,
  },
  eyeIcon: {
    fontSize: windowWidth * 0.06,
    color: 'white',
    marginTop: windowWidth * 0.036,
  },
  submitButton: {
    backgroundColor: 'white',
    width: windowWidth / 1.6,
    paddingVertical: windowWidth * 0.036,
    borderRadius: windowWidth * 0.069,
    alignItems: 'center',
    marginTop: windowWidth * 0.16,
  },
  submitButtonText: {
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.0516,
  },
  splashImg: {
    width: windowWidth / 3.6,
    height: windowWidth / 3.6,
    alignSelf: 'center',
  },
  appTitleName: {
    fontFamily: 'CenturyGothic-Bold',
    fontSize: windowWidth * 0.0996,
    color: color.appGreen,
    marginTop: windowWidth * 0.06,
  },
  line: {
    width: windowWidth / 9,
    height: 1,
    backgroundColor: color.secondaryColor,
  },
  subTitleName: {
    fontFamily: 'CenturyGothic-Bold',
    fontSize: windowWidth * 0.036,
    color: color.secondaryColor,
    marginHorizontal: windowWidth * 0.0136,
  },
});
