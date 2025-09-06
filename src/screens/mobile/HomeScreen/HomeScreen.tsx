import { View } from "react-native";
import { Screen } from "@components";
import { useGetConsumptionDay } from "@db";
import { useState } from "react";
import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

export function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });

  return (
    <Screen>
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
      </View>
    </Screen>
  )
}