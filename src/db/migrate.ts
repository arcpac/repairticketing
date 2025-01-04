// src/migrate.ts
import { db } from "./index";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { config } from "dotenv";
config({ path: ".env" });
const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "src/db/migrations" });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};
main();