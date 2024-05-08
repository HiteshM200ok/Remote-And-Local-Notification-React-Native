import {RouteProp} from '@react-navigation/native';
import Routes from './NavigationRoutes';

export type BottomTabNavigatorParamList = {
  Home: {
    id: string;
  };
  Orders: undefined;
  Notifications: undefined;
};

export type OrderScreenRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  Routes.Orders
>;

export type NotificationRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  Routes.Notifications
>;
