/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MainRoute from './src/navigation/MainRoute';
import messaging from '@react-native-firebase/messaging';
import { AppState } from 'react-native';
import { displayLocalNotification } from './src/screens/Home';
import notifee,{AndroidColor } from '@notifee/react-native';

const handleCustomNotification = async(notificationData) => {
    console.log('Custom Notification Data:', notificationData);
    const { title, body } = notificationData.notification;

    await notifee.requestPermission()
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      // Display a notification
      await notifee.displayNotification({
        title: 'Notification Title',
        body: 'Main body content of the notification',
        color:AndroidColor.BLUE,
        android: {
          channelId,
        //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
  };
  
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    handleCustomNotification(remoteMessage.data);
  });

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('Background event:', type, detail);
    // Handle background notifications here
  });

 messaging().onMessage(async remoteMessage => {
    console.log('Message received:', remoteMessage);
    handleCustomNotification(remoteMessage);
  });
AppRegistry.registerComponent(appName, () => MainRoute);
