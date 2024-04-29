import { studentModel } from "../models/student.model.js"

const allStudents = async (req, res) => {
    try {
        const students = await studentModel.findAll()
        return res.json(students)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const studentController = {
    allStudents
}