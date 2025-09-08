import { View } from "react-native";
import { Screen, Text } from "@components";

export function IdealGoalScreen() {
  return (
    <Screen title="Meta ideal" showBackButton scrollable>
      <View className="px-5">
        <Text
          className="text-text-black dark:text-primary-text-dark mt-10 text-justify"
        >
          Manter-se hidratado é fundamental para a saúde e o bom funcionamento do corpo. A quantidade ideal de água que cada pessoa deve beber por dia varia conforme o peso, o nível de atividade física e as condições do ambiente, como o clima.
        </Text>

        <Text
          className="text-text-black dark:text-primary-text-dark mt-2 text-justify"
        >
          Utilize esta calculadora para descobrir de forma prática e personalizada a quantidade recomendada de água para você consumir diariamente. Informe seu peso, tempo de exercícios e se está em um ambiente quente para obter uma indicação precisa. Assim, fica mais fácil planejar sua hidratação e cuidar do seu bem-estar todos os dias.
        </Text>
      </View>
    </Screen>
  )
}