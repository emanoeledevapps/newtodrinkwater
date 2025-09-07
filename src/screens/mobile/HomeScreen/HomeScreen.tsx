import { useState, useEffect } from "react";
import { View, AppState } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "@components";
import { useGetConsumptionDay } from "@db";
import { MobileRoutesStackParamsList } from "@routes";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

type ScreenProps = NativeStackScreenProps<MobileRoutesStackParamsList, "HomeScreen">
export function HomeScreen({ }: ScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appState, setAppState] = useState(AppState.currentState);
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });

  useEffect(() => {
    const sub = AppState.addEventListener("change", nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        setSelectedDate(new Date());
      }
      setAppState(nextAppState);
    });

    return () => sub.remove();
  }, [appState]);

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
      </View>
    </Screen>
  )
}