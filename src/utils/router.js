function Router() {
  this.currentUrl = ''
  this.routes = {}
}

const noop = function () {}

Router.prototype.route = function (url, cb) {
  this.routes[url] = cb || noop
}

Router.prototype.refresh = function () {
  this.currentUrl = location.hash.slice(1) || '/position'
  this.routes[this.currentUrl]()
  this.switchTab()
}

Router.prototype.redirect = function (url) {
  this.currentUrl = url
  location.hash = this.currentUrl
}

Router.prototype.switchTab = function () {
  const pagelist = new Map([['/position', 0], ['/search', 1], ['/profile', 2]])
  $('nav li')
    .eq(pagelist.get(this.currentUrl))
    .addClass('active')
    .siblings()
    .removeClass('active')
}

Router.prototype.init = function () {
  window.addEventListener('load', this.refresh.bind(this))
  window.addEventListener('hashchange', this.refresh.bind(this))
}

export default Router