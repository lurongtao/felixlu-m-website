import homeTpl from '../views/home.html'

const render = () => {
  $('#root').html(homeTpl)
  switchTab()
}

const switchTab = () => {
  $('nav li').on('tap', function () {
    const pagelist = ['/position', '/search', '/profile']
    location.hash = pagelist[$(this).index()]
  })
}

export default {
  render
}