export interface WaterConsumptionProps {
  id: number;
  quantity: number;
  created_at: string;
  formatted_date: string;
  register_type: "glass" | "bottle"
  origin: "smartphone" | "watch"
}