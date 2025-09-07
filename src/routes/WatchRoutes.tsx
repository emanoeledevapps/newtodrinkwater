import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeWatchScreen, PreferencesWatchScreen } from "@screens";

export type WatchRoutesStackParamsList = {
  HomeWatchScreen: undefined;
  PreferencesWatchScreen: undefined;
  ListScreen: {
    date: Date;
  }
}

const Stack = createNativeStackNavigator<WatchRoutesStackParamsList>()
export function WatchRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
      >
        <Stack.Screen name="HomeWatchScreen" component={HomeWatchScreen} />
        <Stack.Screen name="PreferencesWatchScreen" component={PreferencesWatchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}