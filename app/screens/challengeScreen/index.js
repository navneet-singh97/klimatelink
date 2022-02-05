import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {getData} from '../../redux/actions/initial';
import {color} from './../../theme';
import styles from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {Input, Button} from 'react-native-elements';
import {toUpper} from 'lodash';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {ScrollView} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {SearchBar} from 'react-native-elements';
import Modal from 'react-native-modal';
let _ = require('lodash');
import {Dropdown} from 'react-native-material-dropdown-v2';
import {connect} from 'react-redux';
import {getJobsList} from '../../redux/actions/jobs';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let resultChallenges = [
  {
    id: 0,
    title: 'Green Funding Challenge - Financial Analyst',
    experience: '1 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'London',
    job: 'Voluntary',
    experienceValue: 1,
    jobType: 'Voluntary',
  },
  {
    id: 1,
    title: 'Energy Market Challenge - Blockchain Analyst',
    experience: '2 years of experience',
    role: 'Smart Contract, Confidential Computing',
    location: 'Paris',
    job: '£3500 - £8000',
    experienceValue: 2,
    jobType: 'Paid',
  },
  {
    id: 2,
    title: 'Energy Market Challenge - Blockchain Analyst',
    experience: '3 years of experience',
    role: 'Smart Contract, Confidential Computing',
    location: 'New York',
    job: '£3500 - £8000',
    experienceValue: 3,
    jobType: 'Paid',
  },
  {
    id: 3,
    title: 'Blue Funding Challenge - Financial Analyst',
    experience: '4 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'Hong Kong',
    job: 'Voluntary',
    experienceValue: 4,
    jobType: 'Voluntary',
  },
  {
    id: 4,
    title: 'Blue Funding Challenge - Financial Analyst',
    experience: '5 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'Dubai',
    job: 'Voluntary',
    experienceValue: 5,
    jobType: 'Voluntary',
  },
  {
    id: 5,
    title: 'Blue Funding Challenge - Financial Analyst',
    experience: '6 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'Singapore',
    job: 'Voluntary',
    experienceValue: 6,
    jobType: 'Voluntary',
  },
  {
    id: 6,
    title: 'Blue Funding Challenge - Financial Analyst',
    experience: '7 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'Rome',
    job: 'Voluntary',
    experienceValue: 7,
    jobType: 'Voluntary',
  },
  {
    id: 7,
    title: 'Blue Funding Challenge - Financial Analyst',
    experience: '8 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'London,UK',
    job: 'Macau',
    experienceValue: 8,
    jobType: 'Voluntary',
  },
  {
    id: 8,
    title: 'Blue Funding Challenge - Financial Analyst',
    experience: '9 years of experience',
    role: 'Financial Modelling, Project Cost Estimation',
    location: 'Istanbul',
    job: 'Voluntary',
    experienceValue: 9,
    jobType: 'Voluntary',
  },
];

