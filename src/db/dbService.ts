import { database, WaterConsumptionProps } from "@db";

interface AddConsumptionProps {
  quantity: number;
  formattedDate: string;
}
async function addConsumption({ formattedDate, quantity }: AddConsumptionProps) {
  await database.insertConsumption({ formattedDate, quantity })
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