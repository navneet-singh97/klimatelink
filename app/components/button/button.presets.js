import {ViewStyle, TextStyle, Dimensions} from 'react-native';
import {color} from '../../theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BASE_VIEW: ViewStyle = {
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_TEXT: TextStyle = {
  paddingHorizontal: 3,
};

export const viewPresets = {
  primary: {
    ...BASE_VIEW,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 0,
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
  primary: {
    borderRadius: 4,
    justifyContent: 'center',
    //alignItems: "center",
    minHeight: windowWidth * 0.146,
  },
};
