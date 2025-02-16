import { DtoPrimitiveProperties } from 'mapping/interfaces/dto'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPrimitive(obj: any): obj is DtoPrimitiveProperties {
	return (
		obj !== null && typeof obj === 'object' && (obj.validation || obj.example)
	)
}
