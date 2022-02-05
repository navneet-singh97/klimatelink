import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {color} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    //justifyContent: "center",
    //alignItems: "center",
  },
  tabContainer: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'space-around',
    marginVertical: windowWidth * 0.06,
  },
  tabInActive: {
    height: windowWidth * 0.1136,
    width: windowWidth * 0.436,
    backgroundColor: color.primaryBgColour,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth * 0.0316,
  },
  tabInActiveText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.0376,
    alignSelf: 'center',
    fontFamily: 'CenturyGothic',
    color: color.appGreen,
  },
  tabActive: {
    height: windowWidth * 0.1136,
    width: windowWidth * 0.436,
    backgroundColor: color.appGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: windowWidth * 0.0316,
  },
  tabActiveText: {
    textAlign: 'center',
    fontSize: windowWidth * 0.0376,
    alignSelf: 'center',
    fontFamily: 'CenturyGothic',
    color: color.textColor,
  },
  renderRow: {
    width: windowWidth - windowWidth * 0.036,
    minHeight: windowWidth * 0.19646,
    borderWidth: 0.316,
    borderColor: color.greyBg,
    alignSelf: 'center',
    marginBottom: windowWidth * 0.036,
    backgroundColor: 'white',
    borderRadius: windowWidth * 0.006,
    padding: windowWidth * 0.0196,
    borderRadius: windowWidth * 0.036,
  },
  rowImageCircle: {
    height: windowWidth * 0.136,
    width: windowWidth * 0.136,
    borderRadius: windowWidth * 0.036,
    backgroundColor: '#f1debd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowImage: {
    height: windowWidth * 0.0996,
    width: windowWidth * 0.0996,
  },
  renderItemStyle: {
    fontSize: windowWidth * 0.036,
    fontFamily: 'CenturyGothic',
    color: color.appGreen,
    marginTop: windowWidth * 0.006,
  },
  renderTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  renderTopInnerView: {
    width: windowWidth / 1.516,
    marginLeft: windowWidth * 0.0316,
  },
  shareIcon: {
    fontSize: windowWidth * 0.06,
    color: color.appGreen,
    margin: windowWidth * 0.036,
  },
  renderBottomView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingLeft: windowWidth * 0.1636,
    // paddingRight: windowWidth * 0.36,
  },
});
