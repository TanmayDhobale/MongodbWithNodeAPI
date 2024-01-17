
const mongoose = require('mongoose')


const studentSchema = mongoose.Schema({
    name: String,
    class: Number,
    require: Boolean,
}, {
    timestamps: true,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;