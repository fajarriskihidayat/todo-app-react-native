import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import listAPI from '../apis/listAPI';
import moment from 'moment';
import 'moment/locale/id';

import colors from '../configs/colors';

const AddTodo = () => {
  const {replace} = useNavigation();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [jam, setJam] = useState('');
  const [kegiatan, setKegiatan] = useState('');

  const onChange = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    if (mode === 'date') {
      let fDate =
        tempDate.getFullYear() +
        '-' +
        (tempDate.getMonth() + 1) +
        '-' +
        tempDate.getDate();
      setTanggal(fDate);
    } else {
      let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
      setJam(fTime);
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const addList = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const res = await listAPI.post('/', {
        user_nim: nim,
        tanggal: tanggal,
        waktu: jam,
        kegiatan: kegiatan,
      });

      if (res.request.status === 200) {
        ToastAndroid.show(res.data.metadata, ToastAndroid.SHORT);
        replace('Homepage');
      }
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Gagal tambah list !', ToastAndroid.SHORT);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Input Data</Text>
        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Tanggal</Text>
          <View>
            <TextInput
              placeholder="Masukan Tanggal"
              placeholderTextColor={colors.secondary}
              caretHidden={true}
              showSoftInputOnFocus={false}
              value={tanggal && moment(tanggal).format('ll')}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => showMode('date')}>
              <Icon
                style={styles.icon}
                name="date-range"
                color={colors.primary}
                size={28}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.textInput}>Waktu</Text>
          <View>
            <TextInput
              placeholder="Masukan Waktu"
              placeholderTextColor={colors.secondary}
              caretHidden={true}
              showSoftInputOnFocus={false}
              value={jam && moment(jam, 'HH:mm:ss').format('HH:mm')}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => showMode('time')}>
              <Icon
                style={styles.icon}
                name="access-time"
                color={colors.primary}
                size={28}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.textInput}>Kegiatan</Text>
          <TextInput
            placeholder="Masukan Kegiatan"
            placeholderTextColor={colors.secondary}
            onChangeText={value => setKegiatan(value)}
            style={styles.input}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => await addList()}>
          <Text style={styles.textBtn}>Tambah</Text>
        </TouchableOpacity>

        <Text>{tanggal + ' ' + jam}</Text>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  containerInput: {
    width: '100%',
    marginBottom: 8,
  },
  icon: {
    left: 240,
    top: -45,
  },
  textInput: {
    color: colors.primary,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    // flex: 1,
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
});

export default AddTodo;
