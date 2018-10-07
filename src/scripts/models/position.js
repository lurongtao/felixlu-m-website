const list = () => {
  return $.ajax({
    url: '/api/position/list',
    success: (result) => {
      return result
    }
  })
}

export default {
  list
}