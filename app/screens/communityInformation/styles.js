import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {color} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: "center",
    //alignItems: "center",
  },
  logo: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    marginBottom: 6,
  },
  appName: {fontSize: 26, color: 'black'},
  bgImagStyle: {
    width: windowWidth,
    height: windowWidth / 1.6,
    marginBottom: windowWidth * 0.0136,
    paddingTop: 20,
  },
  curveView: {
    width: windowWidth,
    minHeight: windowWidth / 1.36,
    backgroundColor: color.secondaryColor,
    //position: "absolute",
    marginTop: windowWidth / 2.5,
    borderTopRightRadius: windowWidth * 0.096,
  },
  carouselMainView: {
    width: windowWidth,
    height: windowWidth / 1.94,
    //height: windowWidth / 1.6,
    //backgroundColor: "pink",
    //position: "absolute",
    marginTop: windowWidth * 0.436,
    alignSelf: 'flex-end',
    borderWidth: 0,
  },
  title: {
    color: color.appGreen,
    fontSize: windowWidth * 0.069,
    fontFamily: 'CenturyGothic',
  },
  aboutText: {
    color: color.appGreen,
    fontSize: windowWidth * 0.0365,
    fontFamily: 'CenturyGothic',
    marginTop: windowWidth * 0.016,
  },
  subTitle: {
    color: color.appGreen,
    fontSize: windowWidth * 0.0376,
    fontFamily: 'CenturyGothic',
    lineHeight: windowWidth * 0.061,
  },
  lineDivider: {
    height: 0.3,
    backgroundColor: color.textColor,
    marginVertical: windowWidth * 0.036,
  },
  listImageView: {
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    borderWidth: 0,
    justifyContent: 'space-around',
    margin: windowWidth * 0.0096,
    borderRadius: windowWidth * 0.0196,
  },
  listImageStyle: {
    flexDirection: 'row',
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    borderRadius: windowWidth * 0.0196,
    alignItems: 'flex-end',
    padding: windowWidth * 0.0246,
  },
  listTitleStyle: {
    color: color.textColor,
    fontSize: windowWidth * 0.046,
    fontFamily: 'CenturyGothic-Bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  followBtn: {
    backgroundColor: color.secondaryColor,
    alignSelf: 'flex-end',
    borderRadius: windowWidth * 0.096,
    marginRight: 20,
    //paddingTop: 20
  },
  unFollowBtn: {
    backgroundColor: color.appGreen,
    alignSelf: 'flex-end',
    borderRadius: windowWidth * 0.096,
    marginRight: 20,
    //paddingTop: 20
  },
  unfollowText: {
    color: color.appGreen,
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.036,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  followText: {
    color: color.textColor,
    fontFamily: 'CenturyGothic',
    fontSize: windowWidth * 0.036,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
