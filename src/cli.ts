import { Command } from "commander";
import { Init, Create, Generate } from "./commands";

const dir = process.cwd();

const program = new Command();
program.name("shards").version("0.0.1").description("Shards CLI tool");

program
  .command("init")
  .description(
    `Initialize a new Shards project in the current directory.\nThis command will create a new directory called shards and a example schema file inside it.`
  )
  .action(async () => {
    await Init(dir);
  });

program
  .command("create <name>")
  .description(`Create a new shard with the given name.`)
  .action(async (name: string) => {
    await Create(dir, name);
  });

program
  .command("generate")
  .description(`Generate interfaces and databases from the schemas.`)
  .action(async () => {
    await Generate(dir);
  });

program.parse(process.argv);
