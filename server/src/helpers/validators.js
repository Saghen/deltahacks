import mongoose from 'mongoose'
import { assertMustBeOfType, assertObjectIdGenerator, assertArrayMustContainItem } from '@helpers/asserts'

const isObjectId = mongoose.Types.ObjectId.isValid

function validateArrayOfObjectIds(property, data) {
  assertMustBeOfType(property, 'array')(Array.isArray(data))
  assertArrayMustContainItem(property)(data.length > 0)
  assertObjectIdGenerator(`${property} child items'`)(data.every(isObjectId))
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d)
}

export { isObjectId, validateArrayOfObjectIds, isValidDate }
