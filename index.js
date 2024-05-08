/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from '@app/App';
import {name as appName} from './app.json';
import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {onFCMMessageReceived} from '@services/Notifications';
import {NotificationsContextProvider} from './source/Context/Notifications/NotificationsContextRoot';

// Handle background messages using setBackgroundMessageHandler
messaging().setBackgroundMessageHandler(async remoteMessage => {});

const Root = () => {
  useEffect(() => {
    /**
     * listen to FCM remote messages in the while app is in foreground state
     * send the remote message to onFCMMessageReceived handler to prepared local notification
     * */
    const unsubscribe = messaging().onMessage(onFCMMessageReceived);
    return unsubscribe;
  }, []);

  return (
    <NotificationsContextProvider>
      <App />
    </NotificationsContextProvider>
  );
};

// Check if app was launched in the background and conditionally render null if so
const HeadlessCheck = ({isHeadless}) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <Root />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);










