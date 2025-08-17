import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { WaterConsumptionProps } from './types';

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
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      formatted_date TEXT,
      register_type TEXT
    );
  `;
  await database.executeSql(query);
};

interface InsertConsumptionProps {
  quantity: number;
  formattedDate: string;
  registerType: "glass" | "bottle";
}
async function insertConsumption({ formattedDate, quantity, registerType }: InsertConsumptionProps) {
  const database = await openDB();
  const id = Math.random().toString(36).substring(2, 15 + 2);

  const query = `
    INSERT INTO WaterConsumption (id, quantity, formatted_date, register_type)
    VALUES (?, ?, ?, ?);
  `;
  await database.executeSql(query, [id, quantity, formattedDate, registerType]);
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

export const database = {
  openDB,
  createTable,
  getAllConsumptions,
  insertConsumption,
  getConsumptionPerDay
}