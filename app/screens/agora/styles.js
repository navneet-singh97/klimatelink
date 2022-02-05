import {Dimensions, StyleSheet} from 'react-native';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#415D6F',
  },
  float: {
    position: 'absolute',
    right: 15,
    left: 15,
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  top: {
    width: '100%',
    marginTop: 30,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  controlButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#003237',
    borderColor: '#003237',
  },
  controlIcon: {
    tintColor: '#ffffff',
  },
  endCall: {
    // borderWidth: 1,
    // padding: 10,
    // borderRadius: 50,
    // backgroundColor: '#003237',
    // borderColor: '#003237',
  },
  username: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'center',
  },
  calling: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  middle: {
    alignSelf: 'center',
  },
  profilePic: {
    marginTop: 20,
    height: Dimensions.get('screen').height / 3,
    width: Dimensions.get('screen').height / 3,
    borderRadius: Dimensions.get('screen').height / 3 / 2,
  },

  // for video call

  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});
