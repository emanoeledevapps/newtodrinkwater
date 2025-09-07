import { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen, Text } from "@components";
import { useGetConsumptionDay } from "@db";
import { MobileRoutesStackParamsList } from "@routes";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

type ScreenProps = NativeStackScreenProps<MobileRoutesStackParamsList, "HomeScreen">
export function HomeScreen({ navigation }: ScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });

  function handleGoToPreferences() {
    navigation.navigate("PreferencesScreen")
  }
  return (
    <Screen hideHeader>
      <View className="flex-1 items-center justify-center gap-10">
        <Consumption 
          total={totalConsumption}
        />

        <ListConsumption
          list={list}
          selectedDate={selectedDate}
          changeDate={setSelectedDate}
          consumptionAdded={refetch}
        />

        <Text onPress={handleGoToPreferences}>Preferencias</Text>
      </View>
    </Screen>
  )
}