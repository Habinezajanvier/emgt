import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {Pics} from './assets';
import {colors} from './assets/theme';

const allUsers = [
  {
    id: 1,
    names: 'Gelio Bizimana',
    type: 'Fulltime',
    job: 'DevOps',
    status: 'Active',
  },
  {
    id: 2,
    names: 'Emile Shumbusho',
    type: 'Parttime',
    job: 'FrontEnd Dev',
    status: 'Active',
  },
  {
    id: 3,
    names: 'Eloi Chris',
    type: 'Fulltime',
    job: 'Backend Dev',
    status: 'Active',
  },
  {
    id: 4,
    names: 'Kevine Ineza',
    type: 'Fulltime',
    job: 'PM',
    status: 'Active',
  },
  {
    id: 5,
    names: 'Gelio Bizimana',
    type: 'Fulltime',
    job: 'Fullstack',
    status: 'Active',
  },
  {
    id: 6,
    names: 'Emile Shumbusho',
    type: 'Parttime',
    job: 'FrontEnd Dev',
    status: 'Active',
  },
  {
    id: 7,
    names: 'Eloi Chris',
    type: 'Fulltime',
    job: 'Backend Dev',
    status: 'Active',
  },
  {
    id: 8,
    names: 'Kevine Ineza',
    type: 'Fulltime',
    job: 'PM',
    status: 'Active',
  },
];

enum CurrentState {
  EDITING,
  LIST,
  CREATE,
}

interface user {
  id?: number;
  names: string;
  type: string;
  job: string;
  status: string;
}

const Main = () => {
  const [users, setUsers] = React.useState<user[]>([...allUsers]);
  const [selected, setSelected] = React.useState<user>(users[0]);
  const [currentState, setCurrentState] = React.useState<CurrentState>(
    CurrentState.LIST,
  );
  const [user, setUser] = React.useState<user>({
    names: '',
    type: '',
    job: '',
    status: 'Active',
  });

  const handleSelection = (id: number) => {
    const selectedUser = users.find(item => item.id === id)!;
    setSelected(selectedUser);
  };

  const setEditing = (user: user) => {
    setCurrentState(CurrentState.EDITING);
    setUser(user);
  };

  const resetForm = () => {
    setUser({
      names: '',
      type: '',
      job: '',
      status: 'Active',
    });
  };

  const handleCancel = () => {
    setCurrentState(CurrentState.LIST);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.titles]}>Employee Management</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={[styles.titles, {fontSize: 14, marginLeft: 32}]}>
          Info
        </Text>
        <View style={styles.profileData}>
          <View style={styles.imageContainer}>
            <Image style={styles.profileImage} source={Pics.profileAvatar} />
          </View>
          <View>
            <View style={styles.profileFields}>
              <Text style={styles.subTitle}>names: </Text>
              <Text style={styles.normalText}>{selected.names}</Text>
            </View>
            <View style={styles.profileFields}>
              <Text style={styles.subTitle}>Job Type: </Text>
              <Text style={styles.normalText}>{selected.type}</Text>
            </View>
            <View style={styles.profileFields}>
              <Text style={styles.subTitle}>Job Title: </Text>
              <Text style={styles.normalText}>{selected.job}</Text>
            </View>
            <View style={styles.profileFields}>
              <Text style={styles.subTitle}>Status: </Text>
              <Text style={styles.normalText}>{selected.status}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => setEditing(selected)}
              style={styles.actionsBtn}
              activeOpacity={0.6}>
              <Icon name="edit" color={colors['600']} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionsBtn} activeOpacity={0.6}>
              <Icon color="red" name="delete" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.listHeader}>
        <Text style={[styles.titles, {color: '#fff'}]}>
          {currentState === CurrentState.LIST &&
            `Employee List: ${users.length}`}
          {currentState === CurrentState.CREATE && 'Add employee'}
          {currentState === CurrentState.EDITING && 'Edit Employee'}
        </Text>
        {currentState === CurrentState.LIST ? (
          <TouchableOpacity
            onPress={() => setCurrentState(CurrentState.CREATE)}
            activeOpacity={0.6}
            style={styles.addBtn}>
            <Icon name="add" size={16} color="#fff" />
            <Text style={[styles.subTitle, {color: '#fff'}]}>Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleCancel}
            activeOpacity={0.6}
            style={[styles.addBtn, {backgroundColor: colors['50']}]}>
            <Icon name="close" size={16} color={colors['900']} />
            <Text style={[styles.subTitle]}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      {currentState === CurrentState.LIST ? (
        <FlatList
          data={users}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => handleSelection(item.id as number)}
              style={styles.listComponent}
              activeOpacity={0.6}>
              <View style={{flex: 1 / 2}}>
                <Text
                  style={[
                    styles.subTitle,
                    {fontWeight: '600', fontSize: 16, marginVertical: 2},
                  ]}>
                  {item.names}
                </Text>
                <Text style={[styles.normalText, {fontSize: 12}]}>
                  {item.job}
                </Text>
              </View>
              <View>
                <Text style={styles.normalText}>{item.type}</Text>
              </View>
              <View style={styles.addBtn}>
                <Text style={[styles.normalText, {color: '#fff'}]}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <ScrollView style={{marginTop: 36}}>
          <Text style={[styles.subTitle, {fontSize: 12, marginLeft: 12}]}>
            Names:{' '}
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={colors['950']}
            // onChangeText={onChangeNumber}
            value={user.names}
            autoFocus
            keyboardType="default"
          />
          <Text
            style={[
              styles.subTitle,
              {fontSize: 12, marginLeft: 12, marginTop: 6},
            ]}>
            Job Title:{' '}
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={colors['950']}
            // onChangeText={onChangeNumber}
            value={user.job}
            keyboardType="default"
          />
          <Text
            style={[
              styles.subTitle,
              {fontSize: 12, marginLeft: 12, marginTop: 6},
            ]}>
            Job Type:{' '}
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={colors['950']}
            // onChangeText={onChangeNumber}
            value={user.names}
            keyboardType="default"
          />
          <View style={{margin: 12, marginTop: 24}}>
            <Button color={colors['700']} title="Save" />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  profileContainer: {
    backgroundColor: '#ffff',
    borderRadius: 6,
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  profileData: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileFields: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  normalText: {
    color: colors['950'],
    fontWeight: '500',
  },
  actionsBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: colors['100'],
  },
  subTitle: {
    color: colors['950'],
    fontWeight: '600',
  },
  titles: {
    color: colors['900'],
    fontWeight: '800',
    fontSize: 18,
  },
  listHeader: {
    backgroundColor: colors['500'],
    flexDirection: 'row',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: colors['700'],
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listComponent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    padding: 6,
  },
  input: {
    height: 40,
    margin: 12,
    marginVertical: 6,
    borderWidth: 1,
    padding: 10,
    borderColor: colors['700'],
    borderRadius: 6,
    color: colors['950'],
  },
});
