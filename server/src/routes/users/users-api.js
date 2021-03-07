import KoaRouter from 'koa-router'
import { authMiddleware } from '@helpers/auth'
import usersService from '@services/users/service'

const router = new KoaRouter()

router.prefix('/users')

router.get('/get', authMiddleware(), async (ctx) => {
  ctx.ok(await usersService.get(ctx.query))
})

router.post('/list', authMiddleware(), async (ctx) => {
  ctx.ok(await usersService.list(ctx.request.body))
})

router.put('/create', authMiddleware(), async (ctx) => {
  ctx.ok(await usersService.create(ctx.request.body))
})

router.patch('/update', authMiddleware(), async (ctx) => {
  ctx.ok(await usersService.update(ctx.request.body, ctx.request.body))
})

router.delete('/delete', authMiddleware(), async (ctx) => {
  ctx.ok(await usersService.delete(ctx.request.body))
})

export default router
