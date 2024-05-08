import {useCallback, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {AppState} from 'react-native';

export const useNotificationsContextHook = () => {
  const appState = useRef(AppState.currentState);
  const {watch, reset} = useForm({
    defaultValues: {unReadNotificationsCount: 0},
  });

  const unReadNotificationsCount = watch('unReadNotificationsCount');

  const getUnReadNotificationsCount = useCallback(async () => {
    // get notifications count from backend and set into the unReadNotificationCount.
  }, []);

  useEffect(() => {
    // Load the timer when the component mounts and register the event listener for app state changes
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // Load the timer when the app returns to the foreground
        getUnReadNotificationsCount();
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        // when the app goes to the background or inactive
      }

      // Update the current app state
      appState.current = nextAppState;
    });

    // Clean up the event listener on component unmount
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetNotificationsContext = useCallback(() => {
    reset();
  }, [reset]);

  return {
    getUnReadNotificationsCount,
    unReadNotificationsCount,
    resetNotificationsContext,
  };
};
