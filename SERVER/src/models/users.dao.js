import db from '../database/db.js'

export const register = ({ email, password, rol, lenguage }) => db('INSERT INTO usuarios values(DEFAULT,$1, $2, $3, $4)', [email, password, rol, lenguage])

export const login = ({ email, password }) => db('SELECT email FROM usuarios WHERE email = $1 AND password =$2;', [email, password])

export const findProfile = (email) => db('SELECT email, rol, lenguage FROM usuarios WHERE email = $1;', [email])
