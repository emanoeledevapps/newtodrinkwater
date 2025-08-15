import { useGetConsumptionDay } from "@db";
import { useState } from "react";
import { View } from "react-native";
import { Consumption } from "./components/Consumption";

export function HomeWatchScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate })

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Consumption total={totalConsumption} consumptionAdded={refetch} />
    </View>
  )
}