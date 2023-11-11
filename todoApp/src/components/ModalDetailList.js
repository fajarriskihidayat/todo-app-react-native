import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import listAPI from '../apis/listAPI';
import colors from '../configs/colors';
import moment from 'moment';
import 'moment/locale/id';
import {useNavigation} from '@react-navigation/native';

const ModalDetailList = props => {
  const id = props.id;
  const {replace} = useNavigation();

  const [data, setData] = useState({});

  const getList = async () => {
    try {
      const {data} = await listAPI.get(`/details/${id}`);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleStatus = async status => {
    console.log('status', status);
    try {
      if (status === 'Belum Selesai') {
        const res = await listAPI.put(`/finish/${id}`);

        if (res.request.status === 200) {
          ToastAndroid.show(res.data.metadata, ToastAndroid.SHORT);
          replace('Homepage');
        }
      } else if (status === 'Selesai') {
        const res = await listAPI.put(`/unfinish/${id}`);

        if (res.request.status === 200) {
          ToastAndroid.show(res.data.metadata, ToastAndroid.SHORT);
          replace('Homepage');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  closeModal = bool => {
    props.changeModalVisible(bool);
  };

  return (
    <ScrollView>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.conBtn}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: colors.danger}]}
                onPress={() => closeModal(false)}>
                <Text style={styles.textBtn}>Back</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Detail List</Text>
            <View style={styles.body}>
              <View style={styles.conBody}>
                <Text style={styles.body1}>Tanggal :</Text>
                <Text style={styles.body2}>
                  {moment(data.tanggal).format('ll')}
                </Text>
              </View>
              <View style={styles.conBody}>
                <Text style={styles.body1}>Waktu :</Text>
                <Text style={styles.body2}>
                  {moment(data.waktu, 'HH:mm:ss').format('HH:mm')}
                </Text>
              </View>
              <View style={styles.conBody}>
                <Text style={styles.body1}>Status :</Text>
                <Text style={styles.body2}>{data.status}</Text>
              </View>
              <View style={styles.conBody}>
                <Text style={styles.body1}>Kegiatan :</Text>
                <Text style={styles.body2}>{data.kegiatan}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={async () => await handleStatus(data.status)}>
              <Text style={styles.btnText}>
                {data.status === 'Belum Selesai'
                  ? 'Selesaikan'
                  : 'Belum Selesai'}
              </Text>
            </TouchableOpacity>
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
    color: colors.primary,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  body: {
    margin: 16,
  },
  conBody: {
    marginBottom: 12,
    width: 220,
  },
  body1: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  body2: {
    color: colors.dark,
  },
  conBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 250,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
  },
  textBtn: {
    fontWeight: 'bold',
    color: colors.light,
  },
  btn: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    width: 220,
  },
  btnText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalDetailList;
