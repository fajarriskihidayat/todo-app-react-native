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
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import 'moment/locale/id';

import colors from '../configs/colors';

import ModalEditList from '../components/ModalEditList';
import ModalDetailList from '../components/ModalDetailList';

const CardList = props => {
  const [id, setId] = useState('');
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);

  const changeModalEdit = bool => {
    setModalEdit(bool);
  };

  const changeModalDetail = bool => {
    setModalDetail(bool);
  };
  return (
    <View style={{paddingBottom: 50}}>
      <FlatList
        key={props.list.id}
        data={props.list}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{
          width: '74%',
          borderWidth: 1,
          borderColor: colors.dark,
          marginRight: 0,
        }}
        keyExtractor={item => item.id}
        renderItem={e => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                // alignItems: 'center',
                borderWidth: 2,
                borderColor: colors.info,
                borderRadius: 10,
                backgroundColor: colors.primary,
                padding: 8,
                elevation: 2,
                maxWidth: '49%',
                marginTop: 4,
              }}
              key={e.item.id}
              onPress={() => {
                changeModalDetail(true);
                setId(e.item.id);
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.listName}>
                  {moment(e.item.tanggal).format('ll')}{' '}
                </Text>
                <Text style={styles.listName}>
                  {moment(e.item.waktu, 'HH:mm:ss').format('HH:mm')}
                </Text>
              </View>
              <Text style={styles.listStatus}>
                <Text style={{fontWeight: 'bold'}}>Status:</Text>{' '}
                {e.item.status}
              </Text>
              <Text style={styles.listActivity} numberOfLines={1}>
                {e.item.kegiatan}
              </Text>
              <View style={{marginTop: 4}}>
                <TouchableOpacity
                  style={{...styles.btnList, backgroundColor: colors.success}}
                  onPress={() => {
                    changeModalEdit(true);
                    setId(e.item.id);
                  }}>
                  <Text style={{color: colors.light, fontWeight: 'bold'}}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.btnList, backgroundColor: colors.danger}}
                  onPress={() => alertDelete(e.item.id)}>
                  <Text style={{color: colors.light, fontWeight: 'bold'}}>
                    Hapus
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
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

export default CardList;
