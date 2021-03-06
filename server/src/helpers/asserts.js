import { BadRequest, NotFound, Conflict } from 'fejl'

const assertObjectId = BadRequest.makeAssert(`A valid ObjectId must be provided`)
const assertObjectIdGenerator = (property) => assertRequiredGenerator(property, 'ObjectId in the form of a string')

const assertPermissionLevel = BadRequest.makeAssert('The permission level must be one of the enum values')
const assertStatus = BadRequest.makeAssert('The status must be one of the enum values')

const assertRequiredGenerator = (property, type) =>
  BadRequest.makeAssert(`${property} is required${type && ` and must be of type ${type}`}`)

const assertMustBeOfType = (property, type) => BadRequest.makeAssert(`${property} must be of type ${type}`)

const assertNotFoundGenerator = (property) => NotFound.makeAssert(`The ${property} was not found`)

const assertTakenGenerator = (property) => Conflict.makeAssert(`The provided ${property} is already taken`)

const assertArrayMustContainItem = (property) => BadRequest.makeAssert(`${property} must contain at least one item`)

const assertTooShortGenerator = (property, length) =>
  BadRequest.makeAssert(`Your ${property} must be more than ${length} characters`)

const assertTooLongGenerator = (property, length) =>
  BadRequest.makeAssert(`Your ${property} must be less than ${length} characters`)

export {
  assertObjectId,
  assertObjectIdGenerator,
  assertPermissionLevel,
  assertStatus,
  assertRequiredGenerator,
  assertMustBeOfType,
  assertNotFoundGenerator,
  assertTakenGenerator,
  assertArrayMustContainItem,
  assertTooLongGenerator,
  assertTooShortGenerator,
}
