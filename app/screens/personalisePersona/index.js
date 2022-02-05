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
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {getPersonas, sendUserPersona, getSelectedPersona} from '../../redux/actions/user';
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

let resultChallenges = [
  {
    id: 0,
    title: 'Explorer',
    description: 'Lorem Ipsum has been the industrys standard dummy text ',
  },
  {
    id: 1,
    title: 'Influncer',
    description: 'Lorem Ipsum has been the industrys standard dummy text',
  },
];

class PersonalisePersona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPersona: [],
      personasMainList: [],
    };
  }

  async componentDidMount() {
    try {
      await this.props.getPersonas();
      if (this.props.user.personasList.message == 'GET Request successful.') {
        this.setState({personasMainList: this.props.user.personasList.result});
      }
      await this.props.getSelectedPersona(this.props.user.userUId)
      const {selectedPersona} = this.props.user;
      if(selectedPersona && selectedPersona.message == "GET Request successful."){
        const { result } = this.props.user.personasList;
        let personaList = [];
        if(selectedPersona.result && selectedPersona.result.length > 0){
          selectedPersona.result.map((res,i)=>{
            let persona = result.find(x=>x.id == res.personaId);
            personaList.push(persona);
          })
        }
        this.setState({selectedPersona: [...personaList]});
      }
    } catch (err) {
      console.log('getPersonas_API_Err', err);
    }
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  async onSubmit() {
    try {
      if (this.state.selectedPersona.length == 0) {
        Alert.alert(
          'ClimateLink',
          'Choose atleast one persona',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else {
        let personaIdArray = [];
        this.state.selectedPersona.map((res, i) => {
          personaIdArray.push(res.id);
        });
        console.log('selectedItems_123:' + JSON.stringify(personaIdArray));

        let data = {
          userId: this.props.route.params.userIntegerId, // update this field with user integer
          personaId: personaIdArray,
        };

        await this.props.sendUserPersona(data);
        if (
          this.props.user.userPersonas.message == 'POST Request successful.'
        ) {
          this.props.navigation.push('Main', {
            userId: this.props.route.params.userId,
            userIntegerId: this.props.route.params.userIntegerId,
          });
        }
      }
    } catch (err) {
      console.log('sendUserPersona_catch', err);
    }
  }

  onSelectMultiButton(item) {
    let count = 0;
    if (this.state.selectedPersona.length == 0) {
      this.state.selectedPersona.push(item);
    } else {
      this.state.selectedPersona.map((res, i) => {
        if (item.uid == res.uid) {
          this.state.selectedPersona.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedPersona.push(item);
      }
    }
    this.setState({selectedPersona: this.state.selectedPersona});
    console.log('this.state.selectedPersona', this.state.selectedPersona);
  }

  renderItem({item}) {
    var count = 0;
    var showActive;

    this.state.selectedPersona.map((res, i) => {
      if (res.uid == item.uid) {
        showActive = true;
        count = count + 1;
      }
      if (count === 0) {
        showActive = false;
      }
    });
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onSelectMultiButton.bind(this, item)}
        style={{
          backgroundColor: 'white',
          borderRadius: windowWidth * 0.036,
          padding: windowWidth * 0.036,
          marginBottom: windowWidth * 0.06,
          //borderWidth: showActive ? 1.6 : 0.6,
          borderColor: showActive ? color.secondaryColor : color.appGreen,
        }}>
        {showActive ? (
          <Icon
            type="MaterialCommunityIcons"
            name="checkbox-marked"
            style={{fontSize: windowWidth * 0.06, color: color.secondaryColor}}
          />
        ) : null}

        <View
          style={{flexDirection: 'row', marginVertical: windowWidth * 0.0136}}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              borderWidth: 0.36,
              borderRadius: windowWidth * 0.0316,
            }}>
            <Image source={{uri: item.logoUrl}} style={styles.rowImage} />
          </View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'column',
              marginLeft: windowWidth * 0.036,
            }}>
            <Text style={styles.rowTitle}>{item.name}</Text>
            <Text style={styles.rowDescription}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={{}}></View>
          <View style={{flex: 1, backgroundColor: color.tonerGrey}}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>PERSONALISE</Text>
            </Header>
            <ScrollView style={{flex: 1}}>
              <View style={{flex: 1, backgroundColor: color.background}}>
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
                        Choose your persona
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.subTitle}>Please select persona</Text>

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
                      minHeight: windowHeight / 1.36,
                      width: windowWidth - 30,
                      backgroundColor: 'transparent',
                      marginTop: -windowWidth * 0.36,
                      alignSelf: 'center',
                    }}>
                    <FlatList
                      contentContainerStyle={{
                        paddingBottom: windowWidth * 0.036,
                      }}
                      data={this.state.personasMainList}
                      extraData={this.state}
                      renderItem={this.renderItem.bind(this)}
                      keyExtractor={item => item}
                    />
                  </View>
                </View>
              </View>
              {this.state.personasMainList.length != 0 ? (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this.onSubmit.bind(this)}>
                  <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>
              ) : null}
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
  {getPersonas, sendUserPersona, getSelectedPersona},
)(PersonalisePersona);
