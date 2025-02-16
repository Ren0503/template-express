export function isPromise<T = unknown>(obj: unknown): obj is Promise<T> {
	return (
		obj !== null &&
		(typeof obj === 'object' || typeof obj === 'function') &&
		'then' in obj &&
		typeof (obj as Promise<T>).then === 'function'
	)
}
