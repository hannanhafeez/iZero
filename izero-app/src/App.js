import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Redux/store';
import RNBootSplash from 'react-native-bootsplash';
import Router from './Router';


if (!__DEV__) {
  global.console.log = () => { };
  global.console.warn = () => { };
  global.console.error = () => { };
}

Text.defaultProps = Text.defaultProps || {};
TextInput.defaultProps = TextInput.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = { allowFontScaling: false };

const App = () => {
  // let init = async () => {
  //   // …do multiple async tasks
  // };
  useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
  }, []);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Router />
      </Provider>
    </PersistGate>
  );
};

export default App;
