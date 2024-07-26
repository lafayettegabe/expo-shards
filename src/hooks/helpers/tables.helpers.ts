import * as SQLite from "expo-sqlite";

interface TableDefinition {
  name: string;
  columns: { name: string; type: string }[];
}

export async function openDatabase(db_name: string, tables: TableDefinition[]) {
  console.log("Opening database");
  const db = await SQLite.openDatabaseAsync(`${db_name}.db`);
  await initDataTable(db, tables);
  return db;
}

async function initDataTable(db: any, tables: TableDefinition[]) {
  console.log("Initializing database table");
  const existingTables = await getExistingTables(db);

  // Delete tables that are not in the provided tables array
  for (const existingTable of existingTables) {
    const found = tables.find((table) => table.name === existingTable);
    if (!found) {
      await db.execAsync(`DROP TABLE IF EXISTS ${existingTable}`);
      console.log(`Table '${existingTable}' deleted.`);
    }
  }

  // Create or update tables based on the provided table definitions
  for (const table of tables) {
    const tableExists = existingTables.includes(table.name);
    if (!tableExists) {
      const columns = table.columns
        .map((column) => `${column.name} ${column.type}`)
        .join(", ");
      await db.execAsync(`
                CREATE TABLE IF NOT EXISTS ${table.name} (
                    ${columns}
                );
            `);
      console.log(`Table '${table.name}' created.`);
    }
  }
}

async function getExistingTables(db: any): Promise<string[]> {
  const result = await db.getAllAsync(`
        SELECT name FROM sqlite_master WHERE type='table'
    `);
  return result.map((row: { name: string }) => row.name);
}
