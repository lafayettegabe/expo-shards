import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  esbuildOptions: (options) => {
    options.banner = {
      js: "#!/usr/bin/env node",
    };
  },
});
