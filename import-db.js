const fs = require("fs");
const mysql = require("mysql2/promise");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (q) => new Promise(resolve => rl.question(q, resolve));

(async () => {
  const host = await ask("DB Host: ");
  const user = await ask("DB User: ");
  const password = await ask("DB Password: ");
  const database = await ask("DB Name: ");

  rl.close();

  const connection = await mysql.createConnection({
    host,
    user,
    password,
    database,
    port: 3306,
    multipleStatements: true
  });

  const sql = fs.readFileSync("./projectdb.sql", "utf8");

  await connection.query(sql);

  console.log("✅ DATABASE IMPORT SUCCESSFUL");

  await connection.end();
})().catch(err => {
  console.error("❌ ERROR:", err.message);
});