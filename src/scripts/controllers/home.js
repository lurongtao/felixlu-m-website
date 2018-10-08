import homeTpl from '../views/home.html'

const render = () => {
  $('#root').html(homeTpl)
  switchTab()
}

const switchTab = () => {
  const pagelist = ['/index.html', '/search.html', '/profile.html']
  const index = pagelist.indexOf(location.pathname)
  $('nav li').eq(index).addClass('active').siblings().removeClass('active')
  $('nav li').on('tap', function () {
    location.href = pagelist[$(this).index()]
  })
}

export default {
  render
}