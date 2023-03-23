import {NavigationContainer, DefaultTheme, DarkTheme as dt } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { adaptNavigationTheme, MD2DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';
import { Appearance } from 'react-native';
import mytheme from './constants/themes';
import {Image} from 'react-native';

import Home from './app/HomeTab/Home';
import Profile from './app/ProfileTab/Profile';
import SelectChapter from './app/SelectChapter';
import { Chapter, Manga } from './constants/interfaces';
import ReadChapter from './app/ReadChapter';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from './app/SearchTab/Search';
import Login from './components/Login';
import Register from './components/Register';
import { auth } from './db/firebase';
import { MobileAds } from 'react-native-google-mobile-ads';
import ForgotPassword from './components/ForgotPassword';

export type Screens = {
  Tabs: undefined;
  SelectChapter: { manga: Manga}
  ReadChapter: { mal_id: number, chapter_number: number }
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type Tabs = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
}

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator<Screens>();

export default function App() {
  const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
  const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: dt });
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme);
  });

  MobileAds().initialize()

  return (
    <PaperProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : LightTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SelectChapter" component={SelectChapter} options={{
            title: 'Seleccionar Capitulo',
          }} />
          <Stack.Screen name="ReadChapter" component={ReadChapter} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={Login} options={{title:"Iniciar Sesion"}}/>
          <Stack.Screen name="Register" component={Register} options={{title:'Registrarse'}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title:'Recuperar Contraseña'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} 
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerLeft(props) {
            return <Image source={require('./assets/logo.png')} style={{width: 40, height: 40, borderRadius:100, marginLeft:10}} />
          },
        }}
      />
      <Tab.Screen name="Search" component={Search} 
        options={{
          headerShown:false,
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Profile" component={auth.currentUser ? Profile : Login}
        options={{
          headerShown:false,
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}