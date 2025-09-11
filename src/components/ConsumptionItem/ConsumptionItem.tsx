import { View } from "react-native";
import { format } from "date-fns";

import { WaterConsumptionProps } from "@db";
import { Icon, Text } from "@components";

interface Props {
  data: WaterConsumptionProps
}
export function ConsumptionItem({ data }: Props) {
  return (
    <View className="flex-row items-center justify-between w-full border-b border-gray-300 dark:border-gray-800 pt-2 pb-4">
      <View className="">
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          +{data.quantity} ml
        </Text>
        <Icon 
          name={data.register_type === "bottle" ? "bottle" : "glass"} 
          size={data.register_type === "bottle" ? 25 : 20} 
          color="#aaa"
        />
      </View>
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          {format(new Date(data.created_at), "kk:mm")} 
        </Text>
    </View>
  )
}
