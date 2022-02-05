import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SectionList,
  Alert,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getPersonaliseInterests,
  sendUserInterests,
  showUserPersonaliseInterests,
} from '../../redux/actions/user';
import {color} from './../../theme';
import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Input, Button} from 'react-native-elements';
import {toUpper} from 'lodash';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {ScrollView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PersonaliseInterests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      numColumns: 2,
      interestsMainList: [],
    };
  }

  async componentDidMount() {
    try {
      let resultInterests = [];
      await this.props.getPersonaliseInterests();
      if (
        this.props.user.personaliseInterests.message ==
        'GET Request successful.'
      ) {

        this.props.user.personaliseInterests.result.map((res, i) => {
          resultInterests.push({
            _id: res.uid,
            title: res.name,
            data: res.subInterests,
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
        await this.props.showUserPersonaliseInterests(
          this.props.route.params.userId
        );
        if (
          this.props.user.userPersonaliseInterests.message ==
          'GET Request successful.'
        ) {
          let finalArray = [];
          this.props.user.userPersonaliseInterests.result.map((res, i) => {
            finalArray.push(res.subInterestId);
          });
          this.setState({selectedItems: finalArray});
        }
      }
    } catch (err) {
      console.log('getPersonaliseInterest_user', err);
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }
  async onMultiSelect(value, title) {
    const { selectedItems } = this.state;
    let index = selectedItems.findIndex(x=>x==value.id)
    if(index>-1){
      selectedItems.splice(index, 1);
    }
    else{
      selectedItems.push(value.id);
    }
    this.setState({selectedItems});
  }

  interestsSectionRender({item, index, section: {title}}) {
    var showActive = false;
    const { selectedItems } = this.state;
    let itemIndex = selectedItems.findIndex(x=>x==item.id);
    if(itemIndex>-1){
      showActive = true
    }

    return (
      <TouchableOpacity
        onPress={this.onMultiSelect.bind(this, item, title)}
        style={{
          margin: windowWidth * 0.0136,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: showActive ? color.appGreen : color.secondaryColor,
            margin: windowWidth * 0.0136,
            borderTopLeftRadius: windowWidth * 0.0136,
            borderTopRightRadius: windowWidth * 0.0136,
            borderBottomLeftRadius: windowWidth * 0.0136,
            borderBottomRightRadius: windowWidth * 0.0136,
            overflow: 'visible',
          }}>
          <Text
            style={{
              color: color.textColor,
              fontFamily: 'CenturyGothic',
              fontSize: windowWidth * 0.0416,
              padding: windowWidth * 0.016,
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  interestsSectionHeader(section) {
    const index = this.state.interestsMainList.lastIndexOf(section);

    return (
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.136,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: windowWidth * 0.036,
          paddingTop: index == 0 ? windowWidth * 0.096 : -windowWidth * 0.196,
        }}>
        <Text
          style={{
            color: 'black',
            fontFamily: 'CenturyGothic-Bold',
            fontSize: windowWidth * 0.0496,
          }}>
          {section.section.title}
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
          height: windowWidth * 0.16,
          backgroundColor: color.tonerGrey,
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: windowWidth - 28,
            height: windowWidth * 0.06,
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
            height: windowWidth * 0.06,
            backgroundColor: color.tonerGrey,
            flexDirection: 'column',
          }}></View>
        {index == 0 ? (
          <View
            style={{
              width: windowWidth - 28,
              height: windowWidth * 0.06,
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

  async onSubmit() {
    try {
      if (this.state.selectedItems.length == 0) {
        Alert.alert(
          'ClimateLink',
          'Choose atleast one interests',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        let data = {
          userId: this.props.route.params.userIntegerId, // update this field with user integer
          subInterestId: this.state.selectedItems,
        };
        await this.props.sendUserInterests(data);
        if (
          this.props.user.userInterests.message == 'POST Request successful.'
        ) {
          this.props.navigation.push('PersonalisePersona', {
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
                        Choose your interests
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
                        paddingTop: windowWidth * 0.0136,
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
  {getPersonaliseInterests, sendUserInterests, showUserPersonaliseInterests},
)(PersonaliseInterests);
