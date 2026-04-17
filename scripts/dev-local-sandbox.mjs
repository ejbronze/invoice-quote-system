import fs from "fs/promises";
import os from "os";
import path from "path";
import process from "process";
import { spawn } from "child_process";

const sandboxDir = await fs.mkdtemp(path.join(os.tmpdir(), "santosync-sandbox-"));
const port = process.env.PORT || "3000";
const env = {
    ...process.env,
    DATA_STORAGE_MODE: "local-sandbox",
    LOCAL_DATA_DIR: sandboxDir,
    LOCAL_SEED_FROM_BLOB: process.env.LOCAL_SEED_FROM_BLOB || "true"
};

let child;
let isCleaningUp = false;

async function cleanup(exitCode = 0) {
    if (isCleaningUp) {
        return;
    }

    isCleaningUp = true;

    if (child && !child.killed) {
        child.kill("SIGINT");
    }

    await fs.rm(sandboxDir, { recursive: true, force: true }).catch(() => {});
    process.exit(exitCode);
}

console.log(`Starting SantoSync local sandbox on http://127.0.0.1:${port}`);
console.log(`Local sandbox data directory: ${sandboxDir}`);
if (env.LOCAL_SEED_FROM_BLOB === "true") {
    console.log("Mode: live-read / local-write. The sandbox will seed from live Blob data once, then keep all edits local.");
} else {
    console.log("Mode: local sandbox only. No live data will be pulled in.");
}
console.log("Writes stay local to this temp folder and will be removed when the server stops.");

child = spawn("npx", ["vercel", "dev", "--listen", port], {
    stdio: "inherit",
    env
});

child.on("exit", async code => {
    await cleanup(code ?? 0);
});

process.on("SIGINT", async () => {
    await cleanup(0);
});

process.on("SIGTERM", async () => {
    await cleanup(0);
});
