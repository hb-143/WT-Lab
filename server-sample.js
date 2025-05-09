const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Student model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// POST route to register a new student
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    res.status(400).json({ error: 'Error saving student', details: error.message });
  }
});

// GET route to retrieve student by rollNumber
app.get('/api/students/:rollNumber', async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;
    const student = await Student.findOne({ rollNumber });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





npm init -y
npm install express mongoose
node server.js

sudo systemctl start mongod
sudo systemctl enable mongod


check
mongo
mongosh
