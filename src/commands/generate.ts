import fs from "fs";
import { createFolder } from "./commands.helpers";
import {
  getTypeScriptType,
  parseShard,
  removeComments,
} from "./generate.helpers";

export default async function generate(dir: string): Promise<void> {
  const shards = fs
    .readdirSync(`${dir}/shards`)
    .filter((file) => file.endsWith(".shard"));

  await createFolder(`${dir}/shards/types`);
  await createFolder(`${dir}/shards/schemas`);

  for (const shard of shards) {
    try {
      const shardName = shard.replace(".shard", "");
      const shardContent = removeComments(
        fs.readFileSync(`${dir}/shards/${shard}`, "utf-8")
      );

      const definition: TableSchema = parseShard(shardContent, shardName);

      const shardInterface: string = await generateInterface(dir, definition);
      const shardSchema: string = await generateSchema(dir, definition);

      fs.writeFileSync(`${dir}/shards/types/${shardName}.ts`, shardInterface);
      fs.writeFileSync(`${dir}/shards/schemas/${shardName}.ts`, shardSchema);
    } catch (error) {
      console.error(`Error while generating ${shard}: ${error}`);
    }
  }

  console.log("Database generated successfully!");
}

async function generateInterface(
  dir: string,
  definition: TableSchema
): Promise<string> {
  console.log("Generating interfaces...");

  let interfaces = "";
  for (const tableName in definition) {
    interfaces += `export interface ${tableName} {\n`;
    for (const columnName in definition[tableName]) {
      const column = definition[tableName][columnName];
      if (column) {
        const columnType = getTypeScriptType(column.type);
        interfaces += `  ${columnName}: ${columnType};\n`;
      }
    }
    interfaces += "}\n";
  }
  return interfaces;
}

async function generateSchema(
  dir: string,
  definition: TableSchema
): Promise<string> {
  console.log("Generating schemas...");
  return JSON.stringify(definition, null, 2);
}
