import { Origin, RegisterType, WaterConsumptionProps } from "@db";

export type MessageType = "check-consumption" | "change-goal" | "list-day"
export type MessageOrigin = "smartphone" | "watch"

export interface MessageCheckConsumptionProps {
  type: MessageType;
  id: string;
  quantity: number;
  formattedDate: string;
  createdAt: string;
  origin: Origin;
  registerType: RegisterType;
  messageOrigin: MessageOrigin
}

export interface MessageListDayProps {
  type: MessageType;
  messageOrigin: MessageOrigin
  list: WaterConsumptionProps[]
}
