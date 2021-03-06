import KoaRouter from 'koa-router'
import { authMiddleware } from '@helpers/auth'

const router = new KoaRouter()

router.prefix('/projects')