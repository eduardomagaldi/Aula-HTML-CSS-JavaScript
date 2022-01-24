const codesDynamic = document.querySelectorAll('.codeDynamic')
const allCodes = []

for (let i = 0; i < codesDynamic.length; i++) {
    const el = codesDynamic?.[i]
    const url = el?.dataset?.url

    allCodes.push(fetchCode(el, url))
}

(async () => {
    const code = await fetchCode(null, 'code')
    console.log('code', code)

    const results = await Promise.all(allCodes)

    results.forEach((result) => {
        const iframe = document.createElement('iframe')
        const wrapper = result.el.querySelector('.code')
        applyToIframe(wrapper, iframe, result.code)
    })
})();

async function fetchCode(el, name) {
    const code = await (await fetch(`codes-dynamic/${name}.html`)).text()

    return {
        el,
        code,
    }
}

function applyToIframe(wrapper, iframe, html) {
    if (!wrapper.hasChildNodes()) {
        wrapper.appendChild(iframe)
    }

    iframe.contentWindow.document.open()
    iframe.contentWindow.document.write(html)

    addScript('js/a.js', iframe.contentWindow.document)

    const wrapperBody = iframe.contentWindow.document.querySelector('.wrapperBody')

    console.log('wrapperBody.offsetHeight', wrapperBody?.offsetHeight)

    iframe.contentWindow.document.close()
}

function addScript(src, document, callback) {
    const s = document.createElement('script')
    s.setAttribute('src', src)
    s.onload = callback
    document.body.appendChild(s)
}

// console.log('codesDynamic', codesDynamic[0].dataset.url)

// setTimeout(async () => {
//     messages.listen((json) => {
//         console.log('json', json)
//     })

//     messages.send({ bla: 1 })
// }, 0)

//     const respCode = await fetch('codes/code.html')
//     const htmlCode = await respCode.text()

//     const iframeCode = document.createElement('iframe')
//     const wrapperCode = document.querySelector('#wrapper-code')
//     applyToIframe(wrapperCode, iframeCode, htmlCode)

//     const iframePage = document.createElement('iframe')
//     const wrapperPage = document.querySelector('#wrapper-page')

//     window.addEventListener('message', async function (e) {
//         const htmlContent = JSON.parse(e.data)

//         iframeCode.style.height = htmlContent.height + 'px'
//         wrapperCode.style.height = htmlContent.height + 'px'

//         const respPage = await fetch('codes/page.html')
//         const htmlPage = await respPage.text()

//         applyToIframe(wrapperPage, iframePage, htmlPage)
//     }, false);

//     window.addEventListener('codeChange', async function (e) {

//     }, false);

    // messagesListen((json) => {
    //     console.log('json', json)
    // })




