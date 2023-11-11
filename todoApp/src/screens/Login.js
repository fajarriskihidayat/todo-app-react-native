import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import userAPI from '../apis/userAPI';
import {useNavigation} from '@react-navigation/native';

import colors from '../configs/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const {replace} = useNavigation();

  const [user, setUser] = useState({
    nim: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const res = await userAPI.post('/login', {
        nim: user.nim,
        password: user.password,
      });

      if (res.request.status === 200) {
        console.log('user', res.data.user);
        ToastAndroid.show(res.data.metadata, ToastAndroid.SHORT);
        await AsyncStorage.setItem('nim', user.nim);
        await AsyncStorage.setItem('password', user.password);
        await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        replace('Homepage');
      }
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Login gagal !', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView style={{backgroundColor: colors.black}}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3208/3208723.png',
          }}
          style={styles.img}
        />
        <Text style={styles.title}>Login</Text>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>NIM</Text>
          <TextInput
            placeholder="Masukkan NIM"
            placeholderTextColor={colors.secondary}
            onChangeText={nim => setUser({...user, nim: nim})}
            style={styles.input}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Password </Text>
          <TextInput
            placeholder="Masukkan Password"
            placeholderTextColor={colors.secondary}
            secureTextEntry
            onChangeText={pwd => setUser({...user, password: pwd})}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => await handleLogin()}>
          <Text style={styles.textBtn}>Login</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <Text style={{color: colors.dark}}>Belum punya akun ?</Text>
          <TouchableOpacity
            style={{marginHorizontal: 4, marginTop: -2}}
            onPress={() => replace('Register')}>
            <Text style={styles.navigate}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  img: {
    width: 150,
    height: 150,
    // marginTop: -10,
    marginVertical: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    marginTop: -20,
  },
  containerInput: {
    width: '100%',
    marginBottom: 8,
  },
  textInput: {
    color: colors.primary,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 4,
    padding: 12,
    borderRadius: 8,
    color: colors.dark,
  },
  button: {
    margin: 20,
    padding: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
    width: '100%',
    alignItems: 'center',
  },
  textBtn: {
    fontWeight: 'bold',
    color: colors.light,
    fontSize: 18,
  },
  navigate: {
    color: colors.primary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
