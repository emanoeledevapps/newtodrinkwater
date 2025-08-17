import { database, WaterConsumptionProps } from "@db";

interface AddConsumptionProps {
  quantity: number;
  formattedDate: string;
  registerType: "glass" | "bottle";
}
async function addConsumption({ formattedDate, quantity, registerType }: AddConsumptionProps) {
  await database.insertConsumption({ formattedDate, quantity, registerType })
}

interface GetConsumptionPerDayProps {
  formattedDate: string;
}
async function getConsumptionPerDay({ formattedDate }: GetConsumptionPerDayProps): Promise<WaterConsumptionProps[]> {
  const response = await database.getConsumptionPerDay({ formattedDate })
  return response
}

export const dbService = {
  addConsumption,
  getConsumptionPerDay
}