import {StyleSheet, Dimensions} from 'react-native';
import {color} from './../../theme/color';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  topContainer: {
    flex: 0.4,
    backgroundColor: color.greyBg,
    //borderWidth: 0.6,
  },
  bottomContainer: {flex: 0.6, backgroundColor: 'transparent'},
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
  lessonTitle: {
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.046,
    color: color.blackText,
  },
  lesDes: {
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.036,
    color: color.blackText,
    marginTop: windowWidth * 0.0136,
  },
  commonBlackTitle: {
    fontFamily: 'CenturyGothic',
    color: color.appGreen,
    marginHorizontal: windowWidth * 0.036,
    fontSize: windowWidth * 0.046,
  },
  showAllTitle: {
    fontFamily: 'CenturyGothic',
    color: color.appGreen,
    marginRight: windowWidth * 0.0136,
    fontSize: windowWidth * 0.0416,
  },
  dropDownArrow: {
    color: color.appGreen,
    fontSize: windowWidth * 0.06,
    marginRight: windowWidth * 0.036,
  },
  row: {
    width: windowWidth - windowWidth * 0.06,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: windowWidth * 0.036,
    paddingLeft: windowWidth * 0.06,
    paddingRight: windowWidth * 0.06,
    backgroundColor: '#f4f4f4',
    alignSelf: 'center',
    padding: windowWidth * 0.0316,
    borderRadius: windowWidth * 0.036,
  },
  rowImage: {
    width: windowWidth * 0.096,
    height: windowWidth * 0.096,
    borderRadius: (windowWidth * 0.096) / 2,
  },
  instructorName: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontSize: windowWidth * 0.0436,
    alignSelf: 'center',
    marginLeft: windowWidth * 0.0396,
  },
  dateText: {
    fontFamily: 'CenturyGothic',
    color: '#8e9ab3',
    fontSize: windowWidth * 0.0376,
    alignSelf: 'center',
  },
  commentText: {
    fontFamily: 'CenturyGothic',
    color: '#8e9ab3',
    fontSize: windowWidth * 0.0416,
    alignSelf: 'center',
  },
  activityIcon: {
    fontSize: windowWidth * 0.056,
    color: color.text,
    alignSelf: 'center',
  },
  playpauseIcon: {
    color: '#FFFF',
    fontSize: windowWidth * 0.136,
  },
  modalBox: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'black',
  },
  IconCircle: {
    width: windowWidth * 0.096,
    height: windowWidth * 0.096,
    borderRadius: (windowWidth * 0.096) / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoListIcon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  },
});
