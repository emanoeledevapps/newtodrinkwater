import { Text } from "@components";
import { dbService } from "@db";
import { format } from "date-fns";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

interface Props {
  total: number;
  consumptionAdded: () => void;
}
export function Consumption({ total, consumptionAdded }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleAddConsumption() {
    setLoading(true);
    await dbService.addConsumption({
      formattedDate: format(new Date(), "dd/MM/yyyy"),
      quantity: 100
    });
    consumptionAdded();
    setLoading(false);
  }

  return (
    <View className="gap-3 items-center">
      <Text className="relative font-bold text-3xl text-primary-light">
        {total} ml
      </Text>

        <TouchableOpacity
          className="w-28 h-10 rounded-full bg-gray-700 items-center justify-center"
          onPress={handleAddConsumption}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Text className="font-bold text-white">
              +100 ml
            </Text>
          )}
        </TouchableOpacity>
    </View>
  )
}
