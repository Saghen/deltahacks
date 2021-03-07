import KoaRouter from 'koa-router'
import authService from '@services/auth/service'
import config from '@config'

import { authMiddleware } from '@helpers/auth'

const router = new KoaRouter()

router.prefix('/todo')

router.get('/get', authMiddleware(), async (ctx) => {
    ctx.ok(await todoService.get(ctx.query))
})

router.get('/get-by-id', authMiddleware(), async (ctx) => {
    ctx.ok(await todoService.getById(ctx.query))
  })
  
router.put('/list', authMiddleware(), async (ctx) => {
ctx.ok(await todoService.list(ctx.request.body))
})

//idk if i should use POST or PUT, if no work: switch
router.post('/update', authMiddleware(), async (ctx) => {
ctx.ok(await todoService.update(ctx.query))
})


router.delete('/delete', authMiddleware(), async (ctx) => {
ctx.ok(await todoService.delete(ctx.query))
})