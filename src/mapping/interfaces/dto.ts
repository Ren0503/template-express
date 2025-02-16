import { ParamSchema } from 'express-validator'
import { SwaggerInput } from './swagger'

export type DtoPrimitiveProperties = {
	validation?: ParamSchema
	example?: SwaggerInput
	enums?: string[]
	optional?: true
	transform?: boolean
}

export type DtoDefinition<T = undefined> = T extends undefined
	? { [path: string]: DtoPrimitiveProperties }
	: { [path in keyof T]?: DtoProperties<T[path]> }

export type DtoProperties<T> = T extends number
	? DtoPrimitiveProperties
	: T extends string
		? DtoPrimitiveProperties
		: T extends boolean
			? DtoPrimitiveProperties
			: T extends Date
				? DtoPrimitiveProperties
				: T extends Array<string | number | boolean | Date>
					? DtoPrimitiveProperties
					: {
							[path in keyof T]?:
								| DtoProperties<T[path]>
								| DtoProperties<T[path]>[]
						}

export class Dto<I = undefined> {
	constructor(definition?: DtoDefinition<I>) {
		if (definition) {
			Object.assign(this, definition)
		}
	}
}
