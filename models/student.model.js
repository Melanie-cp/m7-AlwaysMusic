import { pool } from '../database/connection.js'

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM STUDENTS LIMIT 10")
    return rows
}

export const studentModel = {
    findAll
}