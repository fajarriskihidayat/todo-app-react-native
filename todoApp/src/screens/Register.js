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

const Register = () => {
  const {replace} = useNavigation();

  const [register, setRegister] = useState({
    nim: '',
    nama: '',
    password: '',
  });

  const handleRegister = async () => {
    console.log('value', register);
    try {
      const res = await userAPI.post('/', {
        nim: register.nim,
        nama: register.nama,
        password: register.password,
      });
      console.log('res', res.data);
      if (res.request.status === 200) {
        ToastAndroid.show(res.data.metadata, ToastAndroid.SHORT);
        replace('Login');
      }
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Create user failed !', ToastAndroid.SHORT);
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
        <Text style={styles.title}>Register</Text>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>NIM</Text>
          <TextInput
            placeholder="Masukkan NIM"
            placeholderTextColor={colors.secondary}
            onChangeText={nim => setRegister({...register, nim: nim})}
            style={styles.input}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Nama</Text>
          <TextInput
            placeholder="Masukkan Nama"
            placeholderTextColor={colors.secondary}
            onChangeText={nama => setRegister({...register, nama: nama})}
            style={styles.input}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Password </Text>
          <TextInput
            placeholder="Masukkan Password"
            placeholderTextColor={colors.secondary}
            secureTextEntry
            onChangeText={pwd => setRegister({...register, password: pwd})}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => await handleRegister()}>
          <Text style={styles.textBtn}>Register</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <Text style={{color: colors.dark}}>Sudah punya akun ?</Text>
          <TouchableOpacity
            style={{marginHorizontal: 4, marginTop: -2}}
            onPress={() => replace('Login')}>
            <Text style={styles.navigate}>Login</Text>
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
    marginVertical: 30,
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

export default Register;
