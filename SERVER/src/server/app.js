import express, { json } from 'express'
import cors from 'cors'
import { serverLog } from '../middlewares/index.middlewares.js'
import { usersRouter } from '../routes/index.routes.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(json())

app.use(serverLog)

app.use(usersRouter)

app.listen(PORT, () => console.log(`Server running 👾 in http://localhost:${PORT}`))

export default app
