export const swaggerType = {
	string: { type: 'string', example: 'This is string example' },
	integer: { type: 'integer', example: 60 },
	object: { type: 'object' },
	array: { type: 'array' },
	boolean: { type: 'boolean', example: true },
	date: {
		type: 'string',
		format: 'date-time',
		example: new Date().toISOString(),
	},
} as const

export enum SwaggerType {
	string = 'string',
	integer = 'integer',
	boolean = 'boolean',
	date = 'date',
}

type Value =
	| string
	| number
	| boolean
	| object
	| string[]
	| number[]
	| boolean[]
	| object[]

export interface ITypeArray {
	type: 'array'
	items: ISwaggerSchema
	example?: Value
}

export interface ITypeObject {
	type: 'object'
	properties: {
		[k: string]: ISwaggerSchema
	}
	example?: Value
}

export interface ITypeNormal {
	type: 'string' | 'integer' | 'boolean'
	example?: Value
}

export type ISwaggerSchema = ITypeArray | ITypeObject | ITypeNormal

export interface InputObject {
	[key: string]: SwaggerInput
}

export type SwaggerInput =
	| InputObject
	| InputObject[]
	| SwaggerType
	| [SwaggerType]
	| string
	| number
	| boolean
	| string[]
	| number[]
	| boolean[]
