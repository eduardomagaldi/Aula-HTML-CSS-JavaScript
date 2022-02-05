(async () => {
    const templatesResult = await Promise.all([
        fetchCode(null, 'editor'),
        fetchCode(null, 'page'),
    ])

    const editorTemplate = templatesResult?.[0]?.html
    const pageTemplate = templatesResult?.[1]?.html

    const codesDynamic = document.querySelectorAll('.codeDynamic')
    const allCodes = []

    for (let i = 0; i < codesDynamic.length; i++) {
        const el = codesDynamic?.[i]
        const url = el?.id
        const htmlName = el?.dataset?.html

        allCodes.push(fetchCode(el, url, htmlName))
    }

    const results = await Promise.all(allCodes)

    results.forEach((result) => {
        handleResult(
            result,
            editorTemplate,
            pageTemplate,
        )
    })

    messages.listen((json) => {
        if (json.type === 'code') {
            const el = document.querySelector('#' + json.iframeId).parentElement.parentElement
            const result = {
                code: json.value,
                el,
            }
            // handleResult(result, editorTemplate, pageTemplate)
        }

        if (json.type === 'height') {
            const el = document.querySelector('#' + json.iframeId)
            const parent = el.parentElement
            el.style.height = json.value + 'px'
            parent.style.height = json.value + 'px'

            // const result = {
            //     code: json.value,
            //     el,
            // }
            // handleResult(result, editorTemplate, pageTemplate)
        }
    })
})();

async function fetchCode(el, name, htmlName) {
    let responses
    const responsesResults = []
    const responsesResultsTypes = []
    let successResponseCss
    let successResponseJs

    // console.log('htmlName', htmlName)
    htmlName = htmlName ?? name
    console.log('htmlName', htmlName)

    if (name === 'code' || name === 'page') {
        responses = await Promise.all([
            fetch(`codes-dynamic/${htmlName}.html`),
        ])
    } else {
        responses = await Promise.all([
            fetch(`codes-dynamic/${htmlName}.html`),
            fetch(`codes-dynamic/${name}.css`),
            fetch(`codes-dynamic/${name}.js`),
        ])

        console.log('responses', responses)

        successResponseCss = filterSuccess(responses, 'css')
        if (successResponseCss) {
            responsesResultsTypes.push('css')
            responsesResults.push(successResponseCss?.text())
        }

        successResponseJs = filterSuccess(responses, 'js')
        if (successResponseJs) {
            responsesResultsTypes.push('js')
            responsesResults.push(successResponseJs?.text())
        }
    }

    const successResponseHtml = filterSuccess(responses, 'html')
    if (successResponseHtml) {
        responsesResultsTypes.push('html')
        responsesResults.push(successResponseHtml?.text())
    }

    const results = await Promise.all(responsesResults)
    const output = {}

    results.forEach((result, i) => {
        const type = responsesResultsTypes[i]
        output[type] = result
    })

    output.el = el
    output.name = name

    return output
}

function filterSuccess(responses, type) {
    return responses.filter((resp) => {
        return resp.status === 200 && resp.url.includes('.' + type)
    })?.[0]
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
    let html = result.html ?? ''
    let css = result.css ?? ''
    let js = result.js ?? ''

    // const codeValue = result?.code
    const name = result?.name
    const el = result?.el
    let editorHtml = editorTemplate
    let pageHtml = pageTemplate

    editorHtml = editorHtml?.replace('[[html]]', html)
    editorHtml = editorHtml?.replace('[[css]]', css)
    editorHtml = editorHtml?.replace('[[js]]', js)
    // editorHtml = editorHtml?.replace('[[bodyClass]]', 'center')

    pageHtml = pageHtml?.replace('[[html]]', html)
    pageHtml = pageHtml?.replace('[[css]]', css)
    pageHtml = pageHtml?.replace('[[js]]', js)

    // const pageIframeHtml = pageTemplate?.replace('[[html]]', codeValue)

    applyToIframe(el?.querySelector('.code'), editorHtml, 'iframe-code-' + name)
    applyToIframe(el?.querySelector('.page'), pageHtml, 'iframe-page-' + name)
}
