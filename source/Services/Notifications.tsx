import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import {EventRegister} from 'react-native-event-listeners';
import {isPlainObject} from 'lodash';

const ANDROID_POST_NOTIFICATIONS = 'android.permission.POST_NOTIFICATIONS';
const AuthorizationStatus = messaging.AuthorizationStatus;
const IDENTITY = 'FCM_NOTIFICATION';

export const FCM_NOTIFICATION_LISTNER_TYPE = {
  ON_TAP_NOTIFICATION: `${IDENTITY}_ON_TAP`,
  ON_ARRIVED_NOTIFICATION: `${IDENTITY}_ON_ARRIVED_FCM_NOTIFICATION`,
  ON_LOCAL_NOTIFICATION_CREATED: `${IDENTITY}_ON_LOCAL_NOTIFICATION_CREATED`,
};

export const arrangeNotificationInfo = (
  method: string,
  {data, notification}: any,
) => {
  let notificationInfo = {method, data: data ? data : {}};
  if (Platform.OS === 'ios') {
    notificationInfo = {...notificationInfo, ...data.notification};
  } else {
    notificationInfo = {...notificationInfo, ...notification};
  }
  return notificationInfo;
};

export const onFCMMessageReceived = async (remoteMessage: any = {}) => {
  if (!isPlainObject(remoteMessage)) {
    return; // remoteMessage is not an object
  }
  let isPermissionGranted = Platform.OS === 'android' ? true : false;
  let channelId = null;
  const {notification, data} = remoteMessage;

  // Request permissions (required for iOS)
  if (Platform.OS === 'ios') {
    try {
      const authStatus = await notifee.requestPermission();
      if (
        authStatus &&
        (authStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
          authStatus.authorizationStatus === AuthorizationStatus.PROVISIONAL)
      ) {
        isPermissionGranted = true;
      }
    } catch (error) {}
  }

  // permission in not granted
  if (!isPermissionGranted) {
    return;
  }

  // Create a channel (required for Android)
  if (Platform.OS === 'android') {
    try {
      channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
    } catch (error) {}
  }

  if (Platform.OS === 'android' && !channelId) {
    return; // channelId in not created
  }

  // prepare the local notification using remote notification message which is received while app is in foreground state
  try {
    const id = await notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      data: data ? data : {},
      ...(Platform.OS === 'android' &&
        channelId && {
          android: {
            importance: AndroidImportance.HIGH,
            channelId,
            smallIcon: 'ic_notification',
            color: '#5db761',
            sound: 'default',
            style: {
              type: AndroidStyle.BIGTEXT,
              title: notification.title,
              text: notification.body,
            },
            pressAction: {id: 'default'},
          },
        }),
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    });
    if (id) {
      console.log('Local notification is created.', id);
    }
  } catch (error) {}
};

const getNotificationPermissionMsg = (authStatus: any) => {
  let message = '';
  // authStatus = -1 (NOT_DETERMINED), Permission has not yet been requested for your application.
  // authStatus =  0 (DENIED), The user has denied notification permissions.
  // authStatus =  1 (AUTHORIZED), The user has accept the permission & it is enabled.
  // authStatus =  2 (PROVISIONAL), Provisional authorization has been granted.
  if (authStatus === AuthorizationStatus.NOT_DETERMINED) {
    message = 'Permission has not yet been requested';
  } else if (authStatus === AuthorizationStatus.DENIED) {
    message = 'The user has denied notification permission.';
  } else if (authStatus === AuthorizationStatus.AUTHORIZED) {
    message = 'The user has accepted the notification permission.';
  } else if (authStatus === AuthorizationStatus.PROVISIONAL) {
    message = 'Provisional authorization has been granted.';
  }
  return message;
};

export const hasNotificationPersmission = async () => {
  let hasGranted = false;
  let message = getNotificationPermissionMsg(
    AuthorizationStatus.NOT_DETERMINED,
  );
  let authStatus = AuthorizationStatus.NOT_DETERMINED;
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const hasPermission = await PermissionsAndroid.check(
        ANDROID_POST_NOTIFICATIONS,
      );
      if (hasPermission === true) {
        hasGranted = true;
        message = getNotificationPermissionMsg(AuthorizationStatus.AUTHORIZED);
      }
    } else {
      authStatus = await messaging().hasPermission();
      if (
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL
      ) {
        hasGranted = true;
      }
      message = getNotificationPermissionMsg(authStatus);
    }
  } catch (error: any) {
    message = error.message;
  } finally {
    return {
      hasGranted,
      message,
      authStatus,
    };
  }
};

export const requestNotificationPermission = async () => {
  let isPermissionGranted = false;
  let message = '';
  let authStatus = AuthorizationStatus.NOT_DETERMINED;
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const permissionGranted = await PermissionsAndroid.request(
        ANDROID_POST_NOTIFICATIONS,
      );
      if (permissionGranted === 'granted') {
        isPermissionGranted = true;
        message = getNotificationPermissionMsg(AuthorizationStatus.AUTHORIZED);
      } else if (permissionGranted === 'denied') {
        message = getNotificationPermissionMsg(AuthorizationStatus.DENIED);
      } else if (permissionGranted === 'never_ask_again') {
        message =
          'The user has denied and never ask again notification permission';
      }
    } else {
      authStatus = await messaging().requestPermission();
      if (
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL
      ) {
        isPermissionGranted = true;
      }
      message = getNotificationPermissionMsg(authStatus);
    }
  } catch (error: any) {
    message = error.message;
  } finally {
    return {
      isPermissionGranted,
      message,
      authStatus,
    };
  }
};

export const getFCMToken = async () => {
  let fcmToken = null;
  let message = '';
  try {
    fcmToken = await messaging().getToken();
  } catch (error: any) {
    message = error.mesage;
  } finally {
    return {fcmToken, message};
  }
};

export const deleteFCMToken = async () => {
  return messaging().deleteToken();
};

// Application state "Background" => " Foreground"
export const onNotificationOpenedApp = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    if (remoteMessage) {
      const notificationInfo = arrangeNotificationInfo(
        'onNotificationOpenedApp',
        remoteMessage,
      );
      EventRegister.emit(
        FCM_NOTIFICATION_LISTNER_TYPE.ON_TAP_NOTIFICATION,
        notificationInfo,
      );
    }
  });
};

// Application State "Quit" => "Foreground"
export const getInitialNotification = async () => {
  try {
    const remoteMessage = await messaging().getInitialNotification();
    if (remoteMessage) {
      const notificationInfo = arrangeNotificationInfo(
        'getInitialNotification',
        remoteMessage,
      );
      EventRegister.emit(
        FCM_NOTIFICATION_LISTNER_TYPE.ON_TAP_NOTIFICATION,
        notificationInfo,
      );
    }
  } catch (error) {}
};
