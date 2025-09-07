import { Svg, Path } from "react-native-svg";

interface Props {
    size?: number;
    color?: string;
}
export function PlusIcon({ size = 20, color = 'white' }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path fill={color} fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
        </Svg>
    )
}