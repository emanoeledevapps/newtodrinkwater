import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';

import { database } from '@db';
import { PreferecesProvider } from '@contexts';
import { MobileRoutes, WatchRoutes } from '@routes';

import "./global.css";

function App() {
  const [isWatch, setIsWatch] = useState(false);

  useEffect(() => {
    checkDevice();
    initDB();
  }, []);

  async function initDB() {
    await database.openDB();
    await database.createTable();
  }

  async function checkDevice() {
    const response = await DeviceInfo.hasSystemFeature(
      'android.hardware.type.watch',
    );
    setIsWatch(response);
  }

  return (
    <SafeAreaProvider>
      <PreferecesProvider>
        {isWatch ? <WatchRoutes /> : <MobileRoutes /> }
      </PreferecesProvider>
    </SafeAreaProvider>
  );
}

export default App;
