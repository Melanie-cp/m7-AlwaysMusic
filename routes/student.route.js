import { Router } from "express";
import { studentController } from "../controllers/student.controller.js";

const router = Router()

// PATH: '/students'
router.get('/', studentController.allStudents)

export default router;