import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {CardView} from './../../components/cardView';
import _ from 'lodash';
import {color} from '../../theme';
import {Button} from '../../components/button';
import SafeAreaView from 'react-native-safe-area-view';
import {
  getCommunityPosts,
  addCommunityPost,
} from './../../redux/actions/communities';
import user, {uploadImage} from './../../redux/actions/user';
import {connect} from 'react-redux';
import moment from 'moment';
import {Pressable} from 'react-native';
import {Modal} from 'react-native';
import {TextInput} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native';
import {colors} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {}

interface evenState {
  searchEvent: any;
  filterEventList: any;
}

let ChoosePics = [
  {
    title: 'Take Photo',
    icon: 'camera',
  },
  {
    title: 'Choose from Gallery',
    icon: 'photo',
  },
];

const BASE_URL = 'https://api.klimatelink.com/api/v1/';

class CommunityPosts extends Component<Props, evenState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchEvent: '',
      filterEventList: [],
      eventList: [],
      communityId: this.props.route.params.communityId,
      memberId: this.props.route.params.userId,
      communityPosts: [],
      memberDetails: [],
      showAddPostModal: false,
      postTitle: '',
      postDescription: '',
      postImage: '',
      uploadImageModal: false,
    };
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    console.log(
      'This is the data from props',
      this.props.route.params.userId,
      'and',
      this.props.route.params.communityId,
    );
    await this.props.getCommunityPosts(this.state.communityId);
    const communityPosts = this.props.communities.communityPosts.result
      .communityPosts;
    const memberDetails = this.props.communities.communityPosts.result
      .memberDetails;
    console.log('Community details', communityPosts);
    console.log('Member Details', memberDetails);
    this.setState({
      communityPosts: communityPosts.reverse(),
      memberDetails: memberDetails,
    });
    //  await addCommunityPost();
    // let reqObj = {
    //   communityDetailId: this.props.route.params.communityId,
    //   memberId: this.props.route.params.userId,
    //   heading: 'This is the post',
    //   details: 'These are the post details',
    //   attachments: 'These are the post attachments',
    // };
    // await this.props.addCommunityPost(reqObj);
  }

  loadPosts = async () => {
    await this.props.getCommunityPosts(this.state.communityId);
    const communityPosts = this.props.communities.communityPosts.result
      .communityPosts;
    const memberDetails = this.props.communities.communityPosts.result
      .memberDetails;
    console.log('Community details', communityPosts);
    console.log('Member Details', memberDetails);
    this.setState({
      communityPosts: communityPosts.reverse(),
      memberDetails: memberDetails,
    });
  };

  addCommunityPost = async () => {
    if (this.state.postTitle === '') {
      alert('Please add a title to continue');
    } else if (this.state.postDescription === '') {
      alert('Please add a description to continue');
    } else {
      this.setState({showAddPostModal: false});
      if (this.state.postImage && this.state.postImage != '') {
        let reqObj = {
          communityDetailId: this.props.route.params.communityId,
          memberId: this.props.route.params.userId,
          heading: this.state.postTitle,
          details: this.state.postDescription,
          attachments: this.props.user.uploadImage.result,
        };
        await this.props.addCommunityPost(reqObj);
        const {communityInformation} = this.props.communities;
        console.log('This is the props', communityInformation.result);
        const response = await fetch(
          BASE_URL + 'chatmaster/community/' + communityInformation.result.uid,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const responseJson = await response.json();
        console.log(
          'This is the response',
          responseJson.result.participantInfos,
        );
        let participants = responseJson.result.participantInfos;
        let arrFCMTokens = [];
        arrFCMTokens = participants.map((item, index) => {
          return item.fcmToken;
        });
        let fcmArray = [];
        arrFCMTokens.forEach(element => {
          fcmArray.push({
            deviceToken: element,
            title: 'A new post added to ' + communityInformation.result.title,
            // body: this.state.myName+' added you to the new group'+this.state.groupName,
          });
        });
      } else {
        let reqObj = {
          communityDetailId: this.props.route.params.communityId,
          memberId: this.props.route.params.userId,
          heading: this.state.postTitle,
          details: this.state.postDescription,
          attachments: '',
        };
        await this.props.addCommunityPost(reqObj);
        const {communityInformation} = this.props.communities;
        console.log('This is the props', communityInformation.result);
        const response = await fetch(
          BASE_URL + 'chatmaster/community/' + communityInformation.result.uid,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const responseJson = await response.json();
        console.log(
          'This is the response',
          responseJson.result.participantInfos,
        );
        let participants = responseJson.result.participantInfos;
        let arrFCMTokens = [];
        arrFCMTokens = participants.map((item, index) => {
          return item.fcmToken;
        });
        let fcmArray = [];
        arrFCMTokens.forEach(element => {
          fcmArray.push({
            deviceToken: element,
            title: 'A new post added to ' + communityInformation.result.title,
            // body: this.state.myName+' added you to the new group'+this.state.groupName,
          });
        });
      }
      this.setState({postTitle: '', postDescription: '', postImage: ''});
      this.loadPosts();
    }
  };

  async onChoosePic(val) {
    if (val === 'Take Photo') {
      this.setState({uploadImageModal: false});
      setTimeout(async () => {
        await this.onSelectCamera();
      }, 1000);
    } else {
      this.setState({uploadImageModal: false});
      setTimeout(async () => {
        await this.onSelectGallery();
      }, 1000);
    }
  }

  async onSelectCamera() {
    ImagePicker.openCamera({
      width: windowWidth / 1.12,
      height: windowWidth / 1.536,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log('onSelectCamera', image);
        this.props.uploadImage(image.data);
        this.setState({postImage: image.path});
      })
      .catch(error => {
        console.log('onSelectCamera_error', error);
      });
  }

  async onSelectGallery() {
    ImagePicker.openPicker({
      width: windowWidth / 1.12,
      height: windowWidth / 1.536,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log('onSelectCamera', image);
        this.props.uploadImage(image.data);
        this.setState({postImage: image.path});
      })
      .catch(error => {
        console.log('onSelectCamera_error', error);
      });
  }

  onAddPostPress = () => {
    this.setState({showAddPostModal: true});
  };

  renderItem({item}) {
    let currentPostMember = this.state.memberDetails.find(x => {
      return x.id == item.memberId;
    });
    return (
      <View
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 8,
          paddingHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={{uri: currentPostMember.profilePic}}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: 'Roboto',
                fontSize: 16,
                color: '#777777',
              }}>
              {currentPostMember.memberName}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Roboto',
              color: '#777777',
              fontSize: 10,
            }}>
            15 min
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontFamily: 'Roboto',
              color: '#a7a7a7',
              fontSize: 14,
            }}>
            {item.details}
          </Text>
        </View>
        {item.attachments ? (
          <Image
            source={{uri: item.attachments}}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 12,
              marginTop: 10,
            }}></Image>
        ) : null}
        {/* <View
          style={{
            flexDirection: 'row',
            width: '50%',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Icon
            type={'AntDesign'}
            name={'hearto'}
            // style={{
            //   fontSize: windowWidth * 0.069,
            //   color: changeApperance ? 'white' : 'white',
            //   alignSelf: 'center',
            //   marginLeft: createGroup ? 6 : 0,
            // }}
          />
          <Icon
            type={'FontAwesome'}
            name={'comment-o'}
            // style={{
            //   fontSize: windowWidth * 0.069,
            //   color: changeApperance ? 'white' : 'white',
            //   alignSelf: 'center',
            //   marginLeft: createGroup ? 6 : 0,
            // }}
          />
        </View> */}
      </View>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={{flex: 1}}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <Header
            textStyle={{fontWeight: '700'}}
            createGroup
            createGroupFontName="bell"
            customBackIcon={true}
            onPressCreateGroup={() => {
              console.log('Right icon pressed');
            }}
            onLeftPress={this.onLeft.bind(this)}>
            COMMUNITY POST
          </Header>
          <View style={{flex: 1, backgroundColor: '#ffffff'}}>
            <View
              style={{
                height: 50,
                width: '100%',
                padding: 10,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.onAddPostPress();
                }}>
                <Icon type={'Entypo'} name={'add-to-list'} />
              </TouchableOpacity>
            </View>
            <FlatList
              contentContainerStyle={{paddingBottom: 160}}
              data={this.state.communityPosts}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={true}
            />
            <View></View>
          </View>
        </SafeAreaView>
        <Modal visible={this.state.showAddPostModal} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'flex-end',
            }}>
            <Pressable
              style={{flex: 0.4}}
              onPress={() => {
                this.setState({showAddPostModal: false});
              }}
            />
            <ScrollView
              style={{
                flex: 0.6,
                // height:'70%',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: '#ffffff',
              }}>
              <View
                style={{
                  // flex: 1,
                  // width: '100%',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <TextInput
                  style={{
                    height: 50,
                    width: '80%',
                    borderWidth: 1,
                    borderColor: '#e3e3e3',
                    borderRadius: 5,
                  }}
                  placeholder="Title"
                  onChangeText={text => {
                    this.setState({postTitle: text});
                  }}
                />
                <TextInput
                  style={{
                    height: 50,
                    width: '80%',
                    borderWidth: 1,
                    borderColor: '#e3e3e3',
                    borderRadius: 5,
                    marginTop: 20,
                  }}
                  placeholder="Description"
                  onChangeText={text => {
                    this.setState({postDescription: text});
                  }}
                />
                <Pressable
                  style={{
                    height: 200,
                    width: '80%',
                    borderWidth: 1,
                    borderColor: '#e3e3e3',
                    borderRadius: 5,
                    marginTop: 20,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.setState({uploadImageModal: true});
                  }}>
                  {this.state.postImage ? (
                    <Image
                      source={{uri: this.state.postImage}}
                      style={{flex: 1}}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text
                      style={{
                        color: this.state.postImage ? '#777777' : '#c7c7cd',
                        marginLeft: 5,
                      }}>
                      Image
                    </Text>
                  )}
                </Pressable>
              </View>
              <TouchableOpacity
                style={{
                  width: '80%',
                  marginBottom: 10,
                  backgroundColor: '#aa000077',
                  padding: 20,
                  borderRadius: 8,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.addCommunityPost();
                }}>
                <Text style={{fontSize: 14, color: '#ffffff'}}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
            {Platform.OS == 'ios' ? (
              <Modal visible={this.state.uploadImageModal} transparent={true}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    padding: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      height: '45%',
                      borderRadius: 20,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                        // height: windowWidth * 0.1346,
                        // flex: 0.45,
                      }}>
                      <Text
                        style={{
                          color: color.appGreen,
                          fontSize: windowWidth * 0.0469,
                          alignSelf: 'center',
                          fontFamily: 'CenturyGothic-Bold',
                          // paddingVertical: windowWidth * 0.16,
                        }}>
                        Select an image to upload
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: windowWidth * 0.06,
                        marginBottom: windowWidth * 0.096,
                      }}>
                      {ChoosePics.map(res => {
                        return (
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: windowWidth * 0.0516,
                              borderRadius: windowWidth * 0.06,
                              borderWidth: 1,
                              borderColor: '#e3e3e3',
                              padding: 10,
                              backgroundColor: color.secondaryColor,
                            }}
                            onPress={this.onChoosePic.bind(this, res.title)}>
                            <Text
                              style={{
                                color: '#ffffff',
                                fontSize: windowWidth * 0.0436,
                                fontFamily: 'CenturyGothic-Bold',
                              }}>
                              {res.title}
                            </Text>
                            <Icon
                              type="FontAwesome"
                              name={res.icon}
                              style={{color: '#ffffff'}}
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                    <TouchableOpacity
                      style={{
                        width: windowWidth / 1.6,
                        height: windowWidth / 9,
                        backgroundColor: '#ffffff',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: windowWidth * 0.06,
                        borderRadius: windowWidth * 0.06,
                        borderWidth: 1,
                        borderColor: color.secondaryColor,
                      }}
                      onPress={() => this.setState({uploadImageModal: false})}>
                      <Text
                        style={{
                          color: color.secondaryColor,
                          fontSize: windowWidth * 0.0419,
                          alignSelf: 'center',
                          fontFamily: 'CenturyGothic-Bold',
                          paddingHorizontal: windowWidth * 0.06,
                          paddingVertical: windowWidth * 0.016,
                        }}>
                        CANCEL
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            ) : null}
            {/* </View> */}
          </View>
        </Modal>
        <Modal visible={this.state.uploadImageModal} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              padding: 20,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: '45%',
                borderRadius: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  // height: windowWidth * 0.1346,
                  // flex: 0.45,
                }}>
                <Text
                  style={{
                    color: color.appGreen,
                    fontSize: windowWidth * 0.0469,
                    alignSelf: 'center',
                    fontFamily: 'CenturyGothic-Bold',
                    // paddingVertical: windowWidth * 0.16,
                  }}>
                  Select an image to upload
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: windowWidth * 0.06,
                  marginBottom: windowWidth * 0.096,
                }}>
                {ChoosePics.map(res => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: windowWidth * 0.0516,
                        borderRadius: windowWidth * 0.06,
                        borderWidth: 1,
                        borderColor: '#e3e3e3',
                        padding: 10,
                        backgroundColor: color.secondaryColor,
                      }}
                      onPress={this.onChoosePic.bind(this, res.title)}>
                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: windowWidth * 0.0436,
                          fontFamily: 'CenturyGothic-Bold',
                        }}>
                        {res.title}
                      </Text>
                      <Icon
                        type="FontAwesome"
                        name={res.icon}
                        style={{color: '#ffffff'}}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <TouchableOpacity
                style={{
                  width: windowWidth / 1.6,
                  height: windowWidth / 9,
                  backgroundColor: '#ffffff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: windowWidth * 0.06,
                  borderRadius: windowWidth * 0.06,
                  borderWidth: 1,
                  borderColor: color.secondaryColor,
                }}
                onPress={() => this.setState({uploadImageModal: false})}>
                <Text
                  style={{
                    color: color.secondaryColor,
                    fontSize: windowWidth * 0.0419,
                    alignSelf: 'center',
                    fontFamily: 'CenturyGothic-Bold',
                    paddingHorizontal: windowWidth * 0.06,
                    paddingVertical: windowWidth * 0.016,
                  }}>
                  CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default connect(
  state => ({
    communities: state.communities,
    user: state.user,
  }),
  {getCommunityPosts, addCommunityPost, uploadImage},
)(CommunityPosts);
