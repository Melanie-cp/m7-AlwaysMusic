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

const uniqueStudent = async (req, res) => {
    try {
        const { rut } = req.params
        //validaciones

        const student = await studentModel.findOneByRut(rut)
        if (!student) return res.status(404).json({ ok: false, msg: "no se encontró el rut" })
        return res.json(student)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const createStudent = async (req, res) => {
    try {
        const { rut, nombre, curso, nivel } = req.body
        //validar rut, nombre, curso y nivel

        if (!rut || !rut.trim()) {
            return res.status(400).json({ ok: false, msg: "Se necesita el campo rut" })
        }

        const newStudent = { rut, nombre, curso, nivel }
        const studentDB = await studentModel.create(newStudent)
        return res.status(201).json(studentDB)

    } catch (error) {
        console.log(error)
        if (error.code === '23505') {
            return res.status(400).json({ ok: false, msg: "rut duplicado" })
        }
        return res.status(500).json({ ok: false })
    }
}

const removeStudent = async (req, res) => {
    try {
        const { rut } = req.params
        const student = await studentModel.remove(rut)
        return res.json({ ok: true, removed: student });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const studentController = {
    allStudents,
    uniqueStudent,
    createStudent,
    removeStudent
}