const codesDynamic = document.querySelectorAll('.codeDynamic')
const allCodes = []

for (let i = 0; i < codesDynamic.length; i++) {
    const el = codesDynamic?.[i]
    const url = el?.id

    allCodes.push(fetchCode(el, url))
}

(async () => {
    const templatesResult = await Promise.all([
        fetchCode(null, 'code'),
        fetchCode(null, 'page'),
    ])

    const editorTemplate = templatesResult?.[0]?.code
    const pageTemplate = templatesResult?.[1]?.code

    const results = await Promise.all(allCodes)

    results.forEach((result) => {
        handleResult(result, editorTemplate, pageTemplate)
    })

    messages.listen((json) => {
        if (json.type === 'code') {
            // const el = document.querySelector('#' + json.iframeId).parentElement.parentElement
            // const result = {
            //     code: json.value,
            //     el,
            // }
            // handleResult(result, editorTemplate, pageTemplate)
        }

        if (json.type === 'height') {
            console.log('json', json)

            const el = document.querySelector('#' + json.iframeId)
            const parent = el.parentElement
            el.style.height = json.value + 'px'
            parent.style.height = json.value + 'px'
            // console.log('el', el)


            // const result = {
            //     code: json.value,
            //     el,
            // }
            // handleResult(result, editorTemplate, pageTemplate)
        }
    })
})();

async function fetchCode(el, name) {
    const responses = await Promise.all([
        fetch(`codes-dynamic/${name}.html`),
        fetch(`codes-dynamic/${name}.css`),
        fetch(`codes-dynamic/${name}.js`),
    ])

    const successResponseHtml = responses.filter((resp) => {
        return resp.status === 200 && resp.url.includes('.html')
    })?.[0]
    const successResponseCss = responses.filter((resp) => {
        return resp.status === 200 && resp.url.includes('.css')
    })?.[0]
    const successResponseJs = responses.filter((resp) => {
        return resp.status === 200 && resp.url.includes('.js')
    })?.[0]

    const results = await Promise.all([
        successResponseHtml?.text(),
        successResponseCss?.text(),
        successResponseJs?.text(),
    ])
    console.log('results', results)

    // console.log('result', result)

    // return {
    //     el,
    //     code: codeHtml,
    //     codeType:
    //     name,
    // }
}

function applyToIframe(wrapper, html, name) {
    if (wrapper) {
        let iframe = wrapper.querySelector('iframe')

        if (!iframe) {
            iframe = document.createElement('iframe')
            iframe.setAttribute('id', name)
            wrapper.appendChild(iframe)
        }

        iframe.contentWindow.document.open()
        iframe.contentWindow.document.write(html)
        iframe.contentWindow.document.close()
    }
}

function handleResult(result, editorTemplate, pageTemplate) {
    const codeValue = result?.code
    const name = result?.name
    const el = result?.el
    const codeIframeHtml = editorTemplate?.replace('[[html]]', codeValue)
    const pageIframeHtml = pageTemplate?.replace('[[html]]', codeValue)

    applyToIframe(el?.querySelector('.code'), codeIframeHtml, 'iframe-code-' + name)
    applyToIframe(el?.querySelector('.page'), pageIframeHtml, 'iframe-page-' + name)
}

// function applyToIframe(wrapper, iframe, html) {
//     if (!wrapper.hasChildNodes()) {
//         wrapper.appendChild(iframe)
//     }




//     // const wrapperBody = iframe.contentWindow.document.querySelector('.wrapperBody')

//     // console.log('wrapperBody.offsetHeight', wrapperBody?.offsetHeight)

//
// }

// // function addScript(src, document, callback) {
// //     const s = document.createElement('script')
// //     s.setAttribute('src', src)
// //     s.onload = callback
// //     document.body.appendChild(s)
// // }

// // console.log('codesDynamic', codesDynamic[0].dataset.url)

// // setTimeout(async () => {
// //     messages.listen((json) => {
// //         console.log('json', json)
// //     })

// //     messages.send({ bla: 1 })
// // }, 0)

// //     const respCode = await fetch('codes/code.html')
// //     const htmlCode = await respCode.text()

// //     const iframeCode = document.createElement('iframe')
// //     const wrapperCode = document.querySelector('#wrapper-code')
// //     applyToIframe(wrapperCode, iframeCode, htmlCode)

// //     const iframePage = document.createElement('iframe')
// //     const wrapperPage = document.querySelector('#wrapper-page')

// //     window.addEventListener('message', async function (e) {
// //         const htmlContent = JSON.parse(e.data)

// //         iframeCode.style.height = htmlContent.height + 'px'
// //         wrapperCode.style.height = htmlContent.height + 'px'

// //         const respPage = await fetch('codes/page.html')
// //         const htmlPage = await respPage.text()

// //         applyToIframe(wrapperPage, iframePage, htmlPage)
// //     }, false);

// //     window.addEventListener('codeChange', async function (e) {

// //     }, false);

//     // messagesListen((json) => {
//     //     console.log('json', json)
//     // })
