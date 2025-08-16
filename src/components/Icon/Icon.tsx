import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "../../assets/icons/ChevronLeft";

export interface IconSvgProps {
  color?: string;
  size?: number;
}

interface Props {
  name: IconNames;
  size?: number;
  color?: string;
  onPress?: () => void;
}
export function Icon({ name, onPress, color = "white", size = 20}: Props) {
  const IconComponent = icons[name];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} >
        <IconComponent size={size} color={color} />
      </TouchableOpacity>
    )
  }

  return <IconComponent size={size} color={color} />
}

const icons = {
  chevronLeft: ChevronLeftIcon
}
export type IconNames = keyof typeof icons;