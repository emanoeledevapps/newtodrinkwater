import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { format } from "date-fns";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { sendMessage } from "react-native-wear-connectivity";

import { Text } from "@components";
import { dbService } from "@db";
import { usePreferencesContext } from "@hooks";

interface Props {
  total: number;
  consumptionAdded: () => void;
}
export function Consumption({ total, consumptionAdded }: Props) {
  const { width, height } = useWindowDimensions();
  const { goal, unit, glassSize } = usePreferencesContext();
  const percentDay = (total / goal) * 100 ;

  const [loading, setLoading] = useState(false);

  async function handleAddConsumption() {
    setLoading(true);
    await dbService.addConsumption({
      formattedDate: format(new Date(), "dd/MM/yyyy"),
      quantity: glassSize,
      registerType: "glass",
      origin: "watch"
    });
    consumptionAdded();
    sendTestMessageToMobile();
    setLoading(false);
  }

  function sendTestMessageToMobile() {
    sendMessage({ event: "message", text: 'Hello watch!' }, (reply) => {
      console.log(reply); // {"text": "Hello React Native app!"}
    }, ((err) => { console.log(err)}) );
  }

  return (
    <View style={{ width, height }} className="items-center justify-center">
      <AnimatedCircularProgress
        size={width - 30}
        width={15}
        fill={percentDay}
        tintColor="#2563EB"
        backgroundColor={"#272729"}
        arcSweepAngle={180}
        rotation={270}
      >
        {
          () => (
            <View className="items-center mt-[-40]">
              <Text 
                className="font-bold text-primary-text-dark text-xl"
              >
                {Intl.NumberFormat("pt-BR").format(total)} {unit}
              </Text>
              <Text className="text-sm text-secondary-text-dark">
                Meta: {Intl.NumberFormat("pt-BR").format(goal)}
              </Text>
            </View>
          )
        }
      </AnimatedCircularProgress>
      
      <View className="mt-[-40]">
        <TouchableOpacity
          className="w-28 h-10 rounded-full bg-gray-700 items-center justify-center"
          onPress={handleAddConsumption}
          disabled={loading}
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
    </View>
  )
}
