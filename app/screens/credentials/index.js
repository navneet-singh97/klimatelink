import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon} from 'native-base';
import {Header} from '../../components/header';
import {CardView} from '../../components/cardView';
import {Button} from './../../components/button';
import {Avatar} from 'react-native-elements';
import moment from 'moment';

import styles from './styles';
import {color} from '../../theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CredentialsList = [
  {
    title: 'EMPLOYMENT',
    count: '4',
    image: require('./../../Images/employment.png'),
  },
  {
    title: 'EDUCATION',
    count: '2',
    image: require('./../../Images/education.png'),
  },
  {
    title: 'TRAINING',
    count: '12',
    image: require('./../../Images/training.png'),
  },
  {
    title: 'CLAIMS',
    count: '0',
    image: require('./../../Images/claims.png'),
  },
];

interface Props {}

class Credentials extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {currentDate: moment().format('DD-MM-YYYY  HH:mm')};
  }
  onLeft() {
    this.props.navigation.goBack();
  }

  onSeeMoreInformation() {}

  onViewAll() {}

  onSelectedType(item) {
    if (item.title == 'EMPLOYMENT') {
      this.props.navigation.push('Main', {navigateFrom: 'Credintials'});
    }
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onSelectedType.bind(this, item)}
        style={styles.listView}>
        <View style={styles.listSubContainer}>
          <Text style={styles.listCount}>{item.count}</Text>
          <Image source={item.image} style={styles.listImage} />
        </View>
        <View>
          <Text style={styles.listTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{paddingVertical: windowWidth * 0.06}}>
            <Text style={styles.titleStyle}>MY CREDENTIALS</Text>
          </View>
          <View style={styles.subContainer}>
            <View style={styles.topContainer}>
              <Avatar
                rounded
                source={require('../../Images/members/sandeep_consent.png')}
                size={windowWidth * 0.1946}
              />
              <View style={styles.userInfoContainer}>
                <Text style={styles.nameStyle}>Sandeep Krishnappa </Text>
                <Text style={styles.dateStyle}>{this.state.currentDate}</Text>
              </View>
            </View>
            <Text style={styles.welcomeText}>Hi Welcome back..</Text>
            <FlatList
              contentContainerStyle={styles.flatListContainer}
              numColumns={2}
              data={CredentialsList}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={item => item.id}
            />
            {/* <TouchableOpacity
              activeOpacity={0.9}
              onPress={this.onSeeMoreInformation.bind(this)}
            >
              <Text style={styles.buttonText}>See More Information</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Credentials;