let experienceType = [
  {
    value: 0,
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
];

let jobTypeFilter = [
  {
    value: 'Paid',
  },
  {
    value: 'Voluntry',
  },
];

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challengesList: [
        'London',
        'Paris',
        'New York',
        'Hong Kong',
        'Dubai',
        'Singapore',
        'Rome',
        'Macau',
        'Istanbul',
      ],
      selectedChallenges: [],
      challengeType: '',
      searchValue: '',
      filteredData: [],
      filterModal: false,
      jobsList: resultChallenges,
      minExp: null,
      maxExp: null,
      listOfJobs: [],
      jobType: '',
      showFilteredResults: false,
      minexpValues: [],
      maxexpValues: [],
    };
  }

  async componentDidMount() {
    try {
      await this.props.getJobsList();
      if (this.props.jobs) {
        const {result} = this.props.jobs.jobsList;
        let locations = [];
        let minExpValues = [];
        let maxExpValues = [];
        result.forEach(element => {
          let index = locations.findIndex(x => x == element.location);
          if (index < 0) {
            locations.push(element.location);
          }
          let index2 =
            minExpValues && minExpValues.length > 0
              ? minExpValues.findIndex(x => x.value == element.minExperience)
              : -1;
          if (index2 < 0) {
            minExpValues.push({value: element.minExperience});
          }
          let index3 =
            maxExpValues && maxExpValues.length > 0
              ? maxExpValues.findIndex(x => x.value == element.maxExperience)
              : -1;
          if (index3 < 0) {
            maxExpValues.push({value: element.maxExperience});
          }
        });
        console.log(maxExpValues, minExpValues);
        this.setState({
          listOfJobs: [...result],
          challengesList: [...locations],
          minexpValues: [...minExpValues],
          maxexpValues: [...maxExpValues],
        });
      }
      console.log('listOfJobs', this.props.jobs.jobsList.result);
    } catch (err) {
      console.log('componentDidMount_err_getJobsList', err);
    }
  }

  async onAppyFilter() {
    const {minExp, maxExp, selectedChallenges, jobType} = this.state;
    const allJobs = [...this.state.listOfJobs];
    let filteredJobs = [];
    if (minExp && allJobs.length > 0) {
      let myJobs = allJobs.filter(
        x => x.minExperience == minExp || x.minExperience > minExp,
      );
      if (myJobs && myJobs.length > 0) {
        myJobs.forEach(element => {
          let index = allJobs.findIndex(x => x.uid == element.uid);
          if (index > -1) {
            allJobs.splice(index, 1);
          }
        });
      }
      filteredJobs = [...filteredJobs, ...myJobs];
    }
    if (maxExp && allJobs.length > 0) {
      let myJobs = allJobs.filter(x => x.maxExperience == maxExp);
      filteredJobs = [...filteredJobs, ...myJobs];
      if (myJobs && myJobs.length > 0) {
        myJobs.forEach(element => {
          let index = allJobs.findIndex(x => x.uid == element.uid);
          if (index > -1) {
            allJobs.splice(index, 1);
          }
        });
      }
      filteredJobs = [...filteredJobs, ...myJobs];
    }
    if (jobType && allJobs.length > 0) {
      let myJobs = [];
      if (jobType == 'Paid') {
        myJobs = allJobs.filter(x => x.isPaid == true);
      } else {
        myJobs = allJobs.filter(x => x.isPaid == false);
      }
      if (myJobs && myJobs.length > 0) {
        myJobs.forEach(element => {
          let index = allJobs.findIndex(x => x.uid == element.uid);
          if (index > -1) {
            allJobs.splice(index, 1);
          }
        });
      }
      filteredJobs = [...filteredJobs, ...myJobs];
    }
    if (selectedChallenges.length > 0 && allJobs.length > 0) {
      let myJobs = [];
      selectedChallenges.forEach(element => {
        myJobs = [...myJobs, ...allJobs.filter(x => x.location == element)];
      });
      if (myJobs && myJobs.length > 0) {
        myJobs.forEach(element => {
          let index = allJobs.findIndex(x => x.uid == element.uid);
          if (index > -1) {
            allJobs.splice(index, 1);
          }
        });
      }
      filteredJobs = [...filteredJobs, ...myJobs];
    }
    this.setState({
      filteredData: filteredJobs,
      showFilteredResults: true,
      filterModal: false,
    });
  }

  onJobType(value) {
    this.setState({jobType: value});
    let communnityText;
    let getFilterJobType = this.state.jobsList.filter(function (item) {
      communnityText = item.jobType.toLowerCase();
      return communnityText.includes(value.toLowerCase());
    });
    this.setState({jobsList: getFilterJobType});
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  onSubmit() {}

  onSelectMultiButton(item) {
    this.setState({challengeType: item});
    let count = 0;
    if (this.state.selectedChallenges.length == 0) {
      this.state.selectedChallenges.push(item);
    } else {
      this.state.selectedChallenges.map((res, i) => {
        if (item == res) {
          this.state.selectedChallenges.splice(i, 1);
          count++;
        }
      });
      if (count == 0) {
        this.state.selectedChallenges.push(item);
      }
    }
    this.setState({selectedChallenges: this.state.selectedChallenges});
    console.log('this.state.selectedChallenges', this.state.selectedChallenges);
  }

  renderItem({item}) {
    var count = 0;
    var showActive = false;

    this.state.selectedChallenges.map((res, i) => {
      if (res == item) {
        showActive = true;
        count = count + 1;
      }
      if (count === 0) {
        showActive = false;
      }
    });
    return (
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginLeft: windowWidth * 0.0136,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            borderWidth: 1,
            borderColor: showActive ? 'black' : 'white',
            borderRadius: windowWidth * 0.0136,
            margin: windowWidth * 0.0136,
            backgroundColor: showActive ? color.appGreen : color.secondaryColor,
          }}
          onPress={this.onSelectMultiButton.bind(this, item)}>
          <Text style={styles.multiBtnText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onSelectJob(item) {
    this.props.navigation.push('JobExpressInterest');
  }

  renderChallengeItem({item}) {
    return (
      <TouchableOpacity
        onPress={this.onSelectJob.bind(this, item)}
        style={{
          backgroundColor: 'white',
          borderRadius: windowWidth * 0.036,
          padding: windowWidth * 0.036,
          marginBottom: windowWidth * 0.06,
          borderWidth: windowWidth * 0.00136,
          borderColor: color.appGreen,
        }}>
        <Text style={styles.listTitle}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: windowWidth * 0.0136,
          }}>
          <View style={styles.iconView}>
            <Icon type="FontAwesome" name="suitcase" style={styles.rowIcon} />
          </View>
          <Text style={styles.rowText}>
            {item.minExperience}-{item.maxExperience}years of experience
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: windowWidth * 0.0136,
          }}>
          <View style={styles.iconView}>
            <Icon type="FontAwesome" name="pencil" style={styles.rowIcon} />
          </View>
          <Text style={styles.rowText}>{item.jobDesc}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: windowWidth * 0.0136,
          }}>
          <View style={styles.iconView}>
            <Icon type="Ionicons" name="location" style={styles.rowIcon} />
          </View>
          <Text style={styles.rowText}>{item.location}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: windowWidth * 0.0136,
          }}>
          <View style={styles.iconView}>
            <Icon type="Foundation" name="pound" style={styles.rowIcon} />
          </View>
          <Text style={styles.rowText}>
            {item.isPaid == true ? item.salary : 'Voluntary'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  onSort(item) {
    let newSortArr = _.orderBy(resultChallenges, ['experience'], [item]);
    this.setState({jobsList: newSortArr});
  }

  async updateSearch(searchText) {
    this.setState({searchValue: searchText});
    let communnityText;
    let filteredData = this.state.listOfJobs.filter(function (item) {
      communnityText = item.name.toLowerCase();
      return communnityText.startsWith(searchText.toLowerCase());
    });

    await this.setState({filteredData: filteredData});
    await console.log('this.state.filteredData', this.state.filteredData);
  }

  renderAccessory() {
    return (
      <Icon
        type="MaterialIcons"
        name="arrow-drop-down"
        style={styles.dropdownArrow}
      />
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <View style={styles.container}>
            <Header onLeftPress={this.onLeft.bind(this)}>
              <Text>JOBS</Text>
            </Header>
            <ScrollView style={{flex: 1}}>
              <View style={{flex: 1}}>
                <View style={styles.topContainer}>
                  <View>
                    <SearchBar
                      placeholder="Search..."
                      onChangeText={this.updateSearch.bind(this)}
                      value={this.state.searchValue}
                      placeholderTextColor="black"
                      inputStyle={{
                        fontFamily: 'CenturyGothic',
                        color: 'black',
                      }}
                      containerStyle={styles.searchBarContainer}
                      round={false}
                      inputContainerStyle={{
                        backgroundColor: color.secondaryColor,
                        borderWidth: 1,
                        borderBottomWidth: 1,
                        borderRadius: windowWidth * 0.06,
                        marginLeft: windowWidth * 0.036,
                      }}
                      lightTheme={true}
                      onClear={() => {
                        Keyboard.dismiss();
                      }}
                      searchIcon={{
                        size: windowWidth * 0.06,
                        color: 'black',
                        alignSelf: 'flex-end',
                      }}
                      clearIcon={{size: windowWidth * 0.06, color: 'black'}}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      // alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginTop: windowWidth * 0.036,
                    }}>
                    <View>
                      <Text style={styles.commonBlackTitle}>
                        Green Opportunities
                      </Text>
                      <Text style={styles.subTitle}>
                        Total{' '}
                        {this.state.searchValue ||
                        this.state.showFilteredResults
                          ? this.state.filteredData.length
                          : this.state.listOfJobs.length}{' '}
                        challenges found
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: windowWidth * 0.036,
                      }}
                      onPress={() =>
                        this.setState({filterModal: !this.state.filterModal})
                      }>
                      <Icon
                        type="MaterialCommunityIcons"
                        name="sort-ascending"
                        style={styles.activityIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <View
                    style={{
                      minHeight: windowHeight / 1.36,
                      width: windowWidth - 30,
                      backgroundColor: 'transparent',
                      marginTop: -windowWidth * 0.1646,
                      alignSelf: 'center',
                    }}>
                    <FlatList
                      contentContainerStyle={{
                        paddingBottom: windowWidth * 0.036,
                      }}
                      data={
                        this.state.searchValue || this.state.showFilteredResults
                          ? this.state.filteredData
                          : this.state.listOfJobs
                      }
                      //extraData={this.state}
                      renderItem={this.renderChallengeItem.bind(this)}
                      keyExtractor={item => item}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                  {/* <View
                    style={{
                      width: windowWidth - windowWidth * 0.06,
                      height: 60,
                      backgroundColor: 'yellow',
                      alignSelf: 'center',
                      marginBottom: windowWidth * 0.036,
                    }}></View> */}
                </View>
              </View>
              <Modal
                isVisible={this.state.filterModal}
                onBackdropPress={() => this.setState({filterModal: false})}>
                <View style={styles.modalBox}>
                  <ScrollView
                    style={{
                      flexDirection: 'column',
                      marginTop: windowWidth * 0.096,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        width: windowWidth,
                      }}>
                      <View
                        style={{
                          flex: 0.214,
                          flexDirection: 'column',
                          borderWidth: 0,
                        }}>
                        <Text style={styles.filterTitle}>Experience</Text>
                        <View style={styles.sepDropdown}>
                          <View style={{flex: 0.5, flexDirection: 'column'}}>
                            <Text style={styles.inputLabel}>Min</Text>
                            <View style={{flexDirection: 'row'}}>
                              <Dropdown
                                label=""
                                data={this.state.minexpValues}
                                lineWidth={0}
                                value={this.state.minExp}
                                right={this.renderAccessory()}
                                containerStyle={{
                                  width: windowWidth / 3.16,
                                  marginLeft: windowWidth * 0.036,
                                }}
                                fontSize={windowWidth * 0.0416}
                                inputContainerStyle={{
                                  fontSize: windowWidth * 0.0416,
                                  fontFamily: 'CenturyGothic',
                                  borderBottomWidth: 0,
                                }}
                                placeholderTextColor={'grey'}
                                baseColor={'black'}
                                itemTextStyle={{
                                  fontSize: windowWidth * 0.0416,
                                  //fontFamily: 'CenturyGothic',
                                }}
                                style={{
                                  backgroundColor: 'transparent',
                                  width: windowWidth / 2.6,
                                  height: windowWidth * 0.136,
                                  marginRight: windowWidth * 0.06,
                                }}
                                onChangeText={value => {
                                  this.setState({minExp: value});
                                }}
                              />
                              {this.renderAccessory()}
                            </View>
                          </View>
                          <View style={{flex: 0.5, flexDirection: 'column'}}>
                            <Text style={styles.inputLabel}>Max</Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginLeft: windowWidth * 0.01649,
                              }}>
                              <Dropdown
                                label=""
                                data={this.state.maxexpValues}
                                value={this.state.maxExp}
                                right={this.renderAccessory()}
                                containerStyle={{
                                  width: windowWidth / 3,
                                }}
                                fontSize={windowWidth * 0.0416}
                                inputContainerStyle={{
                                  fontSize: windowWidth * 0.0416,
                                  fontFamily: 'CenturyGothic',
                                  borderBottomWidth: 0,
                                }}
                                placeholderTextColor={'grey'}
                                baseColor={'black'}
                                itemTextStyle={{
                                  fontSize: windowWidth * 0.0416,
                                  //fontFamily: 'CenturyGothic',
                                }}
                                useNativeDriver={true}
                                inputContainerStyle={{
                                  borderBottomColor: 'transparent',
                                }}
                                style={{
                                  backgroundColor: 'transparent',
                                  width: windowWidth / 2.6,
                                  height: windowWidth * 0.136,
                                }}
                                onChangeText={value => {
                                  this.setState({maxExp: value});
                                }}
                              />
                              {this.renderAccessory()}
                            </View>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.176,
                          flexDirection: 'column',
                          marginTop: windowWidth * 0.096,
                        }}>
                        <Text style={styles.filterTitle}>Job Type</Text>
                        <View style={styles.buttonGroupView}>
                          {jobTypeFilter.map(res => {
                            return (
                              <TouchableOpacity
                                onPress={this.onJobType.bind(this, res.value)}
                                style={styles.jobTypeButton}>
                                {this.state.jobType == res.value ? (
                                  <Icon
                                    type="MaterialCommunityIcons"
                                    name="radiobox-marked"
                                    style={{fontSize: 22, marginRight: 10}}
                                  />
                                ) : (
                                  <Icon
                                    type="MaterialCommunityIcons"
                                    name="radiobox-blank"
                                    style={{fontSize: 22, marginRight: 10}}
                                  />
                                )}
                                <Text style={styles.jobTypeTitle}>
                                  {res.value}
                                </Text>
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.24,
                          flexDirection: 'column',
                          marginTop: windowWidth * 0.0636,
                        }}>
                        <Text style={styles.filterTitle}>Locations</Text>
                        <FlatList
                          contentContainerStyle={{
                            paddingTop: windowWidth * 0.0136,
                            marginRight: windowWidth * 0.06,
                            marginTop: windowWidth * 0.036,
                          }}
                          // contentContainerStyle={{
                          //   flexDirection: 'row',
                          //   flexWrap: 'wrap',
                          //   marginTop: windowWidth * 0.0136,
                          //   borderWidth: 0,
                          // }}
                          data={this.state.challengesList}
                          extraData={this.state}
                          renderItem={this.renderItem.bind(this)}
                          keyExtractor={item => item}
                          numColumns={3}
                          scrollEnabled={false}
                        />
                      </View>
                      <View
                        style={{
                          flex: 0.116,
                          flexDirection: 'column',
                          marginTop: windowWidth * 0.036,
                        }}>
                        <TouchableOpacity
                          onPress={this.onAppyFilter.bind(this, 'asce')}
                          style={styles.filterButton}>
                          <Text style={styles.sortText}>Apply Filter</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </Modal>
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
    jobs: state.jobs,
  }),
  {getJobsList},
)(Challenge);
