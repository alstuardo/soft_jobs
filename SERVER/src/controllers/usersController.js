import * as sql from '../models/users.dao.js'
import { jwtSign } from '../utils/jwt.js'
import { hashPassword, comparePassword } from '../utils/bcrypt.js'

export const register = (req, res) => {
  const { email, password, rol, lenguage } = req.body

  hashPassword(password)
    .then(hashedPassword => {
      return sql.register({ email, password: hashedPassword, rol, lenguage })
    })
    .then(result => {
      if (result.code) {
        res.status(500).json({ status: false, code: 500, message: 'Ha ocurrido un error, vuelve a intentar' })
        return
      }
      res.status(201).json({ status: true, code: 201, message: 'Usuario creado exitosamente' })
    })
    .catch(error => res.status(500).json({ status: false, code: 500, message: error.message }))
}

export const login = (req, res) => {
  const { email, password } = req.body

  sql.login({ email })
    .then(users => {
      if (users.length === 0) {
        res.status(401).json({ status: false, code: 401, message: 'Usuario y/o contraseña incorrectas' })
        return
      }

      const user = users[0]
      return comparePassword(password, user.password)
        .then(passwordMatch => {
          if (!passwordMatch) {
            res.status(401).json({ status: false, code: 401, message: 'Usuario y/o contraseña incorrectas' })
            return
          }

          const token = jwtSign(user)
          res.status(200).json({ status: true, code: 200, message: { token } })
        })
    })
    .catch(error => {
      res.status(500).json({ status: false, code: 500, message: error.message })
    })
}

export const findProfile = (req, res) => {
  const { email } = req.user

  sql.findProfile(email)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ status: false, code: 404, message: 'Perfil de usuario no encontrado' })
      }
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json({ status: false, code: 500, message: error.message })
    })
}

export const notFound = (_, res) => res.status(404).json({ status: false, code: 404, message: 'Page not found' })
