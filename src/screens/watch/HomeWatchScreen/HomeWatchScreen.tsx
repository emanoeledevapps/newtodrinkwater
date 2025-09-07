import { useEffect, useState } from "react";

import { useGetConsumptionDay } from "@db";
import { Screen, Text } from "@components";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WatchRoutesStackParamsList } from "@routes";
import { TouchableOpacity, View } from "react-native";

type ScreenProps = NativeStackScreenProps<WatchRoutesStackParamsList, "HomeWatchScreen">
export function HomeWatchScreen({ navigation }: ScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });

  useEffect(() => {
    setSelectedDate(new Date());
  }, [])

  function handleGoToPreferences() {
    navigation.navigate("PreferencesWatchScreen")
  }

  return (
    <Screen watch>
      <Consumption total={totalConsumption} consumptionAdded={refetch} />
      <ListConsumption list={list} />

      <View className="items-center mb-10">
        <TouchableOpacity
          className="px-10 h-10 rounded-full bg-gray-700 items-center justify-center"
          onPress={handleGoToPreferences}
        >
          <Text className="font-bold text-white text-sm">Preferências</Text>
        </TouchableOpacity>

      </View>
    </Screen>
  )
}
