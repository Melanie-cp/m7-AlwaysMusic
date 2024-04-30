import { Router } from "express";
import { studentController } from "../controllers/student.controller.js";

const router = Router()

// PATH: '/students'
router.get('/', studentController.allStudents)
router.get('/:rut', studentController.uniqueStudent)
router.post('/', studentController.createStudent)
router.delete('/:rut', studentController.removeStudent)


export default router;