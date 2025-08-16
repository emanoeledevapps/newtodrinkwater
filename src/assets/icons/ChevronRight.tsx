import {Svg, Path} from "react-native-svg";

interface Props{
    size?: number;
    color?: string;
}
export function ChevronRightIcon({size = 20, color = 'white'}: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M7.7459 19.759C7.44784 19.4668 7.42074 19.0095 7.66461 18.6873L7.7459 18.595L14.4734 12L7.7459 5.40507C7.44784 5.11287 7.42074 4.65562 7.66461 4.33342L7.7459 4.24111C8.04396 3.94891 8.51037 3.92234 8.83904 4.16141L8.93321 4.24111L16.2541 11.4181C16.5522 11.7103 16.5793 12.1675 16.3354 12.4897L16.2541 12.582L8.93321 19.759C8.60534 20.0804 8.07376 20.0804 7.7459 19.759Z" fill={color}/>
        </Svg>
    )
}