import { sendMessage } from "react-native-wear-connectivity";
import { MessageCheckConsumptionProps, MessageListDayProps, MessageOrigin } from "./types";
import { dbService } from "@db";
import { format } from "date-fns";
import { Platform } from "react-native";

async function sendCheckRegisterExists(message: MessageCheckConsumptionProps) {
  sendMessage(
    message,
    (reply) => { console.log(reply) },
    (error) => { console.log(error) }
  )
}

async function receiveCheckRegisterExists(message: MessageCheckConsumptionProps): Promise<void> {
  const messageExists = await dbService.checkConsumptionExists({ createdAt: message.createdAt })
  console.log(messageExists)

  await dbService.addConsumptionFromConnectivity({
    created_at: message.createdAt,
    formatted_date: message.createdAt,
    id: message.id,
    origin: message.origin,
    quantity: message.quantity,
    register_type: message.registerType,
  })

}

interface SendListDayProps {
  origin: MessageOrigin;
  date: Date;
}
async function sendListDay({ date, origin }: SendListDayProps) {
  if (Platform.OS === "ios") return;

  const list = await dbService.getConsumptionPerDay({ formattedDate: format(date, "dd/MM/yyyy") })
  const msg: MessageListDayProps = {
    list,
    messageOrigin: origin,
    type: "list-day"
  }

  sendMessage(
    msg,
    (reply) => { console.log(reply) },
    (error) => { console.log(error) }
  )

}

export const connectivityService = {
  sendCheckRegisterExists,
  receiveCheckRegisterExists,
  sendListDay
}