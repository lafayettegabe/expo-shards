export async function createData(db: any, tableName: string, data: any) {
  console.log("Inserting data into database:", data);
  const keys = Object.keys(data).join(", ");
  const values = Object.values(data);
  const placeholders = values.map(() => "?").join(", ");

  await db.runAsync(
    `INSERT INTO ${tableName} (${keys}) VALUES (${placeholders})`,
    ...values
  );
}

export async function readData(db: any, tableName: string) {
  console.log("Reading data from database");
  return await db.getAllAsync(`SELECT * FROM ${tableName}`);
}

export async function updateData(
  db: any,
  tableName: string,
  id: number,
  newData: any
) {
  console.log(
    `Updating data in table ${tableName} with id ${id} to: ${newData}`
  );
  const keys = Object.keys(newData)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = Object.values(newData);

  await db.runAsync(
    `UPDATE ${tableName} SET ${keys} WHERE id = ?`,
    ...values,
    id
  );
}

export async function deleteData(db: any, tableName: string, id: number) {
  console.log(`Deleting data from table ${tableName} with id ${id}`);
  await db.runAsync(`DELETE FROM ${tableName} WHERE id = ?`, id);
}
