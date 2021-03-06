import $ from 'jquery'

let init = [
  function () {
    const vsCarousel = this
    const { element, className, config } = vsCarousel

    if (config.effect !== 'slide') return

    vsCarousel.effect.left = () => {
      vsCarousel.effect.leftEnd()
      vsCarousel.slide.slideNumAdd()
      vsCarousel.button.pageHover(vsCarousel.slide.pageNum())
      vsCarousel.slide.left = vsCarousel.slide.left - element.offsetWidth

      $(element).find(className.wrapper).css({
        left: vsCarousel.slide.left,
        transition: 'all .5s'
      })

      $(element).find(className.wrapper).on('transitionend', function (){
        vsCarousel.effect.leftEnd()
      })
    }

    vsCarousel.effect.leftEnd = ()=>{
      if (vsCarousel.slide.leftEnd()) {
        vsCarousel.slide.left = -element.offsetWidth
        $(element).find(className.wrapper).css({
          left: vsCarousel.slide.left,
          transition: 'all 0s'
        })
      }
    }

  },
  function () {
    const vsCarousel = this
    const { element, className, config } = vsCarousel

    if (config.effect !== 'fade') return

    vsCarousel.effect.left = () => {
      vsCarousel.slide.leftEnd()
      vsCarousel.slide.slideNumAdd()
      vsCarousel.button.pageHover(vsCarousel.slide.pageNum())
      vsCarousel.slide.left = vsCarousel.slide.left - element.offsetWidth
      $(element).find(className.slide).css({
        transition: 'all .5s',
        opacity: 0,
      })
      $(element).find(className.slide).eq(vsCarousel.slide.pageNum() - 1).css({
        transition: 'all .5s',
        opacity: 1,
      })
    }

  },
]

export default function () {
  init.forEach(v => { v.call(this) })
}