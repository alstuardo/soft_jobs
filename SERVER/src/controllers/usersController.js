import * as sql from '../models/users.dao.js'
import { jwtSign } from '../utils/jwt.js'

export const register = (req, res) => sql.register(req.body)
  .then((result) => {
    if (result.code) {
      res.status(500).json({ status: false, code: 500, message: 'ha ocurrido un error, vuelve a intentar' })
      return
    }
    res.status(201).json({ status: true, code: 201, message: 'Usuario creado exitosamente' })
  })
  .catch((error) => res.status(500).json({ status: false, code: 404, message: error }))

export const login = (req, res) => {
  console.log('Request body:', req.body)
  sql.login(req.body)
    .then((result) => {
      console.log('SQL Result:', result)
      if (result.length === 0) {
        res.status(200).json({ status: true, code: 200, message: 'Usuario y/o contraseña incorrectas' })
        return
      }

      const token = jwtSign(result[0])
      console.log('Generated token:', token) // Verificar el token generado
      res.status(200).json({ status: true, code: 200, message: { token } })
    })
    .catch((error) => {
      res.status(500).json({ status: false, code: 500, message: error })
    })
}

export const findProfile = async (req, res) => {
  try {
    const { email } = req.user// Obtiene el email del usuario desde el token decodificado

    const userProfile = await sql.findProfile(email)
    console.log(userProfile)
    if (!userProfile) {
      return res.status(404).json({ status: false, code: 404, message: 'Perfil no encontrado' })
    }

    // Devuelve los datos del perfil en la respuesta
    res.status(200).json({
      status: true,
      code: 200,
      message: {
        email: userProfile.email,
        rol: userProfile.rol,
        lenguage: userProfile.lenguage
      }
    })
  } catch (error) {
    console.error('Error al buscar perfil:', error)
    res.status(500).json({ status: false, code: 500, message: 'Error al buscar perfil' })
  }
}

export const notFound = (_, res) => res.status(404).json({ status: false, code: 404, message: 'Page not found' })
