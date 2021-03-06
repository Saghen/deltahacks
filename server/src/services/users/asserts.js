import { Forbidden } from 'fejl'
import { assertNotFoundGenerator, assertTakenGenerator, assertRequiredGenerator } from '@helpers/asserts'

const assertUserNotFound = assertNotFoundGenerator('user')
const assertUsernameTaken = assertTakenGenerator('username')
const assertRequiredNonAdminGenerator = (property, type) => assertRequiredGenerator(property, `${type} when not admin`)
const assertMustBeAdmin = Forbidden.makeAssert('You must be an admin')
const assertNotAuthorized = Forbidden.makeAssert('You are not authorized to access the requested data')

export {
  assertUserNotFound,
  assertMustBeAdmin,
  assertUsernameTaken,
  assertNotAuthorized,
  assertRequiredNonAdminGenerator,
}