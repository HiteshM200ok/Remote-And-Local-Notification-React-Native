import React from 'react';
import {createContext, useContext, useMemo} from 'react';
import {INotificationContextValues} from './NotificationsContext.d';
import {useNotificationsContextHook} from './NotificationsContextHook';

const NotificationsContext = createContext<INotificationContextValues>({
  unReadNotificationsCount: 0,
  getUnReadNotificationsCount: () => null,
  resetNotificationsContext: () => null,
});

export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsContextProvider: React.FC<any> = ({
  children,
}: any) => {
  const {
    unReadNotificationsCount,
    getUnReadNotificationsCount,
    resetNotificationsContext,
  } = useNotificationsContextHook();

  const value = useMemo(
    () => ({
      unReadNotificationsCount,
      getUnReadNotificationsCount,
      resetNotificationsContext,
    }),
    [
      unReadNotificationsCount,
      getUnReadNotificationsCount,
      resetNotificationsContext,
    ],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
