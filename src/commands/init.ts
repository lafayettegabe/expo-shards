import { createFolder, createShard } from "./commands.helpers";

export default async function init(dir: string) {
  await createFolder(`${dir}/shards`);
  await createShard(dir, "example");
  console.log("Initialization complete.");
}
