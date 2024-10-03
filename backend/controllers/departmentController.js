import Department from "../models/Department.js";

export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        console.error("Get Departments Error:", error);
        return res.status(500).json({ success: false, error: "Failed to fetch departments" });
    }
};

export const addDepartment = async (req, res) => {
    try {
        const { course_name, description } = req.body;
        const newDepartment = new Department({ course_name, description });

        await newDepartment.save();
        return res.status(201).json({ success: true, department: newDepartment });
    } catch (error) {
        console.error("Add Department Error:", error);
        return res.status(500).json({ success: false, error: "Add department server error" });
    }
};
