// NotificationService.js
import { Platform } from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

class NotificationService {
  configure = () => {
    PushNotification.configure({
      // Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification);
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };

  scheduleNotification = (message, date) => {
    PushNotification.localNotificationSchedule({
      message: message,
      date: date,
    });
  };

  cancelAllNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.removeAllDeliveredNotifications();
    PushNotificationIOS.removeAllDeliveredNotifications();
  };
}

const notificationService = new NotificationService();
export default notificationService;
