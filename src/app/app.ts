import express, { Request, Response } from 'express'
import cors from 'cors'
import router from './routes'
import globalMiddleware from './middlewares/globalMiddleware'
import notFound from './middlewares/notFound'

const app = express()



//^ middleware
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.json({
        ping: 'Ping Pong 😁',
        message: 'Server is running'
    })
})

app.use('/api', router)

app.use('*', notFound)

app.use(globalMiddleware)

export default app