import { Alert, View } from "react-native";
import { Screen } from "@components";
import { useGetConsumptionDay } from "@db";
import { useEffect, useState } from "react";
import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";
import { watchEvents } from 'react-native-wear-connectivity';

export function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });

  useEffect(() => {
  const unsubscribe = watchEvents.on('message', () => {
    Alert.alert("ok")
    //setCount((prevCount) => prevCount + 1);
  });

  return () => {
    unsubscribe();
  };
}, []);

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