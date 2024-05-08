import Routes from '@navigation/NavigationRoutes';
import {RouteProp} from '@react-navigation/native';
import {BottomTabNavigatorParamList} from 'source/Navigation/RootNavigation.d';

export type OrderScreenRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  Routes.Orders
>;
