import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    description: { type: String }
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
