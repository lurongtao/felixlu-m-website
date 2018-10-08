import homeController from './controllers/home'
import positionController from './controllers/position'

homeController.render()

// fastclick
const attachFastClick = Origami.fastclick
attachFastClick(document.body)

positionController.render()