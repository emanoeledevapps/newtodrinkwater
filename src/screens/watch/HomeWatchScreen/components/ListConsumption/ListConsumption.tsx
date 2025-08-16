import { View } from "react-native";

import { WaterConsumptionProps } from "@db";
import { Text } from "@components";

import { ConsumptionItem } from "./ConsumptionItem";

interface Props {
  list: WaterConsumptionProps[];
}
export function ListConsumption({ list }: Props) {

  return (
    <View className="w-full px-5 gap-5">
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