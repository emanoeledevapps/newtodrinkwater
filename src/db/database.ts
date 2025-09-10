import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Origin, RegisterType, WaterConsumptionProps } from './types';
import { format } from 'date-fns';

SQLite.enablePromise(true);

let db: SQLiteDatabase;

async function openDB() {
  if (db) return db; // reutiliza conexão se já estiver aberta
  db = await SQLite.openDatabase({
    name: 'todrinkwater.db',
    location: "default",
  });
  return db;
};

async function createTable() {
  const database = await openDB();
  const query = `
    CREATE TABLE IF NOT EXISTS WaterConsumption (
      id TEXT PRIMARY KEY,
      quantity INTEGER NOT NULL,
      created_at DATETIME,
      formatted_date TEXT,
      register_type TEXT,
      origin TEXT
    );
  `;
  await database.executeSql(query);
};

interface InsertConsumptionProps {
  quantity: number;
  formattedDate: string;
  registerType: RegisterType;
  origin: Origin;
}
async function insertConsumption({ formattedDate, quantity, registerType, origin }: InsertConsumptionProps) {
  const database = await openDB();
  const id = Math.random().toString(36).substring(2, 15 + 2);
  const atualDate = format(new Date(), "yyyy-MM-dd kk:mm:ss")

  const query = `
    INSERT INTO WaterConsumption (id, quantity, created_at, formatted_date, register_type, origin)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  try {
    await database.executeSql(query, [id, quantity, atualDate, formattedDate, registerType, origin]);
  } catch (e) {
    console.log(e)
  }
};

async function insertConsumptionFromConnectivity(props: WaterConsumptionProps): Promise<void> {
  const { formatted_date, quantity, register_type, origin, id, created_at } = props;
  const database = await openDB();
  //const atualDate = format(new Date(), "yyyy-MM-dd kk:mm:ss")


  const query = `
    INSERT INTO WaterConsumption (id, quantity, created_at, formatted_date, register_type, origin)
    VALUES (?, ?, ?, ?, ?, ?);
  `;
  try {
    await database.executeSql(query, [id, quantity, created_at, formatted_date, register_type, origin]);
  } catch (e) {
    console.log(e)
  }
};

async function getAllConsumptions(): Promise<WaterConsumptionProps[]> {
  const database = await openDB();
  const query = `
    SELECT * FROM WaterConsumption ORDER BY created_at DESC;
  `;
  const [results] = await database.executeSql(query);
  const consumptions = [];
  for (let i = 0; i < results.rows.length; i++) {
    consumptions.push(results.rows.item(i));
  }
  return consumptions;
};

interface GetConsumptionPerDayProps {
  formattedDate: string;
}
async function getConsumptionPerDay({ formattedDate }: GetConsumptionPerDayProps): Promise<WaterConsumptionProps[]> {
  const database = await openDB();
  const query = `
    SELECT * FROM WaterConsumption 
    WHERE formatted_date = ?
    ORDER BY created_at DESC;
  `;
  const [results] = await database.executeSql(query, [formattedDate]);
  const consumptions = [];
  for (let i = 0; i < results.rows.length; i++) {
    consumptions.push(results.rows.item(i));
  }
  return consumptions;
};

interface ConsumptionExistsProps {
  createdAt: string;
}
async function consumptionExists({ createdAt }: ConsumptionExistsProps): Promise<boolean> {
  const database = await openDB();
  const query = `
    SELECT 1 FROM WaterConsumption
    WHERE created_at = ? LIMIT 1
  `;
  const [results] = await database.executeSql(query, [createdAt]);
  return results.rows.length > 0
}

export const database = {
  openDB,
  createTable,
  getAllConsumptions,
  insertConsumption,
  getConsumptionPerDay,
  consumptionExists,
  insertConsumptionFromConnectivity
}