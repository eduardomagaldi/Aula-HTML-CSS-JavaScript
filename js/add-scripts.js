addScript('js/auto-x-positioning.js')
addScript('js/impress.js', () => {
    impress().init();
})
addScript('js/messages.js', () => {
    addScript('js/codes-dynamic-load.js')
})

function addScript(src, callback) {
    const s = document.createElement('script')
    s.setAttribute('src', src)
    s.onload = callback
    document.body.appendChild(s)
}