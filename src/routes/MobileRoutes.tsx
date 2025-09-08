import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen, IdealGoalScreen, ListScreen, PreferencesScreen } from "@screens";

export type MobileRoutesStackParamsList = {
  HomeScreen: undefined;
  PreferencesScreen: undefined;
  IdealGoalScreen: undefined;
  ListScreen: {
    date: Date;
  }
}

const Stack = createNativeStackNavigator<MobileRoutesStackParamsList>()
export function MobileRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen name="IdealGoalScreen" component={IdealGoalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}