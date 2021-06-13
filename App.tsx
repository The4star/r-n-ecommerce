import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import stateStore from './state/store';
import ShopNavigator from './navigation/Navigation';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={() => fetchFonts()}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    )
  }
  return (
    <Provider store={stateStore}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  );
}
