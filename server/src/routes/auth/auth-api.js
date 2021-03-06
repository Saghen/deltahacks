import KoaRouter from 'koa-router'
import authService from '@services/auth/service'
import config from '@config'

import { authMiddleware } from '@helpers/auth'

const router = new KoaRouter()

const cookieConfig = {
  secure: config.get('ssl'),
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  domain: config.get('api.domain'),
  httpOnly: false,
  sameSite: 'None',
}

const cookieConfigHttpOnly = {
  ...cookieConfig,
  httpOnly: true,
}

router.prefix('/auth')

router.post('/login', async (ctx) => {
  const token = await authService.login(ctx.request.body)

  ctx.cookies.set(config.get('auth').cookie, token, cookieConfigHttpOnly)

  ctx.ok({ message: 'Successfully logged in', token })
})

router.put('/setup-account', async (ctx) => {
  const { token } = await authService.setupAccount(ctx.request.body)

  ctx.cookies.set(config.get('auth').cookie, token, cookieConfigHttpOnly)

  ctx.ok({ message: 'Successfully logged in', token })
})

router.get('/get', authMiddleware(), (ctx) => ctx.ok(ctx.user))

router.get('/logout', async (ctx) => {
  ctx.cookies.set(config.get('auth').cookie, '', cookieConfigHttpOnly)

  ctx.ok({ message: 'Successfully logged out' })
})

export default router
