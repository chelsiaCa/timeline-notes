import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/notes').then(response => setNotes(response.data));
  }, []);

  return (
    <div>
      <h1>Timeline Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.date}</strong>: {note.title}
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
axios.get('https://your-app.onrender.com/notes').then(response => {
    setNotes(response.data);
  });
export default App;
