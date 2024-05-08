import {useRoute} from '@react-navigation/native';
import {NotificationScreenRouteProp} from './NotificationScreen.d';

export const useNotificationScreen = () => {
  // write your notification screen logic here.
  const NotificationRoute = useRoute<NotificationScreenRouteProp>();

  return {NotificationRoute};
};
