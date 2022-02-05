import React, {useEffect, Fragment} from 'react';
import {
  AppState,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './app/screens/splash';
import Login from './app/screens/login';
import ForgotPassword from './app/screens/forgotPassword';
import ResetPassword from './app/screens/resetPassword';
import InitialSignUp from './app/screens/initialSignUp';
import SignUpOtp from './app/screens/signUpOtp';
import SignUp from './app/screens/signUp';
import OnBoarding from './app/screens/onBoarding';
import Otp from './app/screens/otp';
import Main from './app/screens/main';
import TransactionHistory from './app/screens/transactionHistory';
import Notifications from './app/screens/notifications';
import CommunityInformation from './app/screens/communityInformation';
import ShareCertificate from './app/screens/shareCertificate';
import sharePreviewCertificate from './app/screens/sharePreviewCertificate';
import EmploymentVc from './app/screens/employmentVc';
import EditCertificate from './app/screens/editCertificate';
import HistoryCertificate from './app/screens/historyCertificate';
import EducationIcc from './app/screens/educationIcc';
import CredentialRequest from './app/screens/credentialRequest';
import SscVcStatus from './app/screens/sscVcStatus';
import OraganisationSelection from './app/screens/organisationSelection';
import PinScreen from './app/screens/pinScreen';
import CommunityMembers from './app/screens/communityMembers';
import ChatScreen from './app/screens/chatScreen';
import ContactScreen from './app/screens/contactScreen';
import EventsScreen from './app/screens/eventsScreen';
import RemainderScreen from './app/screens/remainderScreen';
import EditProfile from './app/screens/editProfile';
import ContentScreen from './app/screens/contentScreen';
import ChallengeScreen from './app/screens/challengeScreen';
import ContentFormScreen from './app/screens/contentFormScreen';
import UserProfile from './app/screens/userProfile';
import FormatScreen from './app/screens/formatScreen';
import VideoPlayer from './app/screens/formatScreen/VideoPlayer';
import RegisterSuccessfull from './app/screens/registerSuccessfull';
import PersonaliseGoalAndSkills from './app/screens/personaliseGoals';
import PersonaliseInterests from './app/screens/personaliseInterests';
import PersonalisePersona from './app/screens/personalisePersona';
import PersonaliseSubscriptions from './app/screens/personaliseSubscriptions';
import HomeScreen from './app/screens/home';
import ContactAndHelp from './app/screens/contactAndHelp';
import EditAccountDetails from './app/screens/editAccountDetails';
import Account from './app/screens/account';
import Jobs from './app/screens/jobs';
import Library from './app/screens/library';
import Favourites from './app/screens/favourites';
import JobExpressInterest from './app/screens/jobExpressInterest';
import UserDetail from './app/screens/userDetail';
import AgoraChat from './app/screens/agora/agoraChat';
import EditProfile_V1 from './app/screens/editProfile/EditProfile_V1';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './app/redux/store';
import MyLinkedInModal from './app/components/MyLinkedInModal';
import groupchat from './app/screens/communityMembers/groupchat';
import AgoraVoiceCall from './app/screens/agora/agoraVoiceCall';
import AgoraVideoCall from './app/screens/agora/agoraVideoCall';
import uuid from 'uuid';
import RNCallKeep from 'react-native-callkeep';
import BackgroundTimer from 'react-native-background-timer';
import SQLite from 'react-native-sqlite-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import User from '@react-native-firebase/auth/lib/User';
import {FlatList, SafeAreaView, ScrollView} from 'react-navigation';
import communityPosts from './app/screens/communityPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService, {
  isReadyRef,
  _navigator,
} from './app/initialSetUp/NavigationService';
import agoraLivestream from './app/screens/agora/agoraLivestream';

// import DeviceInfo from 'react-native-device-info';
const Stack = createStackNavigator();
// BackgroundTimer.start();
const App = () => {
  useEffect(() => {
    // DeviceEventEmitter.addListener('appInvoked', data => {
    //   const {route} = data;
    //   // Using react-navigation library for navigation.
    //   this.props.navigation.navigate(route);
    // });
    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = nextState => {
    if (nextState == 'background') {
      AsyncStorage.getItem('userID').then(guid => {
        if (guid) {
          AsyncStorage.getItem('userCommunities').then(userCommunities => {
            if (userCommunities) {
              let communities = JSON.parse(userCommunities);
              for (var i = 0; i < communities.length; i++) {
                database()
                  .ref(`Group/${communities[i].uid}/${guid}`)
                  .set({userId: guid, isOnline: false});
              }
            }
          });
        }
      });
    } else if (nextState == 'active') {
      AsyncStorage.getItem('userID').then(guid => {
        if (guid) {
          AsyncStorage.getItem('userCommunities').then(userCommunities => {
            if (userCommunities) {
              let communities = JSON.parse(userCommunities);
              for (var i = 0; i < communities.length; i++) {
                database()
                  .ref(`Group/${communities[i].uid}/${guid}`)
                  .set({userId: guid, isOnline: true});
              }
            }
          });
        }
      });
    }
  };

  // .openDatabase('agoraDB', '1.0', '', 1);

  global.db = SQLite.openDatabase(
    {
      name: 'agoraDBNew.db',
      // location: 'default',
      // createFromLocation: '~agoraDB.db',
    },

    () => {
      console.log('DATABASE: DB IS CONNECTED');
    },
    error => {
      console.log('ERROR: ' + error);
    },
  );
  // SQLite.enablePromise(true);x
  return (
    <NavigationContainer
      onReady={() => {
        isReadyRef.current = true;
      }}
      ref={_navigator}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="InitialSignUp" component={InitialSignUp} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpOtp" component={SignUpOtp} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen
          name="CommunityInformation"
          component={CommunityInformation}
        />
        <Stack.Screen name="ShareCertificate" component={ShareCertificate} />
        <Stack.Screen
          name="sharePreviewCertificate"
          component={sharePreviewCertificate}
        />
        <Stack.Screen name="EmploymentVc" component={EmploymentVc} />
        <Stack.Screen name="EditCertificate" component={EditCertificate} />
        <Stack.Screen
          name="HistoryCertificate"
          component={HistoryCertificate}
        />
        <Stack.Screen name="EducationIcc" component={EducationIcc} />

        <Stack.Screen name="CredentialRequest" component={CredentialRequest} />
        <Stack.Screen name="SscVcStatus" component={SscVcStatus} />
        <Stack.Screen name="PinScreen" component={PinScreen} />
        <Stack.Screen name="CommunityMembers" component={CommunityMembers} />
        <Stack.Screen name="GroupChat" component={groupchat} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen name="EventsScreen" component={EventsScreen} />
        <Stack.Screen name="RemainderScreen" component={RemainderScreen} />
        <Stack.Screen
          name="OraganisationSelection"
          component={OraganisationSelection}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ContentScreen" component={ContentScreen} />
        <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} />
        <Stack.Screen name="ContentFormScreen" component={ContentFormScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="FormatScreen" component={FormatScreen} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="EditProfile_V1" component={EditProfile_V1} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen
          name="RegisterSuccessfull"
          component={RegisterSuccessfull}
        />

        <Stack.Screen
          name="PersonaliseGoalAndSkills"
          component={PersonaliseGoalAndSkills}
        />
        <Stack.Screen
          name="PersonaliseInterests"
          component={PersonaliseInterests}
        />
        <Stack.Screen
          name="PersonalisePersona"
          component={PersonalisePersona}
        />

        <Stack.Screen
          name="PersonaliseSubscriptions"
          component={PersonaliseSubscriptions}
        />

        <Stack.Screen name="ContactAndHelp" component={ContactAndHelp} />
        <Stack.Screen
          name="EditAccountDetails"
          component={EditAccountDetails}
        />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen
          name="JobExpressInterest"
          component={JobExpressInterest}
        />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
        <Stack.Screen name="AgoraChat" component={AgoraChat} />
        <Stack.Screen name="AgoraVoiceCall" component={AgoraVoiceCall} />
        <Stack.Screen name="AgoraVideoCall" component={AgoraVideoCall} />
        <Stack.Screen name="AgoraLivestream" component={agoraLivestream} />
        <Stack.Screen name="CommunityPosts" component={communityPosts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

{
  /* <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
