import { isPrimitive } from 'mapping/utils/isPrimitive'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omitTransform(field: string, input: any): string[] {
	const omitTrans: string[] = []
	if (isPrimitive(input)) {
		const { transform = true } = input
		if (!transform) {
			omitTrans.push(field)
		}
	} else if (Array.isArray(input)) {
		for (const element of input) {
			for (const [key, value] of Object.entries(element)) {
				omitTrans.push(...omitTransform(`${field}.*.${key}`, value))
			}
		}
	} else {
		for (const [key, value] of Object.entries(input)) {
			omitTrans.push(...omitTransform(`${field}.${key}`, value))
		}
	}

	return omitTrans
}
