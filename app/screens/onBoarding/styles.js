import {StyleSheet, Dimensions} from 'react-native';
import {color, letterspacin} from '../../theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: 'blue',
  },
  slideContainer: {
    flex: 1,
    //paddingTop: windowWidth * 0.196,
    // alignItems: 'center'
  },
  titleText: {
    fontSize: windowWidth * 0.0416,
    color: color.blueText,
    fontFamily: 'Mukta-Medium',
    alignSelf: 'center',
  },
  introImage: {
    width: windowWidth / 1.5,
    height: windowWidth / 2.06,
    alignSelf: 'center',
  },
  desBox: {
    width: windowWidth - windowWidth * 0.036,
    // minHeight: windowWidth / 1.36,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.76,
  },
  descriptionText: {
    fontSize: windowWidth * 0.0469,
    color: '#003237',
    marginHorizontal: windowWidth * 0.036,
    textAlign: 'center',
    margin: windowWidth * 0.036,
    fontFamily: 'CenturyGothic',
    // fontWeight: '600',
    textShadowColor: '#003237',
    textShadowOffset: {width: 0.16, height: 0.16},
    textShadowRadius: 1,
    //lineHeight: windowWidth * 0.06,
  },

  changeColorText: {
    fontSize: windowWidth * 0.0516,
    color: color.secondaryColor,
    fontFamily: 'CenturyGothic-Bold',
    marginHorizontal: windowWidth * 0.06,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gradientBox: {
    width: windowWidth / 3.36,
    height: windowWidth / 3.36,
    borderRadius: windowWidth * 0.06,
    //backgroundColor: color.transparent,
    //shadowColor: color.shadowBg,
    shadowOffset: {
      width: 0,
      height: 1.36,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: windowWidth * 0.06,
  },
  iconStyle: {
    fontSize: windowWidth * 0.0696,
    color: color.whiteText,
    marginBottom: windowWidth * 0.016,
  },
  iconTitle: {
    fontSize: windowWidth * 0.0336,
    color: color.whiteText,
    fontFamily: 'Mukta-Medium',
    textAlign: 'center',
  },
  skipBtnContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomButtonContainer: {
    width: windowWidth / 2.36,
    height: windowWidth / 7.6,
    backgroundColor: color.secondaryColor,
    borderRadius: windowWidth * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonTitle: {
    fontSize: windowWidth * 0.0416,
    color: color.appGreen,
    fontFamily: 'CenturyGothic-Bold',
    alignSelf: 'center',
    fontWeight: '600',
  },
});

export default styles;
