export function removeComments(content: string) {
  return content
    .split("\n")
    .filter((line: string) => !line.trim().startsWith("#"))
    .join("\n");
}

export function getTypeScriptType(type: string): string {
  switch (type) {
    case "Int":
      return "number";
    case "String":
      return "string";
    case "DateTime":
      return "Date";
    default:
      return "any";
  }
}

export function parseShard(schema: string, dbName: string): TableSchema {
  const lines = schema
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const tableSchema: TableSchema = {};
  let currentTable: string | null = null;

  for (const line of lines) {
    if (line.startsWith("table")) {
      const tableName = line.split(" ")[1] ?? null;
      currentTable = tableName;
      if (currentTable) {
        tableSchema[currentTable] = {};
      }
    } else if (currentTable && line) {
      if (line === "}") {
        currentTable = null;
        continue;
      }

      const [columnName, columnType, ...attributes] = line.split(/\s+/);
      if (columnName) {
        if (columnName && columnType) {
          const columnAttributes: ColumnDefinition = { type: columnType };

          attributes.forEach((attr) => {
            if (attr === "@id") {
              columnAttributes.primary = true;
            } else if (attr.includes("@default")) {
              columnAttributes.default =
                attr.split("(")[1]?.split(")")[0] ?? "";
            } else if (attr === "@autoincrement()") {
              columnAttributes.autoincrement = true;
            } else if (attr === "@unique") {
              columnAttributes.unique = true;
            } else if (attr === "@updatedAt") {
              columnAttributes.onUpdate = true;
            }
          });

          tableSchema[currentTable]![columnName] = columnAttributes;
        }
      }
    }
  }

  return tableSchema;
}
