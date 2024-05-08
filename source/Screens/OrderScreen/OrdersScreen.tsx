import React from 'react';
import {useOrdersScreen} from './OrdersScreenHook';
import Container from 'source/Components/Container/Container';

const OrdersScreen = () => {
  const {} = useOrdersScreen();

  return <Container>{/* write your orderscreen UI code here. */}</Container>;
};

export default OrdersScreen;
