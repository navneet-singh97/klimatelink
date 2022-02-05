import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SectionList,
  Image,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getPersonaliseCategory,
  sendUserPersonalityCategory,
  showUserPersonaliseCategory,
} from '../../redux/actions/user';
import {color} from './../../theme';
import styles from './styles';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {ScrollView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PersonaliseGoalAndSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      numColumns: 2,
      interestsMainList: [],
      dict: {},
    };
  }

  async componentDidMount() {
    try {
      let resultInterests = [];
      await this.props.getPersonaliseCategory();
      if (
        this.props.user.personaliseCategory.message == 'GET Request successful.'
      ) {
        this.props.user.personaliseCategory.result.map((res, i) => {
          resultInterests.push({
            _id: res.uid,
            title: res.categoryName,
            data: res.subCategories,
            iconUri: res.categoryIcon,
          });
        });

        this.setState({
          interestsMainList: resultInterests,
        });
      }
    } catch (err) {
      console.log('getPersonaliseInterest_API_Err', err);
    }
    try {
      if (this.props.route.params.navigateFrom == 'Account') {
        let showSelectedResults = {};
        await this.props.showUserPersonaliseCategory(
          this.props.route.params.userId,
        );
        console.log(
          'getPersonaliseInterest_user',
          this.props.user.userPersonaliseCategories,
        );
        if (
          this.props.user.userPersonaliseCategories.message ==
          'GET Request successful.'
        ) {
          let {dict} = this.state;
          this.props.user.userPersonaliseCategories.result.map((res, i) => {
            res.subCategories.map((item, j) => {
              dict[item.uid] = true;
            });
          });
          this.setState({dict});
          console.log('dict_data_result', dict);
        }
      }
    } catch (err) {
      console.log('getPersonaliseInterest_user', err);
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  interestsSectionRender({item, index, section: {title}}) {
    var showActive = false;
    const {dict} = this.state;
    if (dict[item.uid]) {
      showActive = true;
    }
    return (
      <TouchableOpacity
        onPress={() => this.selectItems(item)}
        style={{
          marginVertical: windowWidth * 0.0136,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: showActive ? color.appGreen : color.secondaryColor,
            margin: windowWidth * 0.0136,
            borderRadius: windowWidth * 0.0136,
            marginLeft: windowWidth * 0.036,
          }}>
          {item.subcategoryIcon ? (
            <Image
              source={{uri: item.subcategoryIcon}}
              style={{
                height: 15,
                width: 15,
                marginLeft: windowWidth * 0.016,
              }}></Image>
          ) : null}
          <Text
            style={{
              color: color.textColor,
              fontFamily: 'CenturyGothic',
              fontSize: windowWidth * 0.0416,
              padding: windowWidth * 0.016,
            }}>
            {item.subcategoryName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  interestsSectionHeader({section}) {
    const index = this.state.interestsMainList.lastIndexOf(section);
    return (
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.136,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: windowWidth * 0.036,
          paddingTop: index == 0 ? windowWidth * 0.036 : 0,
          marginTop: index != 0 ? -windowWidth * 0.046 : 0,
        }}>
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: '#E8E8E8',
            marginRight: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: section.iconUri}}
            style={{height: 20, width: 20}}></Image>
        </View>
        <Text
          style={{
            color: 'black',
            fontFamily: 'CenturyGothic-Bold',
            fontSize: windowWidth * 0.0496,
          }}>
          {section.title}
        </Text>
      </View>
    );
  }

  interestsSectionFooter({section}) {
    const index = this.state.interestsMainList.lastIndexOf(section);

    return (
      <View
        style={{
          width: windowWidth - 28,
          height: windowWidth * 0.246,
          backgroundColor: color.tonerGrey,
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: windowWidth - 28,
            height: windowWidth * 0.084,
            backgroundColor: 'white',
            flexDirection: 'column',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: windowWidth * 0.036,
            borderBottomRightRadius: windowWidth * 0.036,
          }}></View>
        <View
          style={{
            width: windowWidth - 28,
            height: windowWidth * 0.08,
            backgroundColor: color.tonerGrey,
            flexDirection: 'column',
          }}></View>
        {index == 0 ? (
          <View
            style={{
              width: windowWidth - 28,
              height: windowWidth * 0.084,
              backgroundColor: 'white',
              flexDirection: 'column',
              borderTopLeftRadius: windowWidth * 0.036,
              borderTopRightRadius: windowWidth * 0.036,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}></View>
        ) : null}
      </View>
    );
  }

  selectItems = item => {
    let {dict} = this.state;
    if (dict[item.uid]) {
      dict[item.uid] = false;
    } else {
      dict[item.uid] = true;
    }
    this.setState({dict});
    console.log('selectItems.....', this.state.dict);
  };

  async onSubmit() {
    try {
      if (Object.keys(this.state.dict).length == 0) {
        Alert.alert(
          'ClimateLink',
          'Choose goals and skills',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        const {dict} = this.state;
        let subCategoryId = [];
        for (var key in dict) {
          if (dict[key]) {
            subCategoryId.push(key);
          }
        }
        let data = {
          userId: this.props.route.params.userId, // update this field with user integer
          subCategoryId: subCategoryId,
        };
        await this.props.sendUserPersonalityCategory(data);
        if (
          this.props.user.userPersonalityCategory.message ==
          'POST Request successful.'
        ) {
          this.props.navigation.push('PersonaliseInterests', {
            navigateFrom: this.props.route.params.navigateFrom,
            userId: this.props.route.params.userId,
            userIntegerId: this.props.route.params.userIntegerId,
          });
        }
      }
    } catch (err) {
      console.log('userIntresets_API_err:' + err);
    }
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: color.appGreen,
            height: windowHeight,
          }}
          forceInset={{bottom: 'never'}}>
          <View style={{}}></View>
          <View style={{flex: 1, backgroundColor: color.tonerGrey}}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>PERSONALISE</Text>
            </Header>

            <ScrollView style={{flex: 1}}>
              <View style={{flex: 1}}>
                <View style={styles.topContainer}>
                  <View
                    style={{
                      flexDirection: 'column',
                      // alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginTop: windowWidth * 0.0416,
                    }}>
                    <View>
                      <Text style={styles.commonBlackTitle}>
                        Choose your Goals & Skills
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.subTitle}>
                        Please select one or more tags
                      </Text>
                      {/* <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: windowWidth * 0.036,
                        }}>
                        <Icon
                          type="MaterialCommunityIcons"
                          name="sort-ascending"
                          style={styles.activityIcon}
                        />
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <View
                    style={{
                      minHeight: windowHeight / 3.36,
                      width: windowWidth - 29,
                      backgroundColor: 'transparent',
                      marginTop: -windowWidth * 0.19636,
                      alignSelf: 'center',
                      flexWrap: 'wrap',
                      // padding: windowHeight * 0.0136,
                    }}>
                    <SectionList
                      verticalScrollingDisabled={true}
                      contentContainerStyle={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        // paddingLeft: windowWidth * 0.0136,
                        overflow: 'visible',
                        borderRadius: windowWidth * 0.036,
                        alignItems: 'center',
                      }}
                      extraData={this.state}
                      sections={this.state.interestsMainList}
                      keyExtractor={(item, index) => item + index}
                      renderItem={this.interestsSectionRender.bind(this)}
                      renderSectionHeader={this.interestsSectionHeader.bind(
                        this,
                      )}
                      renderSectionFooter={this.interestsSectionFooter.bind(
                        this,
                      )}
                    />
                  </View>
                  {this.state.interestsMainList.length != 0 ? (
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={this.onSubmit.bind(this)}>
                      <Text style={styles.submitText}>NEXT</Text>
                    </TouchableOpacity>
                  ) : null}
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
    initial: state,
    user: state.user,
  }),
  {
    getPersonaliseCategory,
    sendUserPersonalityCategory,
    showUserPersonaliseCategory,
  },
)(PersonaliseGoalAndSkills);
