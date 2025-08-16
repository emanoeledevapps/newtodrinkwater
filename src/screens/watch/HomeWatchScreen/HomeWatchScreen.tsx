import { ScrollView, View } from "react-native";

import { useGetConsumptionDay } from "@db";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";
import { useEffect, useState } from "react";

export function HomeWatchScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });

  useEffect(() => {
    setSelectedDate(new Date());
  }, [])

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <ScrollView>
        <Consumption total={totalConsumption} consumptionAdded={refetch} />
        <ListConsumption list={list} />
      </ScrollView>
    </View>
  )
}