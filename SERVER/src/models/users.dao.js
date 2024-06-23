import db from '../database/db.js'

export const register = ({ email, password, rol, lenguage }) => db('INSERT INTO usuarios values(DEFAULT,$1, $2, $3, $4)', [email, password, rol, lenguage])

export const login = ({ email }) => db('SELECT email, password FROM usuarios WHERE email = $1;', [email])

export const findProfile = (email) => db('SELECT email, rol, lenguage FROM usuarios WHERE email = $1;', [email])
