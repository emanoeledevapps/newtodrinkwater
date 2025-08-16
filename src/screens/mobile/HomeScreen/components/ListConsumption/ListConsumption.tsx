import { FlatList, ListRenderItemInfo, ScrollView, View } from "react-native";

import { WaterConsumptionProps } from "@db";
import { Text } from "@components";

import { DateSelector } from "./DateSelector";
import { ConsumptionItem } from "./ConsumptionItem";

interface Props {
  selectedDate: Date;
  list: WaterConsumptionProps[];
  changeDate: (date: Date) => void;
}
export function ListConsumption({ changeDate, list, selectedDate }: Props) {

  return (
    <View className="w-full px-5">
      <DateSelector selectedDate={selectedDate} changeDate={changeDate} />

      {list.length === 0 ? (
        <EmptyList />
      ) : (
        <ScrollView 
          className="w-full h-[200]" 
          showsVerticalScrollIndicator={false}
        >
          {list.map((item) => (
            <ConsumptionItem key={item.id} data={item} />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

function EmptyList() {
  return (
    <View className="h-[200] items-center justify-center">
      <Text className="text-primary-text-light dark:text-primary-text-dark">
        Nenhum registro feito
      </Text>
    </View>
  )
}