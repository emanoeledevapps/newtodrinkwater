import { Svg, Path } from "react-native-svg";

interface Props {
    size?: number;
    color?: string;
}
export function MinusIcon({ size = 20, color = 'white' }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M6 12L18 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )
}