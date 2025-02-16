import * as express from 'express'
import router from './router'

const app: express.Application = express()
app.use(express.json())

app.use('/api', router)

// // Global error handler
export function errorHandler(
	error: Error,
	req: express.Request,
	res: express.Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_: express.NextFunction,
) {
	res.status(200).json({ error: error.name })
}

app.use(errorHandler)

app.get('/', function (_, res) {
	res.send('Hello world')
})

app.listen(3000, () => {
	console.log(`Listen on: http://localhost:3000`)
})
