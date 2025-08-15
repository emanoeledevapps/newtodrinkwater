import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

import { HomeScreen, HomeWatchScreen } from '@screens';

import "./global.css";
import { database } from '@db';

function App() {
  const [loadingApp, setLoadingApp] = useState(true);
  const [isWatch, setIsWatch] = useState(false);

  useEffect(() => {
    checkDevice();
    initDB();
  }, []);

  async function initDB() {
    setLoadingApp(true);
    await database.openDB();
    await database.createTable();
    setLoadingApp(false);
  }

  async function checkDevice() {
    const response = await DeviceInfo.hasSystemFeature(
      'android.hardware.type.watch',
    );
    setIsWatch(response);
  }

  return (
    <SafeAreaProvider>
      {isWatch ? <HomeWatchScreen /> : <HomeScreen /> }
    </SafeAreaProvider>
  );
}

export default App;
