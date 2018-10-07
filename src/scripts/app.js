import Router from '../utils/router'

import homeController from './controllers/home'
import positionController from './controllers/position'
import searchController from './controllers/search'
import profileController from './controllers/profile'

homeController.render()

// fastclick
const attachFastClick = Origami.fastclick
attachFastClick(document.body)

// 路由定义
const router = new Router()
router.route('/position', positionController.render)
router.route('/search', searchController.render)
router.route('/profile', profileController.render)
router.init()
router.redirect('/position')