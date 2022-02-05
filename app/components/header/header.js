import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
  StatusBar,
  Image,
} from 'react-native';
import {viewPresets, textPresets, gradientPresets} from './header.presets';
import {HeaderProps} from './header.props';
import {mergeAll, flatten, prop} from 'ramda';
import LinearGradient from 'react-native-linear-gradient';
//import { LinearGradient } from "expo-linear-gradient";
import {color} from '../../theme';
import {Icon, Item} from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Header(props: HeaderProps) {
  let headerHeight;
  if (windowWidth == 320) {
    headerHeight = 54;
  } else if (windowWidth == 375) {
    headerHeight = 54;
  } else if (windowWidth == 414) {
    headerHeight = 88;
  } else {
    headerHeight = 54;
  }

  const ROOT = {
    flexDirection: 'row',
    width: windowWidth,
    height: headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  };
  // grab the props
  const {
    preset = 'primary',
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    headerType,
    titleStyle,
    onLeftPress,
    onCenterPress,
    onRightPress,
    leftIcon,
    rightIcon,
    transparent,
    leftIconHide,
    leftMenu,
    changeApperance,
    notification,
    createGroup,
    createGroupFontName,
    isGroupChat,
    onSelectAudioCall,
    onSelectVideoCall,
    customBackIcon,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride]),
  );
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  );

  const content = children || <Text text={text} style={textStyle} />;
  const gradientHeaderStyle = mergeAll(
    flatten([
      gradientPresets[preset] || gradientPresets.primary,
      styleOverride,
    ]),
  );

  return (
    <View>
      <LinearGradient colors={color.Gradient} style={{flex: 1}}>
        <StatusBar
          translucent={false}
          backgroundColor={changeApperance ? 'white' : '#003237'}
          barStyle={changeApperance ? 'dark-content' : 'light-content'}
        />
      </LinearGradient>

      <LinearGradient
        start={{x: 0.6, y: 0.0}}
        end={{x: 1, y: 0.0}}
        locations={[0, 1]}
        colors={
          transparent ? ['transparent', 'transparent'] : ['#003237', '#003237']
        }
        style={{...ROOT, ...gradientHeaderStyle}}
        {...rest}>
        <TouchableOpacity
          onPress={onLeftPress}
          style={{
            flex: 0.15,
            //backgroundColor: "pink",
            justifyContent: 'center',
          }}
          {...rest}>
          {leftIconHide ? null : leftMenu ? (
            <Image
              source={require('../../Images/menuIcon.png')}
              style={{
                width: windowWidth * 0.06,
                height: windowWidth * 0.06,
                alignSelf: 'center',
                // marginTop: windowWidth * 0.036,
              }}
            />
          ) : (
            <Icon
              type={customBackIcon?'Feather':"SimpleLineIcons"}
              name={changeApperance ? 'arrow-left-circle' : 'arrow-left'}
              style={{
                fontSize: windowWidth * 0.069,
                color: changeApperance ? 'white' : 'white',
                alignSelf: 'center',
                marginLeft: createGroup ? 6 : 0,
                //marginTop: windowWidth * 0.036,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.isTextPressed === undefined ? {} : props.onPressTitle()
          }
          disabled={props.isTextPressed === undefined ? true : false}
          style={{
            flex: 0.65,
            justifyContent: 'center',
            // backgroundColor: "pink",
          }}
          {...rest}>
          <Text
            style={{
              fontSize: windowWidth * 0.046,
              color: 'white',
              //marginTop: windowWidth * 0.036,
              fontFamily: 'CenturyGothic-Bold',
              alignSelf: 'center',
              fontWeight: '900',
              marginLeft: createGroup ? 64 : windowWidth * 0.069,
              ...titleStyle,
            }}>
            {content}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCenterPress}
          style={{flex: 0.1, backgroundColor: 'transparent'}}
          {...rest}></TouchableOpacity>
        <TouchableOpacity
          //onPress={onRightPress}
          style={{flex: 0.1, backgroundColor: 'transparent'}}
          {...rest}>
          {notification ? (
            <Icon
              name={'bell'}
              type={'FontAwesome'}
              style={{
                color: 'white',
                fontSize: windowWidth * 0.056,
                alignSelf: 'center',
                marginTop: windowWidth * 0.0294,
              }}
            />
          ) : null}
        </TouchableOpacity>
        {createGroup ? (
          <TouchableOpacity
            //onPress={onRightPress}
            style={{flex: 0.1, backgroundColor: 'transparent'}}
            onPress={() => props.onPressCreateGroup()}>
            <Icon
              name={createGroupFontName}
              type={'FontAwesome'}
              style={{
                color: 'white',
                fontSize: windowWidth * 0.056,
                alignSelf: 'center',
                marginTop: windowWidth * 0.0,
              }}
            />
          </TouchableOpacity>
        ) : isGroupChat ? (
          <View
            style={{
              position: 'absolute',
              right: 5,
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{marginLeft: 8, marginRight: 8}}
              onPress={() => props.onSelectAudioCall()}>
              <Image
                source={require('./../../Images/audio_call.png')}
                style={{
                  width: windowWidth * 0.06,
                  height: windowWidth * 0.06,
                  tintColor: '#003237',
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: '#ffffff',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onSelectVideoCall()}
              style={{marginLeft: 8, marginRight: 8}}>
              <Image
                source={require('./../../Images/video.png')}
                style={{
                  width: windowWidth * 0.06,
                  height: windowWidth * 0.06,
                  tintColor: '#003237',
                  tintColor: '#ffffff',
                }}
              />
            </TouchableOpacity>
          </View>
        ) : null}
      </LinearGradient>
    </View>
  );
}
