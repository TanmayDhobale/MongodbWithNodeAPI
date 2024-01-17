const express = require('express');
const mongoose = require('mongoose');
const Student = require('./model/student'); // 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin');
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/students', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Update a student
app.put('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true });

        if (!student) {
            return res.status(404).json({ message: `Cannot find any student with ID ${id}` });
        }

        const updatedStudent = await Student.findById(id);
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({ message: `Cannot find any student with ID ${id}` });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://admin:iBbw0gb0doyoHFvw@cluster0.gokoimq.mongodb.net/data').then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log(`Node API app is running on port 3000`);
    });
}).catch((error) => {
    console.log(error);
});
