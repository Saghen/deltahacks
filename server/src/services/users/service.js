import { assertUserNotFound, assertUsernameTaken } from './asserts'
import {
  assertObjectIdGenerator,
  assertRequiredGenerator,
  assertMustBeOfType,
  assertTooLongGenerator,
  assertTooShortGenerator,
} from '@helpers/asserts'
import { isObjectId } from '@helpers/validators'
import User from '@models/User'

import bcrypt from 'bcryptjs'

export default {
  async get({ userId }) {
    assertObjectIdGenerator('userId')(isObjectId(userId))
    return await User.findById(userId).then(assertUserNotFound)
  },

  async getByUsername({ username }) {
    return User.findOne({ username }).exec()
  },

  async list() {
    return User.find().exec()
  },

  async create({ username }) {
    assertRequiredGenerator('Username', 'string')(typeof username === 'string' && username)
    assertTooShortGenerator('Username', '4')(username.length > 4)
    assertTooLongGenerator('Username', '16')(username.length < 16)

    assertUsernameTaken(!(await User.findOne({ username }).exec()))

    return new User({
      username,
      verificationCode: await bcrypt.genSalt(10),
    }).save()
  },

  async update({ userId }, { username, password }) {
    const user = await this.get({ userId })
    if (username) {
      assertMustBeOfType('Username', 'string')(typeof username === 'string')
      assertTooShortGenerator('Username', '2')(username.length > 2)
      assertTooLongGenerator('Username', '16')(username.length < 16)
      assertUsernameTaken(username === user.username || !(await User.findOne({ username }).exec()))
      user.username = username
    }
    if (password) {
      // TODO: Global password validation and assertion
      // TODO: Remove verification code when setting password?
      user.password = password
    }
    return user.save()
  },

  async delete({ userId }) {
    const user = await this.get({ userId })
    // TODO: Archive the user? Maybe in a different collection?
    return user.remove()
  },
}
