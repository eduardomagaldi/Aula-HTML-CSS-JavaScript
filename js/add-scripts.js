addScript('js/auto-x-positioning.js')
addScript('js/impress.js', () => {
    impress().init();
})
// addScript('js/highlight.min.js', () => {
//     hljs.highlightAll();
// })
// addScript('js/codemirror.js', () => {
//     // addScript('js/javascript.js')
//     // addScript('js/xml.js')
//     addScript('js/xml.js', () => {
//         const editor = CodeMirror.fromTextArea(
//             document.getElementById('editor'),
//             {
//                 mode: "xml",
//                 lineNumbers: true,
//                 theme: 'monokai',
//                 viewportMargin: Infinity,
//             }
//         );
//         editor.save()

//         editor.on('change', () => {
//             console.log('editor.getValue()', editor.getValue());
//         })

//         editor.on('keyHandled', () => {
//             alert('keyHandled')
//         })

//         editor.setOption("extraKeys", {
//             '>': function(cm) {
//               alert('>')

//             }
//           });
//     })

//     // document.addEventListener('keydown', function(event) {
//     //     if(event.keyCode == 37) {
//     //         alert('Left was pressed');
//     //     }
//     //     else if(event.keyCode == 190) {
//     //         alert('.')
//     //         event.preventDefault()
//     //         event.stopImmediatePropagation()

//     //         return;

//     //     }
//     // });

//     // editor.setOption("extraKeys", {
//     //     Tab: function(cm) {
//     //         cm.
//     //     }
//     //   });
// })

function addScript(src, callback) {
    const s = document.createElement('script')
    s.setAttribute('src', src)
    s.onload = callback
    document.body.appendChild(s)
}