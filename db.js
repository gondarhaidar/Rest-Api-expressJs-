const mysql = require('mysql2');

// Membuat koneksi
const connection = mysql.createConnection({
  host: '127.0.0.1', // ganti dengan host database Anda
  user: 'root',      // ganti dengan user database Anda
  password: '',      // ganti dengan password database Anda
  database: 'Coba' // ganti dengan nama database Anda
});

// Menghubungkan ke database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
