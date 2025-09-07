import { useEffect, useState } from "react";
import { TouchableOpacity, View, AppState } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useGetConsumptionDay } from "@db";
import { Icon, Screen, Text } from "@components";
import { WatchRoutesStackParamsList } from "@routes";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

type ScreenProps = NativeStackScreenProps<WatchRoutesStackParamsList, "HomeWatchScreen">
export function HomeWatchScreen({ navigation }: ScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        setSelectedDate(new Date());
      }
      setAppState(nextAppState);
    });

    return () => sub.remove();
  }, [appState])

  function handleGoToPreferences() {
    navigation.navigate("PreferencesWatchScreen")
  }

  return (
    <Screen watch>
      <Consumption total={totalConsumption} consumptionAdded={refetch} />
      <ListConsumption list={list} />

      <View className="items-center mb-10">
        <TouchableOpacity
          className="px-5 h-10 rounded-full bg-gray-700 items-center justify-center flex-row gap-3"
          onPress={handleGoToPreferences}
        >
          <Icon name="settings" color="white" />
          <Text className="font-bold text-white text-sm">Preferências</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}
