const list = require('./list.json')
const refresh = require('./list-refresh.json')
module.exports = () => {
  return {
    list,
    refresh,
    loadmore: refresh
  }
}