import React from 'react';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import Colors from '@assets/Colors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Routes from './NavigationRoutes';
import {Platform} from 'react-native';

const getTabIcons = (route: any, color: any) => {
  let iconName = '';

  switch (route.name) {
    case Routes.Home:
      iconName = 'home';
      break;
    case Routes.Orders:
      iconName = 'create';
      break;
    case Routes.Notifications:
      iconName = 'notifications';
      break;
    default:
      break;
  }

  return <Ionicon name={iconName} color={color} size={25} />;
};

export const TabNavigatorScreenOptions: BottomTabNavigationOptions = ({
  route,
}: any) => {
  return {
    tabBarIcon: ({color}: any) => getTabIcons(route, color),
    tabBarStyle: {
      ...(Platform.OS == 'android' && {
        paddingBottom: 5,
      }),
    },
    tabBarActiveTintColor: Colors.Primary,
    tabBarInactiveTintColor: Colors.Gray,
    tabBarActiveBackgroundColor: Colors.White,
    tabBarInactiveBackgroundColor: Colors.White,
    headerTintColor: Colors.White,
    headerStyle: {
      backgroundColor: Colors.Primary,
    },
  };
};
