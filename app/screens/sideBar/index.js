import React, {Component} from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';
import {Icon} from 'native-base';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import styles from './styles';
import {connect} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MenuItems = [];

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  onCloseMenu: any;
  userInfo: any;
  userProfileInfo: any;
}

interface sideMenuItems {
  profilePic: string;
  userName: string;
}

class SideBar extends Component<Props, sideMenuItems, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      profilePic: '',
      userName: '',
    };
  }

  onEditProfile() {
    this.props.onCloseMenu('Edit Profile');
  }

  onSelectedValue(value) {
    if (value == 'Content') {
      this.props.onCloseMenu('Content');
    } else if (value == 'Challenge') {
      this.props.onCloseMenu('Challenge');
    } else if (value == 'ContentForm') {
      this.props.onCloseMenu('ContentForm');
    } else if (value == 'UserProfile') {
      this.props.onCloseMenu('UserProfile');
    } else if (value == 'Format') {
      this.props.onCloseMenu('Format');
    }
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={this.onSelectedValue.bind(this, item.type)}>
        <View style={styles.row}>
          <Icon
            type={item.iconType}
            name={item.icon}
            style={{
              fontSize: windowWidth * 0.0516,
              color: 'white',
              marginRight: windowWidth * 0.036,
            }}
          />
          <Text style={styles.itemText}>{item.type}</Text>
        </View>
        <View style={styles.line}></View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <View style={styles.profilePicOutterView}>
            <View style={styles.profilePicView}>
              <ImageLoad
                isShowActivity={false}
                style={styles.profilePic}
                borderRadius={styles.profilePic.borderRadius}
                loadingStyle={{ size: "large", color: "blue" }}
                source={{ uri: this.state.profilePic }}
                placeholderSource={require("./../../assests/person-placeholder.png")}
                placeholderStyle={styles.profilePic}
              />
            </View>
          </View>
          <Text style={styles.nameStyle}>{this.state.userName}</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={this.onEditProfile.bind(this)}>
              <GoldBarView style={styles.editProfileButton}>
                <Text style={styles.editprofileText}>EDIT PROFILE</Text>
              </GoldBarView>
            </TouchableOpacity>
          </View> */}
          <View style={styles.menuItemsView}>
            <FlatList
              data={MenuItems}
              renderItem={this.renderItem.bind(this)}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({}), {})(SideBar);
