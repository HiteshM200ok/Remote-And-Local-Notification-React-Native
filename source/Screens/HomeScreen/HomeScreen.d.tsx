import Routes from '@navigation/NavigationRoutes';
import {RouteProp} from '@react-navigation/native';
import {BottomTabNavigatorParamList} from 'source/Navigation/RootNavigation.d';

export type HomeScreenRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  Routes.Home
>;
