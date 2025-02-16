import { Schema } from 'express-validator'
import { Dto } from 'mapping/interfaces/dto'
import { isPrimitive } from 'mapping/utils/isPrimitive'

export function parseValidation(mappedKeyy: string, input: Dto) {
	let validateObj: Schema = {}
	if (isPrimitive(input)) {
		const { validation, optional = false } = input
		if (validation) {
			validateObj[`${mappedKeyy}`] = {
				...validation,
				optional,
			}
		}
	} else if (Array.isArray(input)) {
		for (const element of input) {
			if (element instanceof Dto) {
				for (const [key, value] of Object.entries(element)) {
					validateObj = {
						...validateObj,
						...parseValidation(`${mappedKeyy}.*.${key}`, value),
					}
				}
			}
		}
	} else {
		for (const [key, value] of Object.entries(input)) {
			validateObj = {
				...validateObj,
				...parseValidation(`${mappedKeyy}.*.${key}`, value),
			}
		}
	}

	return validateObj
}
