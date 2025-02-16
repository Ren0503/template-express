import {
	SwaggerInput,
	ISwaggerSchema,
	SwaggerType,
	swaggerType,
} from 'mapping/interfaces/swagger'

export function convertToSwagger(input: SwaggerInput): ISwaggerSchema {
	switch (input) {
		case SwaggerType.string:
			return swaggerType.string
		case SwaggerType.integer:
			return swaggerType.integer
		case SwaggerType.boolean:
			return swaggerType.boolean
		case SwaggerType.date:
			return {
				...swaggerType.string,
				example: new Date().toISOString(),
			}
		default:
			break
	}
	switch (typeof input) {
		case 'string':
			return {
				...swaggerType.string,
				example: input,
			}
		case 'number':
			return {
				...swaggerType.integer,
				example: input,
			}
		case 'boolean':
			return {
				...swaggerType.boolean,
				example: input,
			}
		default:
			break
	}
	if (Array.isArray(input)) {
		const data: ISwaggerSchema = {
			...swaggerType.array,
			items: convertToSwagger(input[0]),
			example: input,
		}
		return data
	} else {
		const data: ISwaggerSchema = {
			...swaggerType.object,
			properties: {},
		}
		Object.entries(input).forEach(([key, value]) => {
			data.properties[key] = convertToSwagger(value)
		})
		return data
	}
}
