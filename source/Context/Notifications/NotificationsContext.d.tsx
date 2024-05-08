export interface INotificationContextValues {
  unReadNotificationsCount: number;
  getUnReadNotificationsCount: () => void;
  resetNotificationsContext: () => void;
}
