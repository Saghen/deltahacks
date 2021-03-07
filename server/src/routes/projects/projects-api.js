import KoaRouter from 'koa-router'
import authMiddleware from '@helpers/auth'
import projectsService from '@services/projects/service'

const router = new KoaRouter()

router.prefix('/projects')

router.GET('/get', authMiddleware(), async (ctx) => {
  ctx.ok(await projectsService.get(ctx.query))
})

router.GET('/get-by-id', authMiddleware(), async (ctx) => {
  ctx.ok(await projectsService.getById(ctx.query))
})

router.GET('/get-by-name', authMiddleware(), async (ctx) => {
  ctx.ok(await projectsService.getByName(ctx.query))
})

router.PUT('/list', authMiddleware(), async (ctx) => {
  ctx.ok(await projectsService.list(ctx.request.body))
})

//idk if i should use POST or PUT, if no work: switch
router.POST('/update', authMiddleware(), async (ctx) => {
  ctx.ok(await projectsService.update(ctx.query))
})

router.DELETE('/delete', authMiddleware(), async (ctx) => {
  ctx.ok(await projectsService.delete(ctx.query))
})