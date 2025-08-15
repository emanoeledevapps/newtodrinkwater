/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { dbService, WaterConsumptionProps } from "@db";
import { format } from "date-fns";

interface Props {
  date: Date;
}
export function useGetConsumptionDay({ date }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<WaterConsumptionProps[]>([]);
  const [totalConsumption, setTotalConsumption] = useState<number>(0);

  useEffect(() => {
    getList();
  }, [date])

  async function getList() {
    setIsLoading(true);
    const formattedDate = format(date, "dd/MM/yyyy");
    const response = await dbService.getConsumptionPerDay({ formattedDate });
    setList(response);
    calcTotalConsumption(response);
    setIsLoading(false);
  }

  function calcTotalConsumption(dblist: WaterConsumptionProps[]) {
    let total = 0;
    for (var i = 0; i < dblist.length; i++) {
      total += dblist[i].quantity;
    }
    setTotalConsumption(total)
  }

  function refetch() {
    getList();
  }

  return {
    list,
    totalConsumption,
    isLoading,
    refetch
  }
}