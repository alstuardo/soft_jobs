export const verifyCredential = (req, res, next) => {
  const { email, password, rol, lenguage } = req.body
  if (!email || !password || !rol || !lenguage) {
    return res.status(400).send('Credentials inválidas')
  }
  next()
}
