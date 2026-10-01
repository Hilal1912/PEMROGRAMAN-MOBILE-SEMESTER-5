import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Hanya mengimpor 2 file yang SUDAH ADA di folder screens milikmu
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. Bottom Tab Navigation
function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0284c7' }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Beranda' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}

// 2. Drawer Navigation
function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0284c7' }, headerTintColor: '#ffffff' }}>
      <Drawer.Screen name="Dashboard" component={BottomTabNavigator} options={{ drawerLabel: 'Utama (Tab Nav)', title: 'Dashboard Aplikasi' }} />
      <Drawer.Screen name="ProfileDrawer" component={ProfileScreen} options={{ drawerLabel: 'Profil Pengguna', title: 'Halaman Profil' }} />
    </Drawer.Navigator>
  );
}

// 3. Root Stack Navigation (Aplikasi Utama)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainApp">
        <Stack.Screen name="MainApp" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}