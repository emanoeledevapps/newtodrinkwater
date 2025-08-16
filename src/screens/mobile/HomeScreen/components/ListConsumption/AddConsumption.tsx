import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { format, isToday } from "date-fns";

import { dbService } from "@db";
import { Text } from "@components";
import { usePreferencesContext } from "@hooks";

interface Props {
  selectedDate: Date;
  consumptionAdded: () => void
}
export function AddConsumption({ consumptionAdded, selectedDate }: Props) {
  const today = isToday(selectedDate);
  const { glassSize, unit } = usePreferencesContext();
  const [loading, setLoading] = useState(false);

  async function handleAddConsumption() {
    setLoading(true);
    await dbService.addConsumption({
      formattedDate: format(new Date(), "dd/MM/yyyy"),
      quantity: glassSize
    });
    consumptionAdded();
    setLoading(false);
  }

  return (
    <View className="w-full items-center">
      <TouchableOpacity
        className="w-40 h-14 rounded-full bg-accent-light items-center justify-center disabled:opacity-50"
        onPress={handleAddConsumption}
        disabled={loading || !today}
      >
        {loading ? (
          <ActivityIndicator size={20} color="white" />
        ) : (
          <Text className="font-bold text-white">
            +{glassSize} {unit}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
