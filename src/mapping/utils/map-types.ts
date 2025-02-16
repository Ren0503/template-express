import { Dto, DtoPrimitiveProperties } from 'mapping/interfaces/dto'
import { isPrimitive } from './isPrimitive'

export interface IDto {
	[k: string]: DtoPrimitiveProperties
}

export function partialDto<K>(input: Dto<K>) {
	const dto: {
		[path in keyof K]?: DtoPrimitiveProperties
	} = {}
	for (const [key, value] of Object.entries(input)) {
		if (isPrimitive(value)) {
			dto[key as keyof K] = {
				...value,
				optional: true,
			}
		} else {
			dto[key as keyof K] = value
		}
	}

	return dto
}

export function omitDto<K>(input: Dto<K>, keys: Array<keyof K>) {
	const dto: {
		[path in keyof K]?: DtoPrimitiveProperties
	} = {}
	for (const [key, value] of Object.entries(input)) {
		if (keys.includes(key as keyof K)) continue
		dto[key as keyof K] = value
	}

	return dto
}

export function pickDto<K>(input: Dto<K>, keys: Array<keyof K>) {
	const dto: {
		[path in keyof K]?: DtoPrimitiveProperties
	} = {}
	for (const [key, value] of Object.entries(input)) {
		if (!keys.includes(key as keyof K)) continue
		dto[key as keyof K] = value
	}

	return dto
}
