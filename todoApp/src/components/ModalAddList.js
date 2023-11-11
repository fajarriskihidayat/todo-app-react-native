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

const ModalAddList = props => {
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

  closeModal = bool => {
    props.changeModalVisible(bool);
  };

  return (
    <ScrollView>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
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
            <View style={styles.conBtn}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => await addList()}>
                <Text style={styles.textBtn}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.danger}]}
                onPress={() => closeModal(false)}>
                <Text style={styles.textBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>

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
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  containerInput: {
    width: 250,
    marginBottom: 8,
  },
  icon: {
    left: 210,
    top: -45,
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
  conBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 250,
  },
  button: {
    // margin: 20,
    marginLeft: 4,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
  },
  textBtn: {
    fontWeight: 'bold',
    color: colors.light,
    fontSize: 16,
  },
});

export default ModalAddList;
