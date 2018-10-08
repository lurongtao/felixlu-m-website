import positionTpl from '../views/position.html'
import positionListTpl from '../views/position-list.html'
import positionModel from '../models/position'

let datasource = []
let pageno = 1
const render = async () => {
  $('main').html(positionTpl)
  renderList()
  renderScroll()
}

const renderScroll = () => {
  let posScroll = new BScroll('main', {
    probeType: 2
  })
  posScroll.scrollBy(0, -40)

  let head = $('.head img'),
      topImgHasClass = head.hasClass('up')
  let foot = $('.foot img'),
      bottomImgHasClass = head.hasClass('down')
  
  posScroll.on('scroll', function () {
    let y = this.y,
        maxY = this.maxScrollY - y
 
    // 下拉，当隐藏的loading完全显示的时候触发
    if (y >= 0) {
      !topImgHasClass && head.addClass('up')
      return
    }

    // 上拉，当滚动到最底部时候触发
    if ( maxY >=0 ) {
      !bottomImgHasClass && foot.addClass('down')
      return
    }
  })

  posScroll.on('scrollEnd', async function () {
    // 下拉刷新处理
    if (this.y >= -40 && this.y < 0) {
      this.scrollTo(0, -40)
      head.removeClass('up')
    } else if (this.y >= 0) {
      head.attr('src', '/images/ajax-loader.gif')

      let result = await positionModel.refresh()
      let list = datasource = [
        ...result.content.data.page.result,
        ...datasource
      ]
      let template = Handlebars.compile(positionListTpl)
      let html = template({list})
      $('#scroll-list').html(html)

      this.refresh()
      head.attr('src', '/images/arrow.png')
      this.scrollTo(0, -40)
      head.removeClass('up')
    }

    // 下拉加载处理
    let maxY = this.maxScrollY - this.y
    if (maxY > -40 && maxY < 0) {
        this.scrollTo(0, this.maxScrollY + 40);
        foot.removeClass('down')
    } else if (maxY >= 0) {
        foot.attr('src', '/images/ajax-loader.gif');

        let result = await positionModel.loadmore(`/lagou/listmore.json?pageNo=${++pageno}&pageSize=15`)
        let list = datasource = [
          ...datasource,
          ...result.content.data.page.result
        ]
        let template = Handlebars.compile(positionListTpl)
        let html = template({list})
        $('#scroll-list').html(html)

        this.refresh()
        this.scrollTo(0, this.y + 40)
        foot.attr('src', '/images/arrow.png')
        foot.removeClass('down')
    }
  })
}

const renderList = async () => {
  let result = await positionModel.list()
  let list = datasource = result.content.data.page.result
  let template = Handlebars.compile(positionListTpl)
  let html = template({list})
  $('#scroll-list').html(html)
}

export default {
  render
}