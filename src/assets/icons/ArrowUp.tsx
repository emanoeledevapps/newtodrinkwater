import { Svg, Path } from "react-native-svg";

interface Props {
    size?: number;
    color?: string;
}
export function ChevronLeft({ size = 20, color = 'white' }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path id="Vector" d="M5 16L12 9L19 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}