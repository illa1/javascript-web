const matrixBg = document.getElementById('matrix-bg');

let ctxBg = matrixBg.getContext()
let cw = matrixBg.clientWidth
let ch = matrixBg.clientHeight
let font = 10
let col = cw / font
let arrSymbol = []

for(let i = 0; i < col; i++){
    // const element = array[i]
    arrSymbol[i] = 1
}

const str = "qw^e -1rt * y+ui o5p[2 &}]as $3 df4  ghjk7l;'zx 65 6c# vb% %^n 09m,./";
let matrixStrArr = str.split('')
console.log(matrixStrArr)

function drawSymbol(){
    ctxBg.fillStyle = "rgba(0,0,0,0.05)"
    ctxBg.fillRect(0, 0, cw, ch)

    ctxBg.fillStyle = '#0f0'
    ctxBg.font = font + "px system-ui"

    for(let i = 0; i < arrSymbol.length; index++){
        let s = matrixStrArr[Math.floor(Math.random() * matrixStrArr.length)]

        ctxBg.fillText(s, i * font, arrSymbol[i] * font)
        
        arrSymbol[i]++
    }
}
setInterval(drawSymbol,150)