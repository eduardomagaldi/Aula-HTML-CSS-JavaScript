addLink('https://fonts.googleapis.com', 'preconnect')
addLink('https://fonts.gstatic.com', 'preconnect', true)
addLink('https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;500&display=swap')
addLink('css/impress-common.css')
addLink('css/impress-demo.css')
addLink('css/aula.css')
addLink('favicon.png', 'shortcut icon')
addLink('css/codemirror.css')
addLink('css/monokai.css')

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