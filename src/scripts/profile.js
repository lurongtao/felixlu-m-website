import homeController from './controllers/home'
import profileController from './controllers/profile'

homeController.render()
profileController.render()

// fastclick
const attachFastClick = Origami.fastclick
attachFastClick(document.body)