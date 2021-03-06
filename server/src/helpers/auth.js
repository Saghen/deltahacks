import config from '@config'
import paseto from 'paseto'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

import { assertNotLoggedIn } from '@services/auth/assert'

const { encrypt, verify } = paseto.V2

const privateKey = crypto.createPrivateKey(config.get('auth.privateKey'))

function authMiddleware(options) {
  return async (ctx, next) => {
    let parsedOptions = options || {}
    if (typeof options === 'function') parsedOptions = options(ctx)

    const { passthrough = false } = parsedOptions
    const token = ctx.cookies.get(config.get('auth').cookie)
    assertNotLoggedIn(token || passthrough)

    if (token || !passthrough) {
      ctx.user = await verify(token, privateKey).catch(() => {
        ctx.forbidden({ message: 'The token is invalid', invalidToken: true })
      })
      if (!ctx.user) return
    }
    return next()
  }
}

function objectToToken(obj) {
  return encrypt(obj, privateKey)
}

function comparePassword(password, encryptedPassword) {
  return bcrypt.compare(password, encryptedPassword)
}

export { authMiddleware, objectToToken, comparePassword }
