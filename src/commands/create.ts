import { createShard } from "./commands.helpers";

export default async function create(dir: string, name: string) {
  await createShard(dir, name);
  console.log("Shard created successfully");
}
