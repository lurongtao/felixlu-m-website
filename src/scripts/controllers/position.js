import positionTpl from '../views/position.html'
import positionModel from '../models/position'

const render = async () => {
  let result = await positionModel.list()
  let template = Handlebars.compile(positionTpl)
  let html = template({list: result.content.data.page.result})
  $('main').html(html)
  new BScroll('main')
}

export default {
  render
}