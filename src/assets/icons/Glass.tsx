import { Svg, Path } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
}
export function GlassIcon({ size = 20, color = 'white' }: Props) {
  return (
    <Svg fill="#000000" width={size} height={size} viewBox="0 0 24 24" id="glass-water-left-2" data-name="Flat Line">
			<Path id="secondary" d="M5.5,9.5,6.67,20.11a1,1,0,0,0,1,.89h8.44a1,1,0,0,0,1-.89L18.39,8.5C12.09,8.55,11.74,9.44,5.5,9.5Z" style="fill: rgb(44, 169, 188); stroke-width: 2;"/>
			<Path id="primary" d="M5.61,9.5c6.24-.06,6.59-.95,12.89-1" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
			<Path id="primary-2" data-name="primary" d="M18,3a1,1,0,0,1,1,1.11l-1.77,16a1,1,0,0,1-1,.89H7.78a1,1,0,0,1-1-.89L5,4.11A1,1,0,0,1,6,3Z" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
		</Svg>
  )
}
