import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAPI from '../apis/userAPI';

import colors from '../configs/colors';

const EditPassword = () => {
  const {navigate} = useNavigation();
  const [user, setUser] = useState({
    nim: '',
    nama: '',
    password: '',
  });
  const [newProfile, setNewProfile] = useState({
    passwordLama: '',
    passwordBaru: '',
    confirmPassword: '',
  });

  const getUser = async () => {
    try {
      const password = await AsyncStorage.getItem('password');
      const user = await AsyncStorage.getItem('user');
      const data = JSON.parse(user);
      if (data) {
        // setUser(JSON.parse(data));
        setUser({
          nim: data.nim,
          nama: data.nama,
          password: password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetPassword = async value => {
    try {
      const res = await userAPI.put('/', {
        nim: value.nim,
        password: value.passwordLama,
        passwordBaru: value.passwordBaru,
      });

      console.log('status', res.request.status);
      if (res.request.status === 200) {
        ToastAndroid.show('Password berhasil diubah !', ToastAndroid.SHORT);
        setNewProfile({
          passwordLama: '',
          passwordBaru: '',
          confirmPassword: '',
        });
        navigate('Account');
      }
    } catch (err) {
      console.log(err.message);
      ToastAndroid.show('Edit Password Gagal !', ToastAndroid.SHORT);
    }
  };

  const handleEdit = () => {
    if (
      newProfile.passwordLama == '' ||
      newProfile.passwordBaru == '' ||
      newProfile.confirmPassword == ''
    ) {
      ToastAndroid.show(
        'Data tidak boleh ada yang kosong !',
        ToastAndroid.SHORT,
      );
    } else if (newProfile.passwordLama !== user.password) {
      ToastAndroid.show('Password salah !', ToastAndroid.SHORT);
    } else if (newProfile.passwordBaru !== newProfile.confirmPassword) {
      ToastAndroid.show(
        'Password Baru dan Konfirmasi Password tidak sesuai !',
        ToastAndroid.SHORT,
      );
    } else {
      resetPassword({
        nim: user.nim,
        passwordLama: newProfile.passwordLama,
        passwordBaru: newProfile.passwordBaru,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log('users', user);
  console.log('new', newProfile);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Password</Text>
      <View style={{width: '100%'}}>
        <Text style={styles.lable}>Password Lama</Text>
        <TextInput
          placeholderTextColor={colors.white}
          onChangeText={password =>
            setNewProfile({...newProfile, passwordLama: password})
          }
          value={newProfile.passwordLama}
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.lable}>Password Baru</Text>
        <TextInput
          placeholderTextColor={colors.white}
          onChangeText={password =>
            setNewProfile({...newProfile, passwordBaru: password})
          }
          value={newProfile.passwordBaru}
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.lable}>Konfirmasi Password</Text>
        <TextInput
          placeholderTextColor={colors.white}
          onChangeText={confirmPwd =>
            setNewProfile({...newProfile, confirmPassword: confirmPwd})
          }
          value={newProfile.confirmPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={{top: 20, width: '100%'}}>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit()}>
          <Text style={styles.btnText}>Ubah Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    marginTop: -100,
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    // bottom: 0,
    borderRadius: 5,
  },
  btnText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  lable: {
    color: colors.primary,
    marginLeft: 8,
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    width: '100%',
    color: colors.white,
  },
});

export default EditPassword;
