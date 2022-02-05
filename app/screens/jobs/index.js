import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {getCommunities} from './../../redux/actions/communities';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import AnimatedLoader from 'react-native-animated-loader';
import {Header} from '../../components/header';

import {color} from '../../theme';
import {Icon} from 'native-base';
import {SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCommunity: '',
      filteredData: [],
      communities: [],
      showLoader: false,
    };
    console.disableYellowBox = true;
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  async componentDidMount() {
    try {
    } catch (err) {}
  }

  onSelectedType(value) {}

  onLetsGo() {
    this.props.navigation.push('ChallengeScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.appGreen}}
          forceInset={{bottom: 'never'}}>
          <Header onLeftPress={this.onLeft.bind(this)}>
            <Text>JOBS</Text>
          </Header>
          <View style={styles.container}>
            <ScrollView>
              <View>
                <Image
                  source={require('../../Images/jobsDisplay.png')}
                  style={styles.mainImage}
                />
              </View>
              <View>
                <Text style={styles.title}>Find your green job or partner with us</Text>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={this.onLetsGo.bind(this)}>
                  <Text style={styles.letsGo}> Let's Go</Text>
                  <View style={styles.iconView}>
                    <Icon
                      type={'MaterialIcons'}
                      name={'arrow-forward'}
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
        {/* <AnimatedLoader
          visible={this.state.showLoader}
          overlayColor="rgba(255,255,255,0.36)"
          source={require('./../animationLoaders/loader_4.json')}
          animationStyle={{
            width: windowWidth * 0.36,
            height: windowWidth * 0.36,
          }}
          speed={1}
        /> */}
      </View>
    );
  }
}
export default connect(
  state => ({
    communities: state.communities,
  }),
  {getCommunities},
)(Jobs);
