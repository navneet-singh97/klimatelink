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
  bgImagStyle: {width: windowWidth, height: windowWidth / 1.6},
  title: {
    color: color.textColor,
    fontSize: windowWidth * 0.069,
    fontFamily: 'CenturyGothic',
  },
  activeText: {
    color: 'black',
    fontSize: windowWidth * 0.046,
    fontFamily: 'CenturyGothic-Bold',
    marginLeft: windowWidth * 0.036,
    //marginTop: windowWidth * 0.036,
  },
  subTitle: {
    color: color.textColor,
    fontSize: windowWidth * 0.0376,
    fontFamily: 'CenturyGothic-Bold',
    lineHeight: windowWidth * 0.061,
  },
  lineDivider: {
    height: 0.3,
    backgroundColor: color.textColor,
    marginVertical: windowWidth * 0.036,
  },
  letterTitle: {
    color: color.textColor,
    fontSize: windowWidth * 0.04636,
    fontFamily: 'CenturyGothic-Bold',
    alignSelf: 'center',
  },
  listImageView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth * 0.036,
  },
  listImageStyle: {
    flexDirection: 'row',
    width: windowWidth / 2.6,
    height: windowWidth / 2.6,
    borderRadius: windowWidth * 0.0196,
    alignItems: 'flex-end',
    padding: windowWidth * 0.0146,
  },
  listTitleStyle: {
    color: color.textColor,
    fontSize: windowWidth * 0.046,
    fontFamily: 'CenturyGothic-Bold',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    width: windowWidth,
    borderBottomWidth: 0,
  },
  filterList: {
    width: windowWidth - 40,
    backgroundColor: 'white',
    padding: windowWidth * 0.0316,
    alignSelf: 'center',
    marginTop: -windowWidth * 0.016,
  },
  filterListText: {
    fontFamily: 'CenturyGothic',
    marginLeft: windowWidth * 0.066,
  },
  chatlistName: {
    color: color.primary,
    fontSize: windowWidth * 0.0416,
    fontFamily: 'CenturyGothic-Bold',
    marginBottom: windowWidth * 0.0096,
  },
  chatlistMsg: {
    color: 'black',
    fontSize: windowWidth * 0.036,
    fontFamily: 'CenturyGothic',
  },
  chatListTime: {
    color: color.lightGrey,
    fontSize: windowWidth * 0.0316,
    fontFamily: 'CenturyGothic',
    marginBottom: windowWidth * 0.0096,
  },
  chatlistCount: {
    color: 'black',
    fontSize: windowWidth * 0.046,
    fontFamily: 'CenturyGothic',
  },
  activeListView: {
    backgroundColor: 'transparent',
    width: windowWidth * 0.151,
    height: windowWidth * 0.151,
    justifyContent: 'center',
  },
  activeBadge: {
    width: windowWidth * 0.036,
    height: windowWidth * 0.036,
    borderRadius: (windowWidth * 0.036) / 2,
    position: 'absolute',
    top: 0,
    right: 0,
    elevation: 1,
    borderWidth: 1.6,
  },
  activeListName: {
    color: 'black',
    fontSize: windowWidth * 0.036,
    fontFamily: 'CenturyGothic',
  },
  chatListView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  chatListLeft: {
    backgroundColor: 'transparent',
    width: windowWidth * 0.151,
    height: windowWidth * 0.151,
  },
  chatListRight: {
    flexDirection: 'column',
    marginLeft: windowWidth * 0.0699,
    alignItems: 'flex-end',
  },
  bubbleView: {
    width: windowWidth * 0.0516,
    height: windowWidth * 0.0516,
    borderRadius: (windowWidth * 0.0516) / 2,
    backgroundColor: '#14c1ca',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgCountText: {
    color: 'white',
    alignSelf: 'center',
  },
  bubbleSearch: {
    width: windowWidth * 0.0416,
    height: windowWidth * 0.0416,
    borderRadius: (windowWidth * 0.0416) / 2,
    backgroundColor: 'transparent',
    marginLeft: windowWidth * 0.046,
    borderWidth: 1.6,
    borderColor: color.lightGrey,
  },
  bubbleSearchView: {
    width: windowWidth * 0.0416,
    height: windowWidth * 0.0416,
    borderRadius: (windowWidth * 0.0416) / 2,
    backgroundColor: 'green',
    marginLeft: windowWidth * 0.046,
  },
  searchNameText: {
    color: 'black',
    fontSize: windowWidth * 0.046,
    fontFamily: 'CenturyGothic',
  },
  videoListIcon: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    tintColor: '#003237',
  },
  callBtn: {
    marginLeft: 8,
    marginRight: 8,
  },

  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    backgroundColor: '#003237',
    paddingTop: 22,
    marginBottom: 8,
    width: windowWidth,
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  triangleView: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: 14,
    borderBottomColor: '#fff',
  },
  triangleViewHidden: {
    width: 16,
    height: 16,
    marginTop: 6,
  },

  orangeText: {
    color: 'orange',
    fontFamily: 'CenturyGothic',
    color: color.secondaryColor,
    fontSize: windowWidth * 0.046,
  },

  whiteText: {
    fontSize: windowWidth * 0.046,
    color: color.textColor,
    fontFamily: 'CenturyGothic',
  },
});
