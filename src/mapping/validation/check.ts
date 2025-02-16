import { Location, ParamSchema } from 'express-validator'
import { OptionalOptions } from 'express-validator/lib/chain'
import { defaultMessage, typeCheck } from './message'

export function checkParam(
	isValidators: typeCheck[],
	message?: string,
	options?: OptionalOptions,
): ParamSchema {
	return check(isValidators, 'params', message, options)
}

export function checkQuery(
	isValidators: typeCheck[],
	message?: string,
	options?: OptionalOptions,
): ParamSchema {
	return check(isValidators, 'query', message, options)
}

export function checkBody(
	isValidators: typeCheck[],
	message?: string,
	options?: OptionalOptions,
): ParamSchema {
	return check(isValidators, 'body', message, options)
}

export function check(
	isValidators: typeCheck[],
	here: Location,
	message?: string,
	options?: OptionalOptions,
): ParamSchema {
	const schema: ParamSchema = {}
	for (const validator of isValidators) {
		if (validator === 'optional') {
			schema.optional = true
		} else {
			schema[validator] = {
				errorMessage: message || defaultMessage(validator),
			}
			if (options) {
				schema[validator].options = options
			}
		}
	}
	return {
		in: here,
		...schema,
	}
}
