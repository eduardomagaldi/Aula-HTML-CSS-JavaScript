addLink('favicon.png', 'shortcut icon')
addLink('css/aula.css')
addLink('css/labels-color.css')

function addLink(href, rel = 'stylesheet', crossorigin, callback) {
    const l = document.createElement('link')
    l.setAttribute('rel', rel)
    l.setAttribute('href', href)
    l.onload = callback
    if (crossorigin) {
        l.crossorigin = ''
    }
    document.head.appendChild(l)
}