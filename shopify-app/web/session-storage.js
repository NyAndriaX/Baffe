import sqlite3 from 'sqlite3';

const DB_PATH = `${process.cwd()}/database.sqlite`;

const db = new sqlite3.Database(DB_PATH);

export function getAllSession() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM shopify_sessions', [], (err, rows) => {
      if (err) {
        reject({ error: err.message });
      }
      console.log({ rows });
      resolve(rows && rows.length > 0 ? rows : []);
    });
  });
}

export default { getAllSession };
