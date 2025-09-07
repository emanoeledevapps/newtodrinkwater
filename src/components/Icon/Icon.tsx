import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "../../assets/icons/ChevronLeft";
import { ChevronRightIcon } from "../../assets/icons/ChevronRight";
import { CalendarIcon } from "../../assets/icons/Calendar";
import { GlassIcon } from "../../assets/icons/Glass";
import { BottleIcon } from "../../assets/icons/Bottle";
import { SettingsIcon } from "../../assets/icons/Settings";
import { PlusIcon } from "../../assets/icons/Plus";
import { MinusIcon } from "../../assets/icons/Minus";

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
  bottle: BottleIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  calendar: CalendarIcon,
  glass: GlassIcon,
  settings: SettingsIcon,
  plus: PlusIcon,
  minus: MinusIcon
}
export type IconNames = keyof typeof icons;