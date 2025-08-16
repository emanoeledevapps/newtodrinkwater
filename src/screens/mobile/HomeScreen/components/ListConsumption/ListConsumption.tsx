import { ScrollView, View } from "react-native";

import { WaterConsumptionProps } from "@db";
import { Text } from "@components";

import { DateSelector } from "./DateSelector";
import { ConsumptionItem } from "./ConsumptionItem";
import { AddConsumption } from "./AddConsumption";

interface Props {
  selectedDate: Date;
  list: WaterConsumptionProps[];
  changeDate: (date: Date) => void;
  consumptionAdded: () => void;
}
export function ListConsumption({ changeDate, list, selectedDate, consumptionAdded }: Props) {

  return (
    <View className="w-full px-5 gap-5 mt-[-120]">
      <View className="p-3 bg-card-light dark:bg-card-dark rounded-2xl">
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
      
      <AddConsumption
        selectedDate={selectedDate}
        consumptionAdded={consumptionAdded}
      />
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