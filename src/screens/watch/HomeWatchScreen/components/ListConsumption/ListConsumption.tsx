import { View } from "react-native";

import { WaterConsumptionProps } from "@db";
import { Icon, Text } from "@components";

import { ConsumptionItem } from "./ConsumptionItem";

interface Props {
  list: WaterConsumptionProps[];
}
export function ListConsumption({ list }: Props) {

  return (
    <View className="w-full px-5 pb-10">
      <View className="flex-row items-center gap-1 mb-2">
        <Icon name="calendar" size={16} />
        <Text className="text-white text-sm">Hoje</Text>
      </View>

      {list.length === 0 ? (
        <EmptyList />
      ) : (
        <>
          {list.map((item) => (
            <ConsumptionItem key={item.id} data={item} />
          ))}
        </>
      )}
    </View>
  )
}

function EmptyList() {
  return (
    <View className="h-[100] items-center justify-start pt-5">
      <Text className="text-primary-text-dark text-center">
        Nenhum registro feito hoje
      </Text>
    </View>
  )
}