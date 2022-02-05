import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  SectionList,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Icon} from 'native-base';
import {CardView} from '../../components/cardView';
import {Header} from '../../components/header';
import {color} from './../../theme';
import styles from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import {ButtonGroup} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const CommunitiesTranscationList = [
  {
    id: 0,
    title: 'Green Hydrogen Community',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '30-01-2019',
    balance: '500',
  },
  {
    id: 1,
    title: 'Space Community',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '30-01-2019',
    balance: '400',
    type: 'Profit',
  },
  {
    id: 2,
    title: 'Company Email',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '29-01-2019',
    balance: '300',
    type: 'Blue',
  },
  {
    id: 3,
    title: 'Company Email',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '29-01-2019',
    balance: '200',
    type: 'Blue',
  },
  {
    id: 4,
    title: 'Farming Community',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '28-01-2019',
    balance: '100',
    type: 'Incentive',
  },
];

const VerificationTranscationList = [
  {
    id: 1,
    title: 'Membership Reward',
    amount: '+250',
    image: require('./../../Images/coins.png'),
    time: '31-01-2019',
    balance: '500',
  },
  {
    id: 2,
    title: 'Influencer Reward',
    amount: '+250',
    image: require('./../../Images/coins.png'),
    time: '30-01-2019',
    balance: '250',
  },
];

const AllTranscationList = [
  {
    id: 0,
    title: 'Green Hydrogen Community',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '30-01-2019',
    balance: '500',
  },
  {
    id: 1,
    title: 'Space Community',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '30-01-2019',
    balance: '400',
    type: 'Profit',
  },
  {
    id: 2,
    title: 'Company Email',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '29-01-2019',
    balance: '300',
    type: 'Incentive',
  },
  {
    id: 3,
    title: 'Company Email',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '29-01-2019',
    balance: '200',
    type: 'Incentive',
  },
  {
    id: 4,
    title: 'Farming Community',
    amount: '+100',
    image: require('./../../Images/coins.png'),
    time: '28-01-2019',
    balance: '100',
    type: 'Incentive',
  },
  {
    id: 1,
    title: 'Membership Reward',
    amount: '+250',
    image: require('./../../Images/coins.png'),
    time: '31-01-2019',
    balance: '500',
  },
  {
    id: 2,
    title: 'Influencer Reward',
    amount: '+250',
    image: require('./../../Images/coins.png'),
    time: '30-01-2019',
    balance: '250',
  },
];

interface Props {}
interface rewardsState {
  activeIndex: any;
  selectedIndex: any;
  rewardList: any;
}

class Rewards extends Component<Props, rewardsState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeIndex: 0,
      selectedIndex: 1,
      rewardList: CommunitiesTranscationList,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex}, () => {
      if (this.state.selectedIndex == 0) {
        this.setState({rewardList: AllTranscationList});
      } else if (this.state.selectedIndex == 1) {
        this.setState({rewardList: CommunitiesTranscationList});
      } else {
        this.setState({rewardList: VerificationTranscationList});
      }
    });
  }

  onLeft() {
    this.props.navigation.goBack();
  }

  renderItem({item, index}) {
    var RewardChange;
    if (item.type == 'Blue') {
      RewardChange = styles.curveBlueTopView;
    } else {
      RewardChange = styles.curveTopView;
    }
    return (
      <CardView
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
          marginBottom: windowWidth * 0.036,
          borderRadius: windowWidth * 0.036,
          marginHorizontal: windowWidth * 0.036,
        }}>
        <View
          style={
            this.state.selectedIndex == 0 ? RewardChange : styles.normalTopView
          }>
          <Text></Text>
        </View>
        <View
          style={{
            flex: 0.9,
            flexDirection: 'row',
            paddingBottom: windowWidth * 0.0416,
            paddingHorizontal: windowWidth * 0.0376,
          }}>
          <View style={{flex: 0.37}}>
            <Text style={styles.listAmount}>{item.amount}</Text>
            <Text style={styles.listcommunityText}>{item.title}</Text>
          </View>
          <View
            style={{
              flex: 0.16,
              borderWidth: 0,
              alignItems: 'center',
              marginLeft: windowWidth * 0.036,
            }}>
            <Text style={styles.listTime}>{item.time}</Text>
          </View>
          <View
            style={{
              flex: 0.35,
              borderWidth: 0,
              marginRight: windowWidth * 0.016,
            }}>
            <Text style={styles.listBalanceTitle}>Balance</Text>
            <Text style={styles.listBalanceText}>{item.balance}</Text>
          </View>
          <View style={{flex: 0.1, borderWidth: 0}}>
            <Image source={item.image} style={styles.coinsImage} />
          </View>
        </View>
      </CardView>
    );
  }

  monthsCarouselRender({item, index}) {
    return (
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselText}>{item}</Text>
      </View>
    );
  }

  render() {
    const buttons = ['ALL', 'Blue', 'Green'];

    //const { navigate } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {/* <ImageBackground
            resizeMode={'cover'}
            source={require('./../../Images/tokenBgImg.jpeg')}
            style={{width: windowWidth, flex: 1}}> */}
          <Carousel
            layout={'default'}
            ref={ref => (this.carousel = ref)}
            data={Months}
            loop={true}
            sliderWidth={windowWidth}
            itemWidth={windowWidth * 0.46}
            renderItem={this.monthsCarouselRender}
            activeSlideAlignment={'center'}
            onSnapToItem={index => this.setState({activeIndex: index})}
            contentContainerCustomStyle={{}}
            inactiveSlideScale={0.976}
            inactiveSlideOpacity={0.96}
            slideStyle={{padding: windowWidth * 0.036}}
          />
          <View style={styles.circularView}>
            <AnimatedProgressWheel
              size={windowWidth * 0.41}
              width={windowWidth * 0.0461}
              color={color.primary}
              progress={50}
              backgroundColor={color.appGreen}
              containerColor="transparent"
            />
            <View style={styles.circularInnerView}>
              <Text style={styles.circularSubText}>Current Balance</Text>
              <Text style={styles.circularMainText}>1000</Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: windowWidth * 0.0296,
                  fontFamily: 'CenturyGothic',
                }}>
                {Months[0]}
              </Text>
            </View>
          </View>
          <View style={styles.incomeView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                type="FontAwesome"
                name={'circle'}
                style={{
                  fontSize: windowWidth * 0.0846,
                  color: color.primary,
                }}
              />
              <View style={styles.amountTypeView}>
                <Text style={styles.subAmount}>500</Text>
                <Text style={styles.incomeType}>Blue Token</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                type="FontAwesome"
                name={'circle'}
                style={{
                  fontSize: windowWidth * 0.0846,
                  color: color.appGreen,
                }}
              />
              <View style={styles.amountTypeView}>
                <Text style={styles.subAmount}>500</Text>
                <Text style={styles.incomeType}>Green Token</Text>
              </View>
            </View>
          </View>
          {/* </ImageBackground> */}
        </View>
        <View style={styles.centerContainer}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttonGroup}
            innerBorderStyle={{
              width: windowWidth * 0.026,
              color: color.primaryBgColour,
            }}
            buttonStyle={{backgroundColor: color.greyBg}}
            selectedButtonStyle={{
              backgroundColor:
                this.state.selectedIndex == 2 ? color.appGreen : color.primary,
            }}
            textStyle={{
              fontFamily: 'CenturyGothic',
              color: 'black',
              fontSize: windowWidth * 0.036,
            }}
            selectedTextStyle={{
              fontFamily: 'CenturyGothic',
              fontSize: windowWidth * 0.036,
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text
            style={{
              margin: windowWidth * 0.036,
              fontFamily: 'CenturyGothic',
              fontSize: windowWidth * 0.036,
            }}>
            January : 01 Jan - 31 Jan
          </Text>
          <FlatList
            contentContainerStyle={{paddingTop: windowWidth * 0.06}}
            data={this.state.rewardList}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}
export default Rewards;
