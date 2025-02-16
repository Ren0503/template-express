import { Schema } from 'express-validator'
import { Dto } from 'mapping/interfaces/dto'
import { ParameterObject } from 'mapping/interfaces/specBuilder'
import { ISwaggerSchema, SwaggerInput } from 'mapping/interfaces/swagger'
import { convertToSwagger } from 'mapping/utils/convertToSwagger'
import { omitTransform } from './omitTransform'
import { parseParam } from './parameters'
import { parseSwaggerSchema } from './swaggerSchema'
import { parseValidation } from './validation'

export function parseDto(dto?: Dto) {
	let validator: Schema = {}
	const parameters: ParameterObject[] = []
	const omitTransformField: string[] = []
	let schema: ISwaggerSchema | undefined = undefined

	if (!dto) return undefined

	let swaggerSchema: SwaggerInput = {}
	for (const [field, data] of Object.entries(dto)) {
		validator = {
			...validator,
			...parseValidation(field, data),
		}

		swaggerSchema = {
			...swaggerSchema,
			...parseSwaggerSchema(field, data),
		}

		const params = parseParam(field, data)
		if (params !== undefined) {
			parameters.push(params)
		}

		omitTransformField.push(...omitTransform(field, data))
	}

	if (Object.keys(swaggerSchema).length > 0) {
		schema = convertToSwagger(swaggerSchema)
	}

	return schema
}
