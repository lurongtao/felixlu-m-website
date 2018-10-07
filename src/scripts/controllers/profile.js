import profileTpl from '../views/profile.html'

const render = async () => {
  $('main').html(profileTpl)
}

export default {
  render
}