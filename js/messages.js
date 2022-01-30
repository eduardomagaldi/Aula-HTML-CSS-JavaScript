if (!window.messages) {
    window.messages = {
        send: (msg) => {
            window.parent.postMessage(JSON.stringify(msg))
        },
        listen: (callback) => {
            window.addEventListener('message', async (e) => {
                const json = JSON.parse(e.data)
                callback(json)
            })
        },
    }
}
