import { BadRequest, Forbidden, NotFound } from 'fejl'

import { objectToToken, comparePassword } from '@helpers/auth'
import { assertRequiredGenerator
  assertMustBeOfType,
  assertTooLongGenerator,
  assertTooShortGenerator,
} from '@helpers/asserts'
import User, { validatePassword } from '@models/User'

import config from '@config'
const authConfig = config.get('auth')

export default {
  async login({ username, password }) {
    if (!authConfig.enabled) return objectToToken({ admin: true })
    BadRequest.assert(username && password, 'A username and password must be provided')

    const user = await User.findOne({ username: username.toLowerCase() })

    NotFound.assert(user, 'The user was not found')

    Forbidden.assert(await comparePassword(password, user.password), 'Password is incorrect')

    return objectToToken({
      id: user.id,
      username
    })
  },
  async setupAccount({ username, password }) {
    assertRequiredGenerator('username', 'string')(username)
    assertTooShortGenerator('username', 4)(username.length > 4)

    BadRequest.assert(
      validatePassword(password),
      'The password must contain an uppercase, lowercase, and a digit and be at least 8 characters'
    )

    const user = new User({
      username,
      password,
    })

    await user.save()

    return {
      user,
      token: await objectToToken({
        id: user.id,
        username: user.username,
      }),
    }
  },
}
