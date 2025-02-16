import { NextFunction, Request, Response, Router } from 'express'

// Define a type for async route handlers
type AsyncRouteHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>

// Wrapper to catch async errors
const asyncHandler = (handler: AsyncRouteHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(handler(req, res, next)).catch(next)
	}
}

// Function to create a wrapped router
export const PromiseRouter = (): Router => {
	const router = Router()

	return new Proxy(router, {
		get(target, prop) {
			const original = Reflect.get(target, prop)

			if (typeof original === 'function') {
				return (...args: unknown[]) => {
					if (
						['get', 'post', 'put', 'delete', 'patch'].includes(prop as string)
					) {
						args = args.map((arg) =>
							typeof arg === 'function'
								? asyncHandler(arg as AsyncRouteHandler)
								: arg,
						)
					}
					return original.apply(target, args)
				}
			}
			return original
		},
	})
}
