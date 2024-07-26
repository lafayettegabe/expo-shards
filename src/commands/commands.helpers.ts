import { promises as fs } from "fs";
import { join } from "path";

export async function createShard(dir: string, name: string) {
  const schemaFile = join(dir, "shards", `${name}.shard`);
  const schemaContent = `# Define your schema here\n\ntable Example {\n  id        Int       @id  @default(autoincrement())\n  name      String\n  email     String    @unique\n  age       Int\n  created   DateTime  @default(now())\n  updated   DateTime  @updatedAt\n}`;

  try {
    await fs.access(schemaFile);
  } catch {
    await fs.writeFile(schemaFile, schemaContent);
  }
}

export async function createFolder(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}
