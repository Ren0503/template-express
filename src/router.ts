import { Request, Response } from 'express'
import { PromiseRouter } from './api/base/baseRouter'

const router = PromiseRouter()

router.get('', async function (req: Request, res: Response) {
	if (req.query.break) {
		throw new Error('error')
	}
	res.json({ data: 'ok' })
})

export default router
