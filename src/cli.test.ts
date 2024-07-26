import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);

describe("CLI Tool", () => {
  it('should log "Initialization complete." when running "shards init"', async () => {
    const { stdout } = await execAsync("npx shards init");
    expect(stdout.trim()).toBe("Initialization complete.");
  });
});
