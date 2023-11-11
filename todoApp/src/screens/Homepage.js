import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import listAPI from '../apis/listAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/id';

import colors from '../configs/colors';

import ModalEditList from '../components/ModalEditList';
import ModalDetailList from '../components/ModalDetailList';
import CardList from '../components/CardList';

const Homepage = ({navigation}) => {
  const [lists, setLists] = useState([]);
  const [users, setUsers] = useState({});
  // const [search, setSearch] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);

  const changeModalEdit = bool => {
    setModalEdit(bool);
  };

  const changeModalDetail = bool => {
    setModalDetail(bool);
  };

  // const idList = (second) => { third }

  // GET DATA LISTS
  const getList = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const user = await AsyncStorage.getItem('user');
      const getUser = JSON.parse(user);

      if (nim) {
        const {data} = await listAPI.get(`/all/${nim}`);
        setLists(data.data);
        setUsers(getUser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // SEARCH LIST
  const searchList = async search => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const {data} = await listAPI.get(`/search?nim=${nim}&kegiatan=${search}`);
      setLists(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  // DELETE LIST
  const deleteList = async id => {
    try {
      const res = await listAPI.delete(`/${id}`);
      if (res.request.status === 200) {
        ToastAndroid.show(res.data.metadata, ToastAndroid.SHORT);
        getList();
      }
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Delete list gagal !', ToastAndroid.SHORT);
    }
  };

  const alertDelete = id => {
    Alert.alert(
      'Delete List',
      'Apakah ingin menghapus data?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {text: 'OK', onPress: async () => await deleteList(id)},
      ],
      {
        cancelable: true,
      },
    );
  };

  useEffect(() => {
    Promise.all([getList()]).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View>
          <Text style={styles.textName}>{users.nama}</Text>
          <Text style={{fontStyle: 'italic'}}>{users.nim}</Text>
        </View>
        <Image
          source={{uri: 'https://reqres.in/img/faces/1-image.jpg'}}
          style={styles.img}
        />
      </View>
      <View style={styles.search}>
        <TextInput
          style={styles.inputSearch}
          placeholder="Search"
          onChangeText={value => searchList(value)}
        />
        {/* <TouchableOpacity
          style={styles.btnSearch}
          onPress={async () => await searchList()}>
          <Icon name="search" size={28} color={colors.light} />
        </TouchableOpacity> */}
      </View>
      <Text style={styles.title}>Activity List</Text>
      <ScrollView>
        {lists
          .sort((a, b) => b.id - a.id)
          .map((item, i) => (
            <TouchableOpacity
              style={styles.list}
              key={i}
              onPress={() => {
                changeModalDetail(true);
                setId(item.id);
              }}>
              <View style={{width: '70%'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.listName}>
                    {moment(item.tanggal).format('ll')}{' '}
                  </Text>
                  <Text style={styles.listName}>
                    {moment(item.waktu, 'HH:mm:ss').format('HH:mm')}
                  </Text>
                </View>
                <Text style={styles.listStatus}>{item.status}</Text>
                <Text style={styles.listActivity} numberOfLines={1}>
                  {item.kegiatan}
                </Text>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  style={{...styles.btnList, backgroundColor: colors.info}}
                  onPress={() => {
                    changeModalEdit(true);
                    setId(item.id);
                  }}>
                  <Icon name="mode-edit" color={colors.light} size={16} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.btnList, backgroundColor: colors.danger}}
                  onPress={() => alertDelete(item.id)}>
                  <Icon name="delete" color={colors.light} size={16} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* <ScrollView horizontal>
        <CardList list={lists} />
      </ScrollView> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEdit}
        onRequestClose={() => {
          changeModalEdit(false);
        }}>
        <ModalEditList changeModalVisible={changeModalEdit} id={id} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDetail}
        onRequestClose={() => {
          changeModalDetail(false);
        }}>
        <ModalDetailList changeModalVisible={changeModalDetail} id={id} />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  textName: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  inputSearch: {
    color: colors.dark,
    borderRadius: 4,
    paddingHorizontal: 20,
    fontSize: 16,
    height: 44,
    borderWidth: 1,
    borderColor: colors.primary,
    width: '100%',
  },
  btnSearch: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: 12,
  },
  list: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  listName: {
    color: colors.light,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listStatus: {
    color: colors.light,
  },
  listActivity: {
    color: colors.light,
    fontStyle: 'italic',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnList: {
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 4,
  },
});

export default Homepage;
