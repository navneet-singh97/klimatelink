import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  StatusBar,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { Header } from '../../components/header';
import SafeAreaView from 'react-native-safe-area-view';

import { connect } from 'react-redux';
import { getData } from '../../redux/actions/initial';
import { ScrollView } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ImageBackground } from 'react-native';
import { color } from './../../theme/color';
import RtmAdapter from "../agora/rtm-adapter";
import {
  cred
} from "../agora/credentials";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let InstructorsList = [
  { id: 0, name: 'Monica Yang', rating: '4.8', reviews: '1435 reviews' },
  { id: 1, name: 'Jon', rating: '4.6', reviews: '19635 reviews' },
  { id: 2, name: 'Simpson', rating: '4.9', reviews: '1636 reviews' },
  { id: 3, name: 'Daisy Atkins', rating: '4.4', reviews: '1489 reviews' },
];

class ContentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InstructorsList: []
    };
    this.client = new RtmAdapter();
  }

  async componentDidMount() {
    await this.agorainit(uuidv4());
    const {result} = this.props.user.showAllUsers;
    //const me = this.props.user.userUId;
    if(result && result.length>0){
      //let allUsersButMe = result.filter(x=>x.uid!=me)
      this.setState({InstructorsList: [...result]})
    }
  }
  componentWillUnmount() {
    this.client.logout();
    this.client.destroy();
  }
  agorainit = async (uuid) => {
    //setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.theclimatelink.com//agora/rtm/" + uuid + "/",
        {
          method: "GET",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );

      const responseJson = await response.json();

      console.log(JSON.stringify(responseJson, null, 1), "ress")

      //setIsLoading(false);

      if (responseJson?.rtmToken) {
        cred.agora_app_token = responseJson.rtmToken;

        this.client.login(uuid, responseJson.rtmToken).then(() => {
          console.log("login success")
          //setLoginSuccess(true);
          // Alert.alert("Login", "Login success for chat room")
        });
      }
    } catch (err) {
      //setIsLoading(false);
      console.log(err, "init error");
      alert("Something went wrong. Please try later");
    }

  }
  navigateToAgoraChat = (item) => {
    let currentUser = this.state.InstructorsList.find(x=>x.uid==this.props.user.userUId)
    let arr = [currentUser.id, item.id];
    let channel = arr.sort().join().replace(",","");
    //this.props.navigation.push("AgoraChat", { token: cred.agora_app_token, channel, uid: "", name: item.name});
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  // renderItem({item}) {
  //   return (
  //     <View style={styles.row}>
  //       <Image
  //         source={require('../../Images/userImage.jpg')}
  //         style={styles.rowImage}
  //       />
  //       <View>
  //         <Text style={styles.instructorName}>{item.name}</Text>
  //         <View style={{flexDirection: 'row'}}>
  //           <Icon
  //             type="FontAwesome"
  //             name="star"
  //             style={[
  //               styles.topIcons,
  //               {color: '#ff9c2b', fontSize: windowWidth * 0.046},
  //             ]}
  //           />
  //           <Text style={styles.ratingText}>{item.rating}</Text>
  //           <Text style={styles.reviewText}>({item.reviews})</Text>
  //         </View>
  //       </View>
  //       <View style={{flexDirection: 'row'}}>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: 'transparent',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             marginRight: windowWidth * 0.0196,
  //           }}>
  //           <Icon
  //             type="Ionicons"
  //             name="ios-videocam"
  //             style={styles.activityIcon}
  //           />
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: 'transparent',
  //             alignItems: 'flex-end',
  //             justifyContent: 'center',
  //             marginHorizontal: windowWidth * 0.016,
  //             flex: 1
  //           }}>
  //           <Icon
  //             type="FontAwesome"
  //             name="commenting"
  //             style={styles.activityIcon}
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  renderItem = ({ item }) => {
    const me = this.props.user.userUId;
    return (
      <View>
        {
          item.profilePic && item.uid != me?
            <View key={item.uid} style={{ flexDirection: 'row', marginBottom: 8, marginHorizontal: windowWidth * 0.036 }}>
              <Image source={{ uri: item.profilePic }} style={{ height: 50, width: 50, marginRight: 16, borderRadius: 25 }} />
              <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
              <TouchableOpacity
                onPress={()=>this.navigateToAgoraChat(item)}
                style={{
                  flex: 1, alignItems: 'flex-end', paddingHorizontal: 10, justifyContent: 'center'
                }}>
                <Icon
                  type="FontAwesome"
                  name="commenting"
                  style={styles.activityIcon}
                />
              </TouchableOpacity>
            </View> : null
        }
      </View>
    )
  }

  render() {
    //const { navigate } = this.props
    const {InstructorsList} = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: color.appGreen }}
          forceInset={{ bottom: 'never' }}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>LIBRARY</Text>
            </Header>

            <ScrollView>
              <View style={styles.container}>
                <View style={styles.topContainer}>
                  <ImageBackground
                    style={{ flex: 1, backgroundColor: 'white', opacity: 0.9 }}
                    source={require('../../Images/podcastimageLib.png')}>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flex: 0.25,
                          borderWidth: 0,
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          justifyContent: 'flex-end',
                        }}>
                        {/* <TouchableOpacity>
                          <Icon
                            type="FontAwesome"
                            name="heart-o"
                            style={styles.topIcons}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Icon
                            type="Entypo"
                            name="dots-three-horizontal"
                            style={[
                              styles.topIcons,
                              {marginHorizontal: windowWidth * 0.036},
                            ]}
                          />
                        </TouchableOpacity> */}
                      </View>
                      <View
                        style={{
                          flex: 0.65,
                          borderWidth: 0,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-start',
                        }}>
                        <View style={{ padding: windowWidth * 0.036 }}>
                          <Text style={styles.mainTitle}>Introduction to </Text>
                          <Text style={styles.mainTitle}>carbon credits</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          borderWidth: 0,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                        }}>
                        <Text style={styles.lessonsTitle}>6 lessons </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'flex-end',
                          }}>
                          <Icon
                            type="FontAwesome"
                            name="star"
                            style={[
                              styles.topIcons,
                              {
                                color: '#ff9c2b',
                                fontSize: windowWidth * 0.0496,
                              },
                            ]}
                          />
                          <Text style={styles.lessonsTitle}>
                            4.8
                            <Text style={styles.reviewText}>
                              (1266 reviews)
                            </Text>
                          </Text>
                        </View>
                        <View style={{ marginHorizontal: windowWidth * 0.036 }} />
                        {/* <TouchableOpacity style={styles.followBtn}>
                        <Text style={styles.followText}>following</Text>
                      </TouchableOpacity> */}
                      </View>
                    </View>
                  </ImageBackground>
                </View>
                <View style={styles.bottomContainer}>
                  <View>
                    <Text style={styles.informations}>Informations</Text>
                    <Text
                      style={[
                        styles.informations,
                        { fontSize: windowWidth * 0.0416 },
                      ]}>
                      This is a quick introduction to the world of carbon
                      credits exploring how it can support critical
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.moreText}>more</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.5 }}>
                      <Text style={styles.commonGreyTitle}>Category</Text>
                      <Text style={styles.commonGreyTitle}>Required Level</Text>
                    </View>

                    <View style={{ flex: 0.5 }}>
                      <Text style={styles.commonBlackTitle}>
                        Energy Markets
                      </Text>
                      <Text style={styles.commonBlackTitle}>Beginner</Text>
                    </View>
                  </View>
                  {
                    InstructorsList && InstructorsList.length > 0 ?
                      <View>
                        <Text
                          style={[
                            styles.informations,
                            { marginTop: windowWidth * 0.06 },
                          ]}>
                          Contact
                        </Text>
                        <FlatList
                          data={InstructorsList}
                          renderItem={this.renderItem.bind(this)}
                          keyExtractor={item => item}
                          showsVerticalScrollIndicator={false}
                        />
                      </View> : null
                  }
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
export default connect(
  state => ({
    user: state.user,
  }),
  {},
)(ContentScreen);
