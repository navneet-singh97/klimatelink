import {ViewStyle, Dimensions} from 'react-native';
import {color} from '../../theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CARD_VIEW: ViewStyle = {
  backgroundColor: 'white',
  marginBottom: windowWidth * 0.06,
  shadowColor: '#363636',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowRadius: 1,
  shadowOpacity: 0.9,
  elevation: 6,
};

export const presets = {
  default: CARD_VIEW,
};
