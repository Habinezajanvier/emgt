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
} from 'react-native';
import {Pics} from './assets';
import {colors} from './assets/theme';

const users = [
  {
    names: 'Gelio Bizimana',
    type: 'Fulltime',
    job: 'DevOps',
    status: 'Active',
  },
  {
    names: 'Emile Shumbusho',
    type: 'Parttime',
    job: 'FrontEnd Dev',
    status: 'Active',
  },
  {
    names: 'Eloi Chris',
    type: 'Fulltime',
    job: 'Backend Dev',
    status: 'Active',
  },
  {
    names: 'Kevine Ineza',
    type: 'Fulltime',
    job: 'PM',
    status: 'Active',
  },
  {
    names: 'Gelio Bizimana',
    type: 'Fulltime',
    job: 'Fullstack',
    status: 'Active',
  },
  {
    names: 'Emile Shumbusho',
    type: 'Parttime',
    job: 'FrontEnd Dev',
    status: 'Active',
  },
  {
    names: 'Eloi Chris',
    type: 'Fulltime',
    job: 'Backend Dev',
    status: 'Active',
  },
  {
    names: 'Kevine Ineza',
    type: 'Fulltime',
    job: 'PM',
    status: 'Active',
  },
];

const Main = () => {
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
              <Text style={styles.normalText}>{users[0].names}</Text>
            </View>
            <View style={styles.profileFields}>
              <Text style={styles.subTitle}>Job Type: </Text>
              <Text style={styles.normalText}>{users[0].type}</Text>
            </View>
            <View style={styles.profileFields}>
              <Text style={styles.subTitle}>Job Title: </Text>
              <Text style={styles.normalText}>{users[0].job}</Text>
            </View>
            <View style={styles.profileFields}>
              <Text style={styles.subTitle}>Status: </Text>
              <Text style={styles.normalText}>{users[0].status}</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.actionsBtn} activeOpacity={0.6}>
              <Icon name="edit" color={colors['600']} size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionsBtn} activeOpacity={0.6}>
              <Icon color="red" name="delete" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.listHeader}>
        <Text style={[styles.titles, {color: '#fff'}]}>Employee List</Text>
        <TouchableOpacity activeOpacity={0.6} style={styles.addBtn}>
          <Icon name="add" size={16} color="#fff" />
          <Text style={[styles.subTitle, {color: '#fff'}]}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.listComponent} activeOpacity={0.6}>
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
});
