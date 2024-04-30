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

        if (!rut || !nombre || !curso || !nivel || !rut.trim() || !nombre.trim() || !curso.trim() || !nivel.toString().trim()) {
            return res.status(400).json({ ok: false, msg: "Todos los campos son requeridos" });
        }

        const existingStudent = await studentModel.findOneByRut(rut);
        if (existingStudent) {
            return res.status(400).json({ ok: false, msg: "El rut ya existe" });
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

const updateStudent = async (req, res) => {
    try {
        const { rut } = req.params;
        const { nombre, curso, nivel } = req.body;

        if (!nombre && !curso && !nivel) {
            return res.status(400).json({ ok: false, msg: "Se necesita al menos un campo para actualizar" });
        }

        const existingStudent = await studentModel.findOneByRut(rut);
        if (!existingStudent) {
            return res.status(404).json({ ok: false, msg: "No se encontró el estudiante" });
        }

        if (rut !== existingStudent.rut) {
            return res.status(400).json({ ok: false, msg: "No se puede modificar el rut" });
        }

        const updatedStudent = {
            rut: existingStudent.rut,
            nombre: nombre || existingStudent.nombre,
            curso: curso || existingStudent.curso,
            nivel: nivel || existingStudent.nivel
        };

        const updatedStudentDB = await studentModel.update(rut, updatedStudent);
        return res.json({ ok: true, updated: updatedStudentDB });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false });
    }
};

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
    updateStudent,
    removeStudent
}