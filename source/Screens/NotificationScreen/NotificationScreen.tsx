import React from 'react';
import {useNotificationScreen} from './NotificationScreenHook';
import Container from 'source/Components/Container/Container';

const NotificationScreen = () => {
  const {} = useNotificationScreen();

  return (
    <Container>{/* write your notificationscreen UI code here. */}</Container>
  );
};

export default NotificationScreen;
