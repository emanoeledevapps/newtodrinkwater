import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

import { HomeScreen } from '@screens';

import "./global.css";
import { database } from '@db';

function App() {
  const [loadingApp, setLoadingApp] = useState(true);

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
    await DeviceInfo.hasSystemFeature(
      'android.hardware.type.watch',
    );
  }

  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}

export default App;
