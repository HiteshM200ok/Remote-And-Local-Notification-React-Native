import React from 'react';
import {useHomeScreen} from './HomeScreenHook';
import {Container} from '@component-root';

const HomeScreen = () => {
  const {} = useHomeScreen();

  return <Container>{/* write your homescreen UI code here. */}</Container>;
};

export default HomeScreen;
