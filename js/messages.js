if (!window.messages) {
    window.messages = {
        send: (msg) => {
            window.parent.postMessage(JSON.stringify(msg))
        },
        listen: (callback) => {
            window.addEventListener('message', async (e) => {

                // const condition = e.source === document.querySelector('iframe').contentWindow

                // console.log('e.source', e.source.document)

                // console.log('condition', condition)

                // console.log('e', .document)

                // console.log('e.source', e.source.document.parent)

                const json = JSON.parse(e.data)
                console.log('json', json)
                callback(json)
            })
        },
    }
}
