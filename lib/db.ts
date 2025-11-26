import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",       // server database kamu
  user: "root",            // username MySQL (ganti kalau beda)
  password: "",            // password MySQL (biasanya kosong di Laragon/XAMPP)
  database: "laravel",     // ini nama databasenya
  port: 3306,              // ganti jadi 3307 kalau kamu pakai Laragon
});
