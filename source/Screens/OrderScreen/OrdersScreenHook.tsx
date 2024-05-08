import {useRoute} from '@react-navigation/native';
import {OrderScreenRouteProp} from './OrderScreen.d';

export const useOrdersScreen = () => {
  //write your order screen logic here.
  const OrderRoute = useRoute<OrderScreenRouteProp>();

  return {OrderRoute};
};
