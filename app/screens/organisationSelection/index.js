import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import _ from 'lodash';
import {SearchBar, Divider} from 'react-native-elements';
import {color} from './../../theme';
import styles from './styles';
import {Button} from '../../components/button';
import {connect} from 'react-redux';
import {orgsList} from '../../redux/actions/certificates';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OrganisationsList = [
  {
    _id: 0,
    title: 'Infoeaze Digital Services',
    data: [
      {Id: 0, type: 'First Name : Sandeep'},
      {Id: 1, type: 'Last Name : Krishnappa'},
      {Id: 2, type: 'Desigination : Chief Product Officer'},
      {Id: 3, type: 'Start Date : 05/05/2018'},
      {Id: 4, type: 'End Date : 05/05/2019'},
      {Id: 5, type: 'Employee ID : 854535598'},
      {Id: 6, type: 'Salary : 50L'},
    ],
  },
  {
    _id: 1,
    title: 'SmartTech Solutions',
    data: [
      {Id: 7, type: 'First Name : Sandeep'},
      {Id: 8, type: 'Last Name : Krishnappa'},
      {Id: 9, type: 'Desigination : Head of Product Strategic'},
      {Id: 10, type: 'Start Date : 05/05/2017'},
      {Id: 11, type: 'End Date : 01/05/2018'},
      {Id: 12, type: 'Employee ID : 854535591'},
      {Id: 13, type: 'Salary : 40L'},
    ],
  },
  {
    _id: 2,
    title: 'Uniflow Software',
    data: [
      {Id: 14, type: 'First Name : Sandeep'},
      {Id: 15, type: 'Last Name : Krishnappa'},
      {Id: 16, type: 'Desigination : Senior Transformation Advisor'},
      {Id: 17, type: 'Start Date : 05/04/2016'},
      {Id: 18, type: 'End Date : 01/04/2017'},
      {Id: 19, type: 'Employee ID : 8545366661'},
      {Id: 20, type: 'Salary : 35L'},
    ],
  },
  {
    _id: 3,
    title: 'Digi Technologies',
    data: [
      {Id: 21, type: 'First Name : Sandeep'},
      {Id: 22, type: 'Last Name : Krishnappa'},
      {Id: 23, type: 'Desigination : Senior Advisor'},
      {Id: 24, type: 'Start Date : 19/04/2015'},
      {Id: 25, type: 'End Date : 01/04/2016'},
      {Id: 26, type: 'Employee ID : 85499991'},
      {Id: 27, type: 'Salary : 30L'},
    ],
  },
];

interface Props {
  navigation: any;
  orgsList: any;
}

interface OrgState {
  searchOrganisation: any;
  selectedOrgs: any;
  filterOrganisationList: any;
}

class OrganisationSelection extends Component<Props, OrgState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchOrganisation: '',
      selectedOrgs: [],
      filterOrganisationList: [],
    };
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    console.log('klllklk', this.props.orgsList());
  }

  async updateSearch(searchText) {
    this.setState({searchOrganisation: searchText});

    let filteredData = OrganisationsList.filter(function (item) {
      let value = item.title.toLowerCase();
      return value.includes(searchText.toLowerCase());
    });

    await this.setState({filterOrganisationList: filteredData});
    await console.log(
      'this.state.filteredData',
      this.state.filterOrganisationList,
    );
  }

  onSelectOrg(item) {
    var count = 0;
    if (this.state.selectedOrgs.length == 0) {
      this.state.selectedOrgs.push({
        _id: item._id,
        title: item.title,
        data: item.data,
      });
    } else {
      this.state.selectedOrgs.map((res, i) => {
        if (item._id == res._id) {
          this.state.selectedOrgs.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedOrgs.push({
          _id: item._id,
          title: item.title,
          data: item.data,
        });
      }
    }
    this.setState({selectedOrgs: this.state.selectedOrgs});
    console.log('this.state.selectedOrgs', this.state.selectedOrgs);
  }

  renderItem({item}) {
    var count = 0;
    var isCheck;

    this.state.selectedOrgs.map((res, i) => {
      if (res._id == item._id) {
        isCheck = true;
        count = count + 1;
      }
      if (count === 0) {
        isCheck = false;
      }
    });
    console.log('isCheck', isCheck);
    return (
      <View
        style={{
          width: windowWidth,
          height: windowWidth * 0.16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: windowWidth * 0.06,
        }}>
        <Text
          style={{
            color: !isCheck == true ? 'grey' : 'black',
            fontFamily: 'CenturyGothic',
            fontSize: windowWidth * 0.0416,
          }}>
          {item.title}
        </Text>
        <TouchableOpacity onPress={this.onSelectOrg.bind(this, item)}>
          <Icon
            type={'Ionicons'}
            name={!isCheck ? 'ios-square-outline' : 'ios-checkbox'}
            style={{
              fontSize: !isCheck ? windowWidth * 0.09 : windowWidth * 0.0736,
              color: !isCheck == true ? 'grey' : 'black',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onSelect() {
    if (this.state.selectedOrgs.length == 0) {
      'Consent',
        'Please select atleast one organisation',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false};
    } else {
      this.props.navigation.push('ShareCertificate', {
        navigateFrom: 'OrgsSelection',
        selectedOrganisation: this.state.selectedOrgs,
      });
    }
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <Header
          //notification
          onLeftPress={this.onLeft.bind(this)}
          // onRightPress={this.onNotification.bind(this)}
        >
          <Text>Organisation Selection</Text>
        </Header>
        <View style={{flexDirection: 'column'}}>
          <SearchBar
            placeholder="Type to filter ..."
            placeholderTextColor={color.textColor}
            onChangeText={this.updateSearch.bind(this)}
            value={this.state.searchOrganisation}
            inputStyle={styles.searchBarInputStyle}
            containerStyle={styles.searchBarContainer}
            round={false}
            inputContainerStyle={styles.searchBarInputContainer}
            lightTheme={true}
            onClear={() => {
              Keyboard.dismiss();
            }}
            searchIcon={
              <Icon
                type="Feather"
                name="search"
                style={{
                  fontSize: windowWidth * 0.06,
                  color: 'white',
                  alignSef: 'flex-end',
                }}
              />
            }
          />
        </View>
        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: windowWidth * 0.196}}
            data={
              this.state.searchOrganisation == ''
                ? OrganisationsList
                : this.state.filterOrganisationList
            }
            extraData={this.state}
            renderItem={this.renderItem.bind(this)}
          />
        </View>
        <View>
          <Button
            onPress={this.onSelect.bind(this)}
            buttonType="gradient"
            style={{marginHorizontal: windowWidth * 0.0316}}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'CenturyGothic',
                color: color.textColor,
                fontSize: windowWidth * 0.0416,
              }}>
              SELECT
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default connect(state => ({user: state.user}), {orgsList})(
  OrganisationSelection,
);
