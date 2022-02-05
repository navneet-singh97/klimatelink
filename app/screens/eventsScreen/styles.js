import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {color} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryBgColour,
    //justifyContent: "center",
    //alignItems: "center",
  },
  logo: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    marginBottom: 6,
  },
  appName: {fontSize: 26, color: 'black'},
  title: {
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.046,
    marginLeft: windowWidth * 0.0169,
  },
  titleText: {
    color: color.primary,
    fontFamily: 'CenturyGothic-Bold',
    alignSelf: 'center',
    fontSize: windowWidth * 0.069,
    textShadowColor: color.primaryColor,
    textShadowOffset: {width: 1, height: 1.6},
    textShadowRadius: 1,
    marginBottom: windowWidth * 0.16,
  },
  searchBarContainer: {
    backgroundColor: color.secondaryColor,
    width: windowWidth / 1.06,
    height: windowWidth * 0.13,
    borderBottomWidth: 0,
    alignSelf: 'center',
    borderRadius: windowWidth * 0.096,
    marginVertical: windowWidth * 0.06,
  },
  searchBarInputContainer: {
    height: windowWidth * 0.09,
    backgroundColor: color.secondaryColor,
    borderRadius: windowWidth * 0.06,
  },
  searchBarInputStyle: {
    fontFamily: 'CenturyGothic',
    color: color.textColor,
    fontSize: windowWidth * 0.046,
    alignSelf: 'center',
  },
  searchBarIconStyle: {},
  eventsListContainer: {padding: windowWidth * 0.036, borderBottomWidth: 0.6},
  eventsTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  timeText: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontSize: windowWidth * 0.06,
    textAlign: 'left',
  },
  dateText: {
    fontFamily: 'CenturyGothic',
    color: color.lightGrey,
    fontSize: windowWidth * 0.0416,
    textAlign: 'left',
  },
  priceText: {
    fontFamily: 'CenturyGothic',
    color: color.primaryColor,
    fontSize: windowWidth * 0.046,
    textAlign: 'left',
  },
  eventsCenterContainer: {},
  addressText: {
    fontFamily: 'CenturyGothic',
    color: color.lightGrey,
    fontSize: windowWidth * 0.036,
    textAlign: 'right',
    marginTop: windowWidth * 0.016,
  },
  eventTitle: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontSize: windowWidth * 0.0416,
    textAlign: 'left',
    marginTop: windowWidth * 0.0316,
  },
  eventImg: {
    width: windowWidth / 1.6,
    height: windowWidth / 2.36,
    alignSelf: 'flex-start',
    marginTop: 0,
  },
  eventsBottomContainer: {marginTop: windowWidth * 0.036},
  featuresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: windowWidth * 0.036,
  },
  featureImgContainer: {
    width: windowWidth * 0.096,
    height: windowWidth * 0.096,
    borderRadius: (windowWidth * 0.096) / 2,
    backgroundColor: color.appGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureImg: {
    width: windowWidth * 0.0416,
    height: windowWidth * 0.0416,
  },
  purpleDots: {
    color: '#9013fe',
    fontWeight: '900',
    fontSize: windowWidth * 0.0416,
  },
  button: {
    width: windowWidth,
  },
  buttonText: {
    color: 'white',
    fontSize: windowWidth * 0.0419,
    alignSelf: 'center',
    fontFamily: 'CenturyGothic-Bold',
  },
});
