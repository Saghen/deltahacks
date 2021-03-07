import KoaRouter from 'koa-router'
import authService from '@services/auth/service'
import config from '@config'

import { authMiddleware } from '@helpers/auth'

const router = new KoaRouter()