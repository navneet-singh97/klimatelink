import {StyleSheet, Dimensions} from 'react-native';
import {color} from './../../theme/color';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    flexDirection: 'column',
    minHeight: windowHeight,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  topContainer: {
    flex: 0.7,
    backgroundColor: color.background,
  },
  bottomContainer: {
    flex: 0.3,
    backgroundColor: color.background,
    // borderWidth: 0.6,
  },
  topIcons: {
    fontSize: windowWidth * 0.069,
    color: color.greyText,
    alignSelf: 'center',
  },
  mainTitle: {
    fontFamily: 'CenturyGothic-Bold',
    fontSize: windowWidth * 0.056,
    fontWeight: '900',
  },
  lessonsTitle: {
    fontFamily: 'CenturyGothic-Bold',
    fontSize: windowWidth * 0.0436,
    color: 'black',
    fontWeight: '900',
  },
  reviewText: {
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.0436,
    color: '#434446',
    // textShadowColor: 'black',
    // textShadowOffset: {width: 0.6, height: 0.6},
    // textShadowRadius: 1,
  },
  followBtn: {backgroundColor: '#0194ff', borderRadius: windowWidth * 0.0136},
  followText: {
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.0416,
    fontWeight: 'bold',
    color: color.textColor,
    padding: windowWidth * 0.0136,
  },
  informations: {
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.0486,
    color: color.blackText,
    marginHorizontal: windowWidth * 0.036,
  },
  moreText: {
    fontFamily: 'CenturyGothic-Bold',
    fontSize: windowWidth * 0.036,
    color: color.secondaryColor,
    fontWeight: '900',
    alignSelf: 'flex-end',
    paddingHorizontal: windowWidth * 0.036,
  },
  commonBlackTitle: {
    fontFamily: 'CenturyGothic',
    color: 'black',
    marginHorizontal: windowWidth * 0.036,
    fontSize: windowWidth * 0.0436,
  },
  commonGreyTitle: {
    fontFamily: 'CenturyGothic',
    color: color.greyText,
    marginHorizontal: windowWidth * 0.036,
    fontSize: windowWidth * 0.0436,
  },
  row: {
    width: windowWidth,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: windowWidth * 0.036,
    paddingHorizontal: windowWidth * 0.036,
  },
  rowImage: {
    width: windowWidth * 0.136,
    height: windowWidth * 0.136,
    borderRadius: (windowWidth * 0.136) / 2,
    marginRight: 18
  },
  instructorName: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontSize: windowWidth * 0.0436,
  },
  ratingText: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontSize: windowWidth * 0.0436,
  },
  activityIcon: {
    fontSize: windowWidth * 0.076,
    color: color.appGreen,
    //alignSelf: 'center',
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
});
