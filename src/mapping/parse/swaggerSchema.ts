import { Dto } from 'mapping/interfaces/dto'
import { InputObject } from 'mapping/interfaces/swagger'
import { isPrimitive } from 'mapping/utils/isPrimitive'

export function parseSwaggerSchema(field: string, input: Dto) {
	const swaggerSchema: InputObject = {}
	if (isPrimitive(input)) {
		const { example, validation } = input
		const inLocation = validation?.in ?? 'body'
		if (inLocation !== 'body') return swaggerSchema
		if (example !== undefined) {
			swaggerSchema[field] = example
		}
	} else if (Array.isArray(input)) {
		const tempArr = []
		for (const ele of input) {
			let temp = {}
			if (ele instanceof Dto) {
				for (const [key, value] of Object.entries(ele)) {
					temp = {
						...temp,
						...parseSwaggerSchema(key, value),
					}
				}
				tempArr.push(temp)
			}
		}
		swaggerSchema[field] = tempArr
	} else {
		let temp = {}
		for (const [key, value] of Object.entries(input)) {
			temp = {
				...temp,
				...parseSwaggerSchema(key, value),
			}
		}
		swaggerSchema[field] = temp
	}

	return swaggerSchema
}
