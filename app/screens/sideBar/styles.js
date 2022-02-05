import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../theme/';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.appGreen,
  },
  buttonText: {
    color: color.text,
    fontSize: windowWidth * 0.06,
    fontWeight: '600',
    fontFamily: 'CenturyGothic',
  },
  nameStyle: {
    color: 'white',
    fontSize: windowWidth * 0.0416,
    fontWeight: '600',
    fontFamily: 'CenturyGothic',
    alignSelf: 'center',
    marginBottom: 10,
  },
  profilePicOutterView: {
    flex: 0.26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicView: {
    width: windowWidth / 2 - 60,
    height: windowWidth / 2 - 60,
    borderRadius: (windowWidth / 2 - 60) / 2,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: color.text,
  },
  profilePic: {
    width: windowWidth / 2 - 60,
    height: windowWidth / 2 - 60,
    borderRadius: (windowWidth / 2 - 60) / 2,
  },
  buttonView: {
    flex: 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange'
  },
  editProfileButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 2 - 30,
    height: windowWidth / 4 - 50,
    marginBottom: windowWidth * 0.06,
  },
  editprofileText: {
    color: color.primaryColor,
    fontSize: windowWidth * 0.0416,
    fontFamily: 'CenturyGothic',
  },
  menuItemsView: {
    flex: 0.73,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'blue'
  },
  row: {
    marginHorizontal: windowWidth * 0.046,
    marginVertical: windowWidth * 0.036,
    flexDirection: 'row',
    // alignItems: 'baseline'
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: color.line,
    marginLeft: 15,
    marginRight: 15,
  },
  itemIcon: {
    height: windowWidth * 0.06,
    width: windowWidth * 0.06,
    marginTop: 0,
    marginLeft: 3,
    marginRight: 7,
  },
  itemText: {
    color: color.text,
    fontSize: windowWidth * 0.0416,
    fontFamily: 'CenturyGothic',
  },
});

export default styles;
