import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {Pics} from './assets';
import {colors} from './assets/theme';
import {User} from './db/data';
import {
  addEmployees,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from './services';

enum CurrentState {
  EDITING,
  LIST,
  CREATE,
}

type Loading = {
  createLoading: boolean;
  updateLoading: boolean;
  getLoading: boolean;
  deleteLoading: boolean;
};

const Main = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [selected, setSelected] = React.useState<User>(users[0]);
  const [currentState, setCurrentState] = React.useState<CurrentState>(
    CurrentState.LIST,
  );
  const [user, setUser] = React.useState<User>({
    names: '',
    type: '',
    job: '',
    status: 'Active',
  });
  const [loading, setLoading] = React.useState<Loading>({
    createLoading: false,
    updateLoading: false,
    getLoading: false,
    deleteLoading: false,
  });

  const handleSelection = (id: number) => {
    const selectedUser = users.find(item => item.id === id)!;
    setSelected(selectedUser);
  };

  const setEditing = (user: User) => {
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

  const getAllUsers = React.useCallback(async () => {
    setLoading(state => ({...state, getLoading: true}));
    const users = await getEmployees();
    setUsers(users);
    setSelected(users[0]);
    setLoading(state => ({...state, getLoading: false}));
  }, []);
  React.useEffect(() => {
    getAllUsers();
  }, []);

  const handleChange = (field: string) => (text: string) => {
    setUser(state => ({...state, [field]: text}));
  };

  const handleSave = async () => {
    setLoading(state => ({...state, createLoading: true}));
    if (currentState === CurrentState.CREATE) {
      await addEmployees(user);
    }
    if (currentState === CurrentState.EDITING) {
      await updateEmployee(user);
    }
    setLoading(state => ({...state, createLoading: false}));
    getAllUsers();
    setCurrentState(CurrentState.LIST);
  };

  const handleDelete = async () => {
    setLoading(state => ({...state, deleteLoading: true}));
    await deleteEmployee(selected.id as number);
    setLoading(state => ({...state, deleteLoading: false}));
    getAllUsers();
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.titles]}>Employee Management</Text>
      </View>
      {selected && (
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
              <TouchableOpacity
                disabled={loading.deleteLoading}
                style={styles.actionsBtn}
                activeOpacity={0.6}>
                <Icon
                  onPress={handleDelete}
                  color="red"
                  name={loading.deleteLoading ? 'rotate-right' : 'delete'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
          initialNumToRender={12}
          keyExtractor={item => String(item.id)}
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
            onChangeText={handleChange('names')}
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
            onChangeText={handleChange('job')}
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
            onChangeText={handleChange('type')}
            value={user.type}
            keyboardType="default"
          />
          <View style={{margin: 12, marginTop: 24}}>
            <Button
              onPress={handleSave}
              color={colors['700']}
              title={loading.createLoading ? 'Loading ...' : 'Save'}
            />
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
