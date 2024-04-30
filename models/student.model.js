import { pool } from '../database/connection.js'

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM STUDENTS LIMIT 10")
    return rows
}

const findOneByRut = async (rut) => {
    const query = {
        text: 'SELECT * FROM STUDENTS WHERE RUT = $1',
        values: [rut]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const create = async ({ rut, nombre, curso, nivel }) => {
    const query = {
        text: 'INSERT INTO STUDENTS VALUES($1, $2, $3, $4) RETURNING *',
        values: [rut, nombre, curso, nivel]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const update = async (rut, updatedStudent) => {
    const query = {
        text: 'UPDATE STUDENTS SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1 RETURNING *',
        values: [rut, updatedStudent.nombre, updatedStudent.curso, updatedStudent.nivel]
    };
    const { rows } = await pool.query(query);
    return rows[0];
};


const remove = async (rut) => {
    const querySQL = 'DELETE FROM STUDENTS WHERE rut = $1 RETURNING *;'
    const { rows } = await pool.query(querySQL, [rut])
    return rows
}

export const studentModel = {
    findAll,
    findOneByRut,
    create,
    update,
    remove
}