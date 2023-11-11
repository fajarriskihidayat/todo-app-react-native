import {View, StyleSheet, Image, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../configs/colors';

const SplashScreen = () => {
  const {replace} = useNavigation();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('nim');
      value === null
        ? setTimeout(() => {
            replace('Login');
          }, 3000)
        : setTimeout(() => {
            replace('Homepage');
          }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3208/3208723.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.text}>ToDo App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    color: colors.primary,
    fontSize: 30,
    marginTop: 12,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
