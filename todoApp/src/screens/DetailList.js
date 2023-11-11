import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import listAPI from '../apis/listAPI';
import colors from '../configs/colors';
import moment from 'moment';
import 'moment/locale/id';
import {useNavigation} from '@react-navigation/native';

const DetailList = ({route}) => {
  const {replace} = useNavigation();
  const {id} = route.params;

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Kegiatan</Text>
      <View style={styles.body}>
        <View style={{marginBottom: 8}}>
          <Text style={styles.body1}>Tanggal :</Text>
          <Text style={styles.body2}>{moment(data.tanggal).format('ll')}</Text>
        </View>
        <View style={{marginBottom: 8}}>
          <Text style={styles.body1}>Waktu :</Text>
          <Text style={styles.body2}>
            {moment(data.waktu, 'HH:mm:ss').format('HH:mm')}
          </Text>
        </View>
        <View style={{marginBottom: 8}}>
          <Text style={styles.body1}>Status :</Text>
          <Text style={styles.body2}>{data.status}</Text>
        </View>
        <View style={{marginBottom: 8}}>
          <Text style={styles.body1}>Kegiatan :</Text>
          <Text style={styles.body2}>{data.kegiatan}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => await handleStatus(data.status)}>
        <Text style={styles.btnText}>
          {data.status === 'Belum Selesai' ? 'Selesaikan' : 'Belum Selesai'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    margin: 20,
    padding: 12,
  },
  title: {
    color: colors.light,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    margin: 16,
  },
  body1: {
    color: colors.light,
    fontWeight: 'bold',
  },
  body2: {
    color: colors.light,
  },
  btn: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  btnText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailList;
