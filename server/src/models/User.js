import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

function validateLocalStrategyProperty(property) {
  return property.length
}

export function validatePassword(password) {
  return password && password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/.test(password)
}

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      index: true,
      validate: [validateLocalStrategyProperty, 'A username must be provided'],
    },
    password: {
      type: String,
      validate: [
        validatePassword,
        'The password must contain an uppercase, lowercase, and a digit and be atleast 8 characters.',
      ],
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

/**
 * Password hashing and comparing
 */
UserSchema.pre('save', async function () {
  const user = this
  if (!user.isModified('password') || user.password === undefined) return

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt, null)
  user.password = hash
})

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

const User = mongoose.model('User', UserSchema)

export default User
