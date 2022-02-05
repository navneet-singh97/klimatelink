import {StyleSheet, Dimensions} from 'react-native';
import {color} from './../../theme/color';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.tonerGrey,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  topContainer: {
    flex: 0.1,
    backgroundColor: color.secondaryColor,
    height: windowHeight / 3.06,
  },
  multiBtn: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: windowWidth * 0.0136,
    margin: windowWidth * 0.0136,
    backgroundColor: 'pink',
  },
  multiBtnText: {
    fontSize: windowWidth * 0.0376,
    color: color.textColor,
    fontFamily: 'CenturyGothic',
    padding: windowWidth * 0.0163,
    paddingHorizontal: windowWidth * 0.036,
  },
  activeMultiBtn: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: windowWidth * 0.0136,
    margin: windowWidth * 0.0136,
  },
  bottomContainer: {
    flex: 0.9,
    backgroundColor: color.tonerGrey,
  },
  activeMultiBtn: {
    borderWidth: 0,
    borderColor: 'black',
    borderRadius: windowWidth * 0.0136,
    margin: windowWidth * 0.0136,
    opacity: 0.6,
  },
  commonBlackTitle: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    marginHorizontal: windowWidth * 0.036,
    fontSize: windowWidth * 0.0736,
  },
  commonGreyTitle: {
    fontFamily: 'CenturyGothic-Bold',
    color: color.greyText,
    fontWeight: '900',
    marginHorizontal: windowWidth * 0.036,
    fontSize: windowWidth * 0.0436,
  },
  subTitle: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    marginHorizontal: windowWidth * 0.036,
    fontSize: windowWidth * 0.046,
    marginTop: windowWidth * 0.0316,
  },
  row: {
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.036,
    padding: windowWidth * 0.036,
    marginBottom: windowWidth * 0.06,
  },
  rowImage: {
    width: windowWidth * 0.36,
    height: windowWidth * 0.36,
    //borderRadius: (windowWidth * 0.136) / 2,
  },
  rowTitle: {
    fontFamily: 'CenturyGothic-Bold',
    color: color.blackText,
    fontWeight: '900',
    fontSize: windowWidth * 0.06,
  },
  rowDescription: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontSize: windowWidth * 0.0416,
  },
  ratingText: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontWeight: '600',
    fontSize: windowWidth * 0.0436,
  },
  activityIcon: {
    fontSize: windowWidth * 0.0936,
    color: color.text,
    alignSelf: 'center',
  },
  listTitle: {
    fontFamily: 'CenturyGothic-Bold',
    color: color.blackText,
    fontWeight: '900',
    fontSize: windowWidth * 0.0416,
  },
  iconView: {
    width: windowWidth * 0.096,
    height: windowWidth * 0.096,
    borderRadius: (windowWidth * 0.96) / 2,
    backgroundColor: color.greyBg,
  },
  rowText: {
    fontFamily: 'CenturyGothic',
    color: color.blackText,
    fontWeight: '900',
    fontSize: windowWidth * 0.0416,
    marginLeft: windowWidth * 0.036,
  },
  rowIcon: {
    fontSize: windowWidth * 0.0516,
    color: color.blackText,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: windowWidth * 0.01963,
  },
  submitButton: {
    width: windowWidth / 1.946,
    height: windowWidth * 0.136,
    backgroundColor: color.appGreen,
    alignSelf: 'center',
    marginBottom: windowWidth * 0.096,
    borderRadius: windowWidth * 0.136,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontFamily: 'CenturyGothic-Bold',
    color: color.text,
    fontSize: windowWidth * 0.0419,
    alignSelf: 'center',
    fontFamily: 'CenturyGothic-Bold',
    fontWeight: '600',
  },
});
