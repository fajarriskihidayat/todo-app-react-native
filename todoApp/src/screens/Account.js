import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import colors from '../configs/colors';

const Account = () => {
  const {replace, navigate} = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://reqres.in/img/faces/1-image.jpg'}}
        style={styles.img}
      />
      <Text style={styles.nama}>Fajar</Text>
      <Text style={{marginBottom: 40}}>1221410</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigate('EditPassword')}>
        <Text style={styles.btnText}>Edit Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => handleLogout()}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  nama: {
    fontSize: 24,
    color: colors.dark,
    fontWeight: 'bold',
    marginTop: 16,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  btnText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Account;
