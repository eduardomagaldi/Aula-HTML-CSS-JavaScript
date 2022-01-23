const slides = document.querySelectorAll('.slide')
const diff = 1100
let xPosition = 0
const xPositionsByYPosition = {}

slides.forEach((slide) => {
    const yPosition = slide.getAttribute('data-y')

    slide.setAttribute('data-x', xPosition)
    slide.setAttribute('data-y', 0)
    xPosition += diff
})