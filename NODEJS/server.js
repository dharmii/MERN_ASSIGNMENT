const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csvParser = require('csv-parser');
const { Readable } = require('stream');

const app = express();
const port =7000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentResults', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the Student model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  mark1: Number,
  mark2: Number,
  mark3: Number,
});

const Student = mongoose.model('Student', studentSchema);

// Set up file upload using Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add an error handler for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // You can customize the error handling here, such as sending a response or taking other actions.
});

// Define API routes

// Upload CSV data and insert into students table
app.post('/upload', upload.single('csvFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'CSV file not provided' });
  }

  const students = [];
  const data = req.file.buffer.toString('utf8');

  const readableStream = Readable.from(data);

  const parser = csvParser({ headers: true });

  parser.on('data', (row) => {
    students.push(row);
  });

  parser.on('end', async () => {
    try {
      await Student.insertMany(students);
      res.status(201).json({ message: 'CSV data inserted successfully' });
    } catch (err) {
      console.error('Error during CSV data insertion:', err);
      res.status(500).json({ error: 'Error during CSV data insertion' });
    }
  });

  // Add an error handler for the csv-parser library
  parser.on('error', (err) => {
    console.error('CSV Parser Error:', err.message);
    res.status(500).json({ error: 'Error parsing CSV file' });
  });

  // Pipe the readable stream through the parser
  readableStream.pipe(parser);
});

// Retrieve student details by ID
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Received ID:', id); // Add this line for debugging

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Retrieve student result by ID
app.get('/students/:id/result', async (req, res) => {
  const id = req.params.id;
  console.log('Received ID:', id);

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const totalMarks = student.mark1 + student.mark2 + student.mark3;
    const resultStatus = totalMarks >= 150 ? 'passed' : 'failed';

    res.json({ result: resultStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
