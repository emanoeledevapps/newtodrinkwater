import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { format } from "date-fns";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Icon, Text } from "@components";
import { dbService } from "@db";
import { usePreferencesContext } from "@hooks";

interface Props {
  total: number;
  consumptionAdded: () => void;
}
export function Consumption({ total, consumptionAdded }: Props) {
  const { width, height } = useWindowDimensions();
  const { goal, unit, glassSize, bottleSize } = usePreferencesContext();
  const percentDay = (total / goal) * 100 ;

  const [loadingGlass, setLoadingGlass] = useState(false);
  const [loadingBottle, setLoadingBottle] = useState(false);

  async function handleAddGlassConsumption() {
    setLoadingGlass(true);
    await dbService.addConsumption({
      formattedDate: format(new Date(), "dd/MM/yyyy"),
      quantity: glassSize,
      registerType: "glass",
      origin: "watch"
    });
    consumptionAdded();
    setLoadingGlass(false);
  }

  async function handleAddBottleConsumption() {
    setLoadingBottle(true);
    await dbService.addConsumption({
      formattedDate: format(new Date(), "dd/MM/yyyy"),
      quantity: bottleSize,
      registerType: "bottle",
      origin: "watch"
    });
    consumptionAdded();
    setLoadingBottle(false);
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
      
      <View className="mt-[-60] flex-row gap-5 justify-center">
        <TouchableOpacity
          className="w-16 h-16 rounded-full bg-gray-700 items-center justify-center"
          onPress={handleAddGlassConsumption}
          disabled={loadingGlass}
        >
          {loadingGlass ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <View className="items-center">
              <Icon name="glass" color="white"/>
              <Text className="font-bold text-white">
                +{glassSize}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="w-16 h-16 rounded-full bg-gray-700 items-center justify-center"
          onPress={handleAddBottleConsumption}
          disabled={loadingBottle}
        >
          {loadingBottle ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <View className="items-center">
              <Icon name="bottle" color="white" size={25} />
              <Text className="font-bold text-white">
                +{bottleSize}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}
