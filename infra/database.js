import { Client } from "pg";

/* GET */
async function retrieveAll(tableName) {
  const queryObject = {
    text: `SELECT * FROM ${tableName}`,
  };
  return await query(queryObject);
}

async function retrieveByWhere(tableName, where) {
  const queryObject = {
    text: `SELECT * FROM ${tableName} WHERE ${where}`,
  };
  return await query(queryObject);
}

/* INSERT */
async function insert(tableName, values) {
  const queryObject = {
    text: `INSERT INTO ${tableName} VALUES (${values.join(", ")}) RETURNING *`,
  };
  return await query(queryObject);
}

/* UPDATE */
async function update(tableName, set, where) {
  const queryObject = {
    text: `UPDATE ${tableName} SET ${set} WHERE ${where} RETURNING *`,
  };
  return await query(queryObject);
}

/* DESTROY */
async function destroy(tableName, where) {
  const queryObject = {
    text: `DELETE FROM ${tableName} WHERE ${where} RETURNING *`,
  };
  return await query(queryObject);
}

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
  await client.connect();

  const result = await client.query(queryObject);
  await client.end();

  return result;
}

export default {
  query: query,
  retrieveAll: retrieveAll,
  retrieveByWhere: retrieveByWhere,
  insert: insert,
  update: update,
  destroy: destroy,
};
