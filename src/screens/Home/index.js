import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {request, PERMISSIONS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { Notifications } from 'react-native-notifications';
import PushNotification from 'react-native-push-notification';

export const displayLocalNotification = (remoteMessage) => {
    const { title, body } = remoteMessage.notification;

    PushNotification.localNotification({
      title: Local+ title,
      message: body,
      channelId: 'default-channel-id', // Specify a channel ID for Android
    });
  };

const index = () => {

    useEffect(() => {
        // Configure Firebase Messaging
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('Message received:', remoteMessage);
          displayLocalNotification(remoteMessage);
        });
    
        // Configure Local Notification Service
        Notifications.events().registerNotificationOpened((notification, completion) => {
          console.log('Notification opened:', notification.payload);
          completion(); // Call completion after handling the notification
        });
    
        // Dismiss all previous notifications
        Notifications.removeAllDeliveredNotifications()
    
        return () => {
          unsubscribe(); // Clean up Firebase message listener
        };
      }, []);



    useEffect(() => {
        AccessToken();
      }, []);

    const AccessToken = ()=>{
        request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then((result) => {
         console.log(result)
         if(result  === "granted"){
            getFCMToken();
         }
          });
    }

    const getFCMToken = async () => {
        try {
          const token = await messaging().getToken();
          if (token) {
            console.log('FCM Token:', token);
            // Do something with the token, like sending it to your server
          } else {
            console.log('No FCM token available');
          }
        } catch (error) {
          console.error('Error getting FCM token:', error);
        }
      };

  return (
    <View style={styles.container}>
      <Text>index</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    }
})