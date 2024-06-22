import { jwtVerify } from '../utils/jwt.js'

export const authToken = (req, res, next) => {
  const authorization = req.header('Authorization')

  if (authorization === undefined) {
    return res.status(401).json({ status: false, code: 401, message: 'El Token no ha sido proporcionado' })
  }

  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    return res.status(401).json({ status: false, code: 401, message: 'El formato del token es inválido' })
  }

  try {
    const decoded = jwtVerify(token)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ status: false, code: 401, message: 'El token es inválido' })
  }
}
