import { Location } from 'express-validator'
import { Dto } from 'mapping/interfaces/dto'
import { ParameterObject } from 'mapping/interfaces/specBuilder'
import { isPrimitive } from 'mapping/utils/isPrimitive'

export type InLocation = Exclude<Location, 'params'> | 'path' | Location[]
export function parseParam(
	field: string,
	input: Dto,
): ParameterObject | undefined {
	if (isPrimitive(input)) {
		const { example = '', validation, enums, optional = false } = input || {}

		let inLocation: InLocation | undefined = validation?.in
			? validation.in === 'params'
				? 'path'
				: validation.in
			: undefined

		if (!inLocation || inLocation === 'body') return undefined
		if (Array.isArray(inLocation))
			inLocation = inLocation[0] === 'params' ? 'path' : inLocation[0]

		if (Array.isArray(example) && example.length > 0) {
			const type = typeof example[0]

			return {
				name: `${field}[]`,
				in: inLocation,
				schema: {
					type: 'array',
					items: {
						type,
						enum: enums,
					},
					example,
					required: !optional,
				},
			}
		}

		return {
			name: field,
			in: inLocation,
			schema: {
				type: typeof example,
				enum: enums,
			},
			example,
			required: !optional,
		}
	}
}
