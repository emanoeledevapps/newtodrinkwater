import { View } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Text } from "@components";
import { usePreferencesContext } from "@hooks";

interface Props {
  total: number;
}
export function Consumption({ total }: Props) {
  const { goal, unit, darkMode } = usePreferencesContext();
  const percentDay = (total / goal) * 100 

  return (
    <View className="items-center">
      <AnimatedCircularProgress
        size={250}
        width={15}
        fill={percentDay}
        tintColor={darkMode ? "#E0F2FE": "#1E3A8A"}
        backgroundColor="#aaa" 
        arcSweepAngle={180}
        rotation={270}
      >
        {
          () => (
            <View className="items-center mt-[-30]">
              <Text 
                className="font-bold text-primary-text-light dark:text-primary-text-dark text-3xl"
              >
                {Intl.NumberFormat("pt-BR").format(total)} {unit}
              </Text>
              <Text className="text-sm text-secondary-text-light dark:text-secondary-text-dark">
                Meta: {goal}
              </Text>
            </View>
          )
        }
      </AnimatedCircularProgress>
    </View>
  )
}
