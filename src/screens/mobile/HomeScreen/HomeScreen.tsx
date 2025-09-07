import { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Screen } from "@components";
import { useGetConsumptionDay } from "@db";
import { MobileRoutesStackParamsList } from "@routes";

import { Consumption } from "./components/Consumption";
import { ListConsumption } from "./components/ListConsumption/ListConsumption";

type ScreenProps = NativeStackScreenProps<MobileRoutesStackParamsList, "HomeScreen">
export function HomeScreen({ }: ScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { list, totalConsumption, refetch } = useGetConsumptionDay({ date: selectedDate });
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