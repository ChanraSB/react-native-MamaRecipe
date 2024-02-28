
import React from 'react'
import MainRoute from './src/router'
import { LogLevel, OneSignal } from 'react-native-onesignal';
const App = () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize("bb0eda80-cb20-441f-8489-78f41f33daa4");

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });
  return (
    <MainRoute />
  )
}

export default App