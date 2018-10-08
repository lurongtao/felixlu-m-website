import homeController from './controllers/home'
import searchController from './controllers/search'

homeController.render()
searchController.render()

// fastclick
const attachFastClick = Origami.fastclick
attachFastClick(document.body)