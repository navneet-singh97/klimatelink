import {ViewStyle, TextStyle, Dimensions} from 'react-native';
import {color} from '../../theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BASE_VIEW: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_TEXT: TextStyle = {};

export const viewPresets = {
  primary: {
    ...BASE_VIEW,
    backgroundColor: 'white',
  },
};

export const textPresets = {
  primary: {
    ...BASE_TEXT,
    fontSize: 9,
    color: 'black',
  },
};

export const gradientPresets = {
  primary: {},
};
