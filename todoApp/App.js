import {TouchableOpacity, Modal, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from './src/configs/colors';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Homepage from './src/screens/Homepage';
import Account from './src/screens/Account';
import SplashScreen from './src/screens/SplashScreen';
import AddList from './src/screens/AddList';
import EditList from './src/screens/EditList';
import DetailList from './src/screens/DetailList';
import EditPassword from './src/screens/EditPassword';
import ModalAddList from './src/components/ModalAddList';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const RootHome = () => {
    const {navigate} = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const changeModalVisible = bool => {
      setModalVisible(bool);
    };

    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarActiveTintColor: colors.light,
          tabBarInactiveTintColor: colors.secondary,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.primary,
            height: 64,
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 10,
          },
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={Homepage}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={28} />
            ),
          }}
        />
        <Tab.Screen
          name="Tambah"
          component={AddList}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({color}) => (
              <>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: colors.danger,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginBottom: 100,
                  }}
                  onPress={() => changeModalVisible(true)}>
                  <Icon name="plus" color={colors.light} size={28} />
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    changeModalVisible(false);
                  }}>
                  <ModalAddList changeModalVisible={changeModalVisible} />
                </Modal>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({color}) => (
              <Icon name="account" color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Homepage"
          component={RootHome}
          options={{
            // headerShown: false,
            headerTitle: 'ToDo List App',
            headerTitleAlign: 'center',
            headerTintColor: colors.light,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="DetailList"
          component={DetailList}
          options={{
            headerTitle: 'Detail List',
            headerTintColor: colors.light,
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
        <Stack.Screen
          name="AddList"
          component={AddList}
          options={{
            headerTitle: 'Tambah List',
            headerTintColor: colors.light,
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
        <Stack.Screen
          name="EditList"
          component={EditList}
          options={{
            headerTitle: 'Edit List',
            headerTintColor: colors.light,
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
        <Stack.Screen
          name="EditPassword"
          component={EditPassword}
          options={{
            headerTitle: 'Edit Password',
            headerTintColor: colors.light,
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
