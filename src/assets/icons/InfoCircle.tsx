import { Svg, Path, Rect, Circle } from "react-native-svg";

interface Props {
    size?: number;
    color?: string;
}
export function InfoCircleIcon({ size = 20, color = 'white' }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect width={size} height={size} fill="none" />
            <Circle cx="12" cy="12" r="9" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M12 11V17" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M11.75 8V7H12.25V8H11.75Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}