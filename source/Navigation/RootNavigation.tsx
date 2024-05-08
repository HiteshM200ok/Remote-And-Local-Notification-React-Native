import React, {useCallback, useEffect, useMemo} from 'react';
import Routes from './NavigationRoutes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationScreen from '@screens/NotificationScreen/NotificationScreen';
import HomeScreen from '@screens/HomeScreen/HomeScreen';
import OrdersScreen from '@screens/OrderScreen/OrdersScreen';
import colors from '@assets/Colors';
import {EventRegister} from 'react-native-event-listeners';
import {
  FCM_NOTIFICATION_LISTNER_TYPE,
  arrangeNotificationInfo,
  getFCMToken,
  getInitialNotification,
  hasNotificationPersmission,
  onNotificationOpenedApp,
  requestNotificationPermission,
} from '@services/Notifications';
import notifee, {EventDetail, EventType} from '@notifee/react-native';
import {useNotificationsContext} from '../Context/Notifications/NotificationsContextRoot';
import {Platform, StatusBar, StyleSheet, TextStyle, View} from 'react-native';
import {StyleProp} from 'react-native';
import {TabNavigatorScreenOptions} from './NavigationConfigs';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  const {
    unReadNotificationsCount,
    getUnReadNotificationsCount,
    resetNotificationsContext,
  } = useNotificationsContext();

  const tabBarBadgeStyles: StyleProp<TextStyle> = useMemo(
    () => ({
      marginTop: Platform.OS === 'ios' ? 4 : -4,
      marginLeft: -1,
      fontSize: 10,
      borderWidth: 1.33,
      borderColor: '#FFF',
      fontWeight: 'bold',
      backgroundColor: 'red',
      padding: Platform.OS === 'ios' ? 0 : 1,
    }),
    [],
  );

  const setFcmToken = useCallback(async () => {
    let isFetchTokenPermissionGranted = false;
    try {
      const checkPermission = await hasNotificationPersmission();

      if (checkPermission.hasGranted) {
        isFetchTokenPermissionGranted = true;
      } else {
        const requestPermission = await requestNotificationPermission();
        if (requestPermission.isPermissionGranted) {
          isFetchTokenPermissionGranted = true;
        }
      }
      if (!isFetchTokenPermissionGranted) {
        return;
      }
      const response = await getFCMToken();
      if (!response.fcmToken) {
        return;
      } // token not found
      // This token needs to be send to backend
    } catch (error) {
    } finally {
    }
  }, []);

  const onReceivedBgToFgNotificationData = useCallback(
    async (notificationInfo: any) => {
      if (
        notificationInfo &&
        notificationInfo.data &&
        notificationInfo.data.notificationType
      ) {
        // use this notification data and navigate to specific screen based on it's notification type
      }
    },
    [],
  );

  useEffect(() => {
    /**
     * get firebase notifcation permission, if not granted
     * get firebase notifcation token if notifcation permission granted
     * send token to backend to get the notifications
     */
    setFcmToken();

    /**
     * get un-read notifications count after logged in
     */
    getUnReadNotificationsCount();

    /**
     * on create local notification create from FCM onMessage Event
     * call get unread notification count
     */
    const onLocationNotificationCreated: any = EventRegister.addEventListener(
      FCM_NOTIFICATION_LISTNER_TYPE.ON_LOCAL_NOTIFICATION_CREATED,
      getUnReadNotificationsCount,
    );

    return () => {
      // reset notification context on unmount
      resetNotificationsContext();
      // remove listener
      EventRegister.removeEventListener(onLocationNotificationCreated);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // componentDidMount
  useEffect(() => {
    // Application state "Background" => " Foreground"
    onNotificationOpenedApp();
    // Application State "Quit" => "Foreground"
    getInitialNotification();
    // Event listener while on tap of notifiaction
    const bgToFgNotificationListner: any = EventRegister.addEventListener(
      FCM_NOTIFICATION_LISTNER_TYPE.ON_TAP_NOTIFICATION,
      onReceivedBgToFgNotificationData,
    );
    return () => {
      EventRegister.removeEventListener(bgToFgNotificationListner);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to events(for local notifiactions)
  useEffect(() => {
    return notifee.onForegroundEvent(
      ({type, detail}: {type: EventType; detail: EventDetail}) => {
        switch (type) {
          case EventType.PRESS: {
            const notificationInfo = arrangeNotificationInfo(
              'onNotificationForegroundApp',
              detail.notification,
            );
            EventRegister.emit(
              FCM_NOTIFICATION_LISTNER_TYPE.ON_TAP_NOTIFICATION,
              notificationInfo,
            );
            break;
          }
        }
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.Primary} />
      <Tab.Navigator screenOptions={TabNavigatorScreenOptions}>
        <Tab.Screen name={Routes.Home} component={HomeScreen} />
        <Tab.Screen name={Routes.Orders} component={OrdersScreen} />
        <Tab.Screen
          name={Routes.Notifications}
          component={NotificationScreen}
          options={{
            tabBarBadge: unReadNotificationsCount,
            tabBarBadgeStyle: tabBarBadgeStyles,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigation;
