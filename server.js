const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const helmet = require('helmet');

const db = new sqlite3.Database(':memory:');

app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(bodyParser.json());

// Initialize Database
db.serialize(() => {
  db.run("CREATE TABLE notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT, date TEXT)");
});

// Add a Note
app.post('/notes', (req, res) => {
  const { title, content, date } = req.body;
  db.run("INSERT INTO notes (title, content, date) VALUES (?, ?, ?)", [title, content, date], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).json({ id: this.lastID });
  });
});

// Get Notes
app.get('/notes', (req, res) => {
  db.all("SELECT * FROM notes ORDER BY date", (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// Edit Note
app.put('/notes/:id', (req, res) => {
  const { title, content, date } = req.body;
  db.run("UPDATE notes SET title = ?, content = ?, date = ? WHERE id = ?", [title, content, date, req.params.id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ updated: this.changes });
  });
});

// Delete Note
app.delete('/notes/:id', (req, res) => {
  db.run("DELETE FROM notes WHERE id = ?", req.params.id, function(err) {
    if (err) return res.status(500).send(err.message);
    res.json({ deleted: this.changes });
  });
});



app.listen(3000, () => console.log("Server running on http://localhost:3000"));
