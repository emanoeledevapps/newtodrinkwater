import { View } from "react-native";
import { format } from "date-fns";

import { WaterConsumptionProps } from "@db";
import { Icon, Text } from "@components";
import { usePreferencesContext } from "@hooks";

interface Props {
  data: WaterConsumptionProps
}
export function ConsumptionItem({ data }: Props) {
  const { darkMode } = usePreferencesContext();

  return (
    <View className="flex-row items-center justify-between w-full border-b border-gray-300 dark:border-gray-700 py-4">
      <View className="flex-row items-center">
        <View className="w-[30]">
          <Icon 
            name={data.register_type === "bottle" ? "bottle" : "glass"} 
            size={data.register_type === "bottle" ? 25 : 20} 
            color={darkMode ? "#E0F2FE" : "#1E3A8A"}
          />
        </View>
        <Text className="text-primary-text-light dark:text-primary-text-dark">
          +{data.quantity} ml
        </Text>
      </View>

      <Text className="text-primary-text-light dark:text-primary-text-dark">
        {format(new Date(data.created_at), "kk:mm")} 
      </Text>
    </View>
  )
}
