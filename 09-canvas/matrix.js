console.log('Start!')

const matrixBg = document.getElementById('Matrix-bg');

let ctxBg = matrixBg.getContext('2d')
let cw = matrixBg.width
let ch = matrixBg.height
let font = 8
let col = cw / font
let symbolPosY = []

for(let i = 0; i < col; i++){
    // const element = array[i]
    symbolPosY[i] = 1
}

const str = "qw^e -1rt * y +ui o5p [2 & } ] as $3 df 4  ghjk 7l;'zx 65 6c# vb % %^n 09 m, . /";
let matrixStrArr = str.split('')
console.log(matrixStrArr)

ctxBg.fillStyle = "rgb(0,0,0)"
    ctxBg.fillRect(0, 0, cw, ch)

function drawSymbol(){
    ctxBg.fillStyle = "rgba(0,0,0,0.05)"
    ctxBg.fillRect(0, 0, cw, ch)

    ctxBg.fillStyle = '#0f0'
    ctxBg.font = font + "px system-ui"

    for(let i = 0; i < symbolPosY.length; i++){
        let s = matrixStrArr[Math.floor(Math.random() * matrixStrArr.length)]

        ctxBg.fillText(s, i * font, symbolPosY[i] * font)

        if(symbolPosY[i] * font > ch && Math.random() > 0.95)
            symbolPosY[i] = 1
        
        symbolPosY[i]++

    }
}
// console.log(symbolPosY)
setInterval(drawSymbol,50)

const canvas3 = document.getElementById('slider');
const ctx3 = canvas3.getContext('2d');

const sliderArray = ['img-2/1.jpg','img-2/2.jpg','img-2/3.jpg','img-2/4.jpg','img-2/5.jpg','img-2/6.jpg'];
let sliderIndex = 0;
let slideImg = new Image();
slideImg.src = sliderArray[sliderIndex];
slideImg.onload = function(){
    ctx3.drawImage(slideImg, 0,0);
};

let leftButton = document.getElementById('left-button');
let rightButton = document.getElementById('right-button');

leftButton.onclick = function(event){
    console.log('l', sliderIndex)
    sliderIndex--
    if(sliderIndex < 0 )
        sliderIndex = sliderArray.length - 1
    slideImg.src = sliderArray[sliderIndex]
};

rightButton.onclick = function(event){
    console.log('r', sliderIndex)
    sliderIndex++
    if(sliderIndex > sliderArray.length )
        sliderIndex = 0
    slideImg.src = sliderArray[sliderIndex]
};