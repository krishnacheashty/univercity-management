import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandeler from './App/middleWare/globalErrorHandeler'
import { UserRouters } from './App/modules/users/user.route'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', UserRouters)
//testing error
// app.get('/', async (req: Request, res: Response) => {
//   throw new Error('tasting error handeling')
// })

app.use(globalErrorHandeler)

export default app
