import { Platform } from "react-native";
import { sendMessage } from "react-native-wear-connectivity";
import { format } from "date-fns";

import { dbService } from "@db";

import { MessageGetListDay, MessageListDayProps, MessageOrigin } from "./types";

interface SendListDayProps {
  origin: MessageOrigin;
  date: Date;
}
async function sendListDay({ date, origin }: SendListDayProps): Promise<void> {
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

interface GetListDayProps {
  origin: MessageOrigin;
}
function getListDay({ origin }: GetListDayProps): void {
  if (Platform.OS === "ios") return;

  const msg: MessageGetListDay = {
    messageOrigin: origin,
    type: "get-list-day"
  }

  sendMessage(
    msg,
    (reply) => { console.log(reply) },
    (error) => { console.log(error) }
  )
}

export const connectivityService = {
  sendListDay,
  getListDay
}