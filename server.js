// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const { v4: uuidv4 } = require('uuid');
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBOM29zAELY4QOxY1Somw3gcGsrQ3vxR5Q",
  authDomain: "c11-note-taker.firebaseapp.com",
  projectId: "c11-note-taker",
  storageBucket: "c11-note-taker.appspot.com",
  messagingSenderId: "1031999476831",
  appId: "1:1031999476831:web:4542b4ba17e3479e4c37ea",
  measurementId: "G-BVPCCDW0F7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));

// app.get('/api/notes', (req, res) => {
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     res.json(JSON.parse(data));
//   });
// });

// app.post('/api/notes', (req, res) => {
//   const newNote = { ...req.body, id: uuidv4() };
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     const notes = JSON.parse(data);
//     notes.push(newNote);
//     fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
//       if (err) throw err;
//       res.json(newNote);
//     });
//   });
// });

// app.delete('/api/notes/:id', (req, res) => {
//   const noteId = req.params.id;
//   fs.readFile('./db/db.json', 'utf8', (err, data) => {
//     if (err) throw err;
//     let notes = JSON.parse(data);
//     notes = notes.filter(note => note.id !== noteId);
//     fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
//       if (err) throw err;
//       res.json({ message: 'Note deleted' });
//     });
//   });
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
