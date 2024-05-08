import {useRoute} from '@react-navigation/native';
import {HomeScreenRouteProp} from './HomeScreen.d';

export const useHomeScreen = () => {
  //write your home screen logic here.
  const HomeRoute = useRoute<HomeScreenRouteProp>();
  return {HomeRoute};
};
