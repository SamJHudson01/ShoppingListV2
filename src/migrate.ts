import { Client } from "pg";
import * as fs from "fs";
import * as path from "path";

const client = new Client({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "password",
  port: 5432,
});

async function migrate() {
  await client.connect();

  const migrationFiles = fs
    .readdirSync(path.join(__dirname, "migrations"))
    .sort();
  for (const file of migrationFiles) {
    if (file.endsWith(".ts")) {
      const migration = await import(path.join(__dirname, "migrations", file));
      await client.query(migration.up);
      console.log(`Migrated: ${file}`);
    }
  }

  await client.end();
}

migrate().catch(console.error);
