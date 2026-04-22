// Demo server launcher for SantoSync marketing / screenshot use.
//
// Unlike dev-local-sandbox.mjs (which creates a temp dir and wipes it on exit),
// this script uses a persistent .demo-data/ directory in the project root.
// Your demo data survives server restarts so you can refine it between sessions.
//
// Usage:
//   npm run demo            — start with existing demo data (or seed fresh if empty)
//   npm run demo -- --reset — wipe .demo-data/ and re-seed from scratch
//
// Login:  admin / Todos123  (admin access)
//         erjaquez / Britney10!  (owner access)

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import { DEMO_CLIENTS, DEMO_DOCUMENTS, DEMO_WORKSPACE } from "./demo-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const demoDir = path.join(projectRoot, ".demo-data");
const datasetsDir = path.join(demoDir, "datasets");
const port = process.env.PORT || "3000";
const shouldReset = process.argv.includes("--reset");

async function writeJson(filePath, value) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function seedDemoData() {
    const clientsPath = path.join(datasetsDir, "clients.json");
    const documentsPath = path.join(datasetsDir, "documents.json");
    const workspacePath = path.join(datasetsDir, "workspace.json");

    const clientsExist = await fileExists(clientsPath);
    const documentsExist = await fileExists(documentsPath);
    const workspaceExists = await fileExists(workspacePath);

    if (shouldReset || !clientsExist) {
        await writeJson(clientsPath, DEMO_CLIENTS);
        console.log(shouldReset ? "  ↺  clients.json reset with demo data." : "  ✓  clients.json seeded.");
    } else {
        console.log("  —  clients.json already exists (skipped). Use --reset to overwrite.");
    }

    if (shouldReset || !documentsExist) {
        await writeJson(documentsPath, DEMO_DOCUMENTS);
        console.log(shouldReset ? "  ↺  documents.json reset with demo data." : "  ✓  documents.json seeded.");
    } else {
        console.log("  —  documents.json already exists (skipped). Use --reset to overwrite.");
    }

    if (shouldReset || !workspaceExists) {
        await writeJson(workspacePath, DEMO_WORKSPACE);
        console.log(shouldReset ? "  ↺  workspace.json reset with demo data." : "  ✓  workspace.json seeded.");
    } else {
        console.log("  —  workspace.json already exists (skipped). Use --reset to overwrite.");
    }
}

console.log("─────────────────────────────────────────────────────");
console.log("  SantoSync Demo Environment");
console.log("─────────────────────────────────────────────────────");
console.log(`  Data directory : ${demoDir}`);
console.log(`  Mode           : ${shouldReset ? "RESET + seed" : "persistent (seed if empty)"}`);
console.log(`  URL            : http://127.0.0.1:${port}`);
console.log("─────────────────────────────────────────────────────");
console.log("Preparing demo data...");

await seedDemoData();

console.log("─────────────────────────────────────────────────────");
console.log("  Demo accounts:");
console.log("    admin     / Todos123      (admin)");
console.log("    erjaquez  / Britney10!    (owner)");
console.log("─────────────────────────────────────────────────────");
console.log("Starting server...\n");

const env = {
    ...process.env,
    DATA_STORAGE_MODE: "local-sandbox",
    LOCAL_DATA_DIR: demoDir,
    LOCAL_SEED_FROM_BLOB: "false",
    DEMO_MODE: "true"
};

const child = spawn("npx", ["vercel", "dev", "--listen", port], {
    stdio: "inherit",
    env
});

child.on("exit", code => {
    process.exit(code ?? 0);
});

process.on("SIGINT", () => {
    if (!child.killed) child.kill("SIGINT");
});

process.on("SIGTERM", () => {
    if (!child.killed) child.kill("SIGTERM");
});
