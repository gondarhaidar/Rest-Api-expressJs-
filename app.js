const express = require('express');
const app = express();
const port = 3000;
const connection = require('./db');

app.use(express.json());

app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id; // Mengambil ID dari parameter URL

  // Query untuk mengambil data user berdasarkan ID
  connection.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
      return;
    }

    // Jika data user tidak ditemukan
    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    // Mengembalikan data user dalam bentuk JSON
    res.json(results[0]);
  });
});

app.post('/api/users', (req, res) => {
  const { nama, email, nomor } = req.body; // Mengambil data dari body permintaan

  // Query untuk menambahkan data user ke dalam tabel users
  connection.query('INSERT INTO users (nama, email, nomor) VALUES (?, ?, ?)', [nama, email, nomor], (err, results) => {
    if (err) {
      console.error('Error adding data:', err);
      res.status(500).send('gagal');
      return;
    }

    res.status(201).send('User added successfully');
  });
});

app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id; // Mengambil ID dari parameter URL
  const { nama, email, nomor } = req.body; // Mengambil data dari body permintaan

  // Query untuk mengedit data user dalam tabel users
  connection.query(
    'UPDATE users SET nama = ?, email = ?, nomor = ? WHERE id = ?',
    [nama, email, nomor, userId],
    (err, results) => {
      if (err) {
        console.error('Error updating data:', err);
        res.status(500).send('Failed to update user');
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).send('User not found');
        return;
      }

      res.send('User updated successfully');
    }
  );
});

// Rute untuk menghapus data user berdasarkan ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id; // Mengambil ID dari parameter URL

  // Query untuk menghapus data user dalam tabel users
  connection.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Failed to delete user');
      return;
    }

    // Jika tidak ada baris yang dihapus (user tidak ditemukan)
    if (results.affectedRows === 0) {
      res.status(404).send('User not found');
      return;
    }

    // Mengirim respon sukses jika user berhasil dihapus
    res.send('User deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server telah aktif pada port ${port}`);
});




