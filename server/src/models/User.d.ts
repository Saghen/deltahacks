import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { IVirtualOffice } from './VirtualOffice'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      index: true,
      validate: [validateLocalStrategyProperty, 'A username must be provided'],
    },
    password: {
      type: String,
      validate: [
        validatePassword,
        'Password must contain an uppercase, lowercase, and a digit and be atleast 8 characters.',
      ],
    },
    virtualOfficeIds: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VirtualOffice' }],
      default: [],
      // TODO: Check if Virtual Offices exist
    },
    permissionEnum: {
      type: String,
      default: 'DEFAULT',
      validate: [isPermissionEnum, 'The permission level must be one of the enum keys'],
    },
    verificationCode: {
      type: String,
      required: true,
      // TODO: Validate
    },
    deleted: Boolean,
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

export interface IUser extends mongoose.Document {
  firstName: string,
  lastName: string,
  username: string,
  password: string,
  virtualOfficeIds: Array<IVirtualOffice>,
  permissionEnum: string,
  verificationCode: string,
  deleted: boolean
}

const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema)

export default User
