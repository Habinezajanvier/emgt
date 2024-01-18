/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';

import Main from './src/main';
import {colors} from './src/assets/theme';

function App(): JSX.Element {
  return (
    <View style={{flex: 1, backgroundColor: colors['100']}}>
      <Main />
    </View>
  );
}

export default App;
