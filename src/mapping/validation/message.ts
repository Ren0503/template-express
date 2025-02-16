import { ParamSchema } from 'express-validator'

export type typeCheck = keyof ParamSchema

export function defaultMessage(type: typeCheck) {
	let defaultMessage = 'invalid value'
	switch (type) {
		case 'exists': {
			defaultMessage = 'is required'
			break
		}
		case 'notEmpty': {
			defaultMessage = 'must not be empty'
			break
		}
		case 'isArray': {
			defaultMessage = 'must be an array'
			break
		}
		case 'isString': {
			defaultMessage = 'must be a string'
			break
		}
		case 'isAlpha': {
			defaultMessage = 'must be alpha'
			break
		}
		case 'isAlphanumeric': {
			defaultMessage = 'must be alphanumeric'
			break
		}
		case 'isDate': {
			defaultMessage = 'must be a date'
			break
		}
		case 'isEmail': {
			defaultMessage = 'must be an email'
			break
		}
		case 'isInt': {
			defaultMessage = 'must be an integer'
			break
		}
		case 'isFloat': {
			defaultMessage = 'must be a float'
			break
		}
		case 'isMongoId': {
			defaultMessage = 'must be a mongo id'
			break
		}
		case 'isBoolean': {
			defaultMessage = 'must be a boolean'
			break
		}
		case 'isStrongPassword': {
			defaultMessage = 'must be a strong password'
			break
		}
		case 'isUUID': {
			defaultMessage = 'must be a uuid'
			break
		}
		case 'isURL': {
			defaultMessage = 'must be a url'
			break
		}
		case 'isObject': {
			defaultMessage = 'must be an object'
			break
		}
	}
	return defaultMessage
}
