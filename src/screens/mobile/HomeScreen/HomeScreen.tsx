import { View } from "react-native";
import { Screen } from "@components";
import { useGetConsumptionDay } from "@db";
import { useState } from "react";
import { Consumption } from "./components/Consumption";

export function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate })

  return (
    <Screen>
      <View className="flex-1 items-center justify-center">
        <Consumption 
          total={totalConsumption}
          consumptionAdded={refetch}
        />
      </View>
    </Screen>
  )
}