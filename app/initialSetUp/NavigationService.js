import {NavigationActions, StackActions} from 'react-navigation';
import {useRef, createRef} from 'react';

// let _navigator = useRef();

export const _navigator = createRef();
export const isReadyRef = createRef();
function setTopLevelNavigator(navigatorRef) {
  _navigator.current = navigatorRef;
}

function navigate(routeName, params) {
  // console.log('msdmksdmsdmsdkdm', routeName);
  // _navigator?.current?.dispatch(
  //   NavigationActions.navigate({
  //     routeName,
  //     params,
  //   }),
  // );
  _navigator.current?.navigate(routeName, params);
}

function goBack() {
  _navigator?.current?.dispatch(NavigationActions.back());
}

function resetNavigation(routeName = 'loginScreen') {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName})],
  });
  _navigator?.current?.dispatch(resetAction);
}

export default {
  navigate,
  setTopLevelNavigator,
  resetNavigation,
  goBack,
};