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
import {createTable} from './src/db';
import {allUsers} from './src/db/data';
import {addEmployees} from './src/services';

function App(): JSX.Element {
  const dbConnection = React.useCallback(async () => {
    await createTable();
    // const users = await Promise.all(
    //   allUsers.map(async user => {
    //     return await addEmployees(user);
    //   }),
    // );
    // console.log('userss', JSON.stringify({users: users[0][0].rows}, null, 2));
  }, []);

  React.useEffect(() => {
    dbConnection();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors['100']}}>
      <Main />
    </View>
  );
}

export default App;
