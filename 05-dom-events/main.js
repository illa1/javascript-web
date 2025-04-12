let rulesModalWindow = document.getElementsByClassName('rules')[0];
// console.log(rulesModalWindow);

let buttons = rulesModalWindow.getElementsByTagName('button');
// console.log(buttons);

for(let i = 0; i < buttons.length; i++){
    console.log(buttons[i]);
    buttons[i].onclick = function(e){
        // console.log(e)
        rulesModalWindow.style.display = 'none'
    }
};

// let b1 = document.getElementById('b-1')
// let b2 = document.getElementById('b-2')

let openHelp = document.querySelector('main button')
openHelp.onclick = function(){
    rulesModalWindow.style.display = 'flex'
};

let images = 'images/'
const boardItems = [
    {name:'bullbasaur', img:'bullbasaur.png'},
    {name:'charmander', img:'charmander.png'},
    {name:'eevee', img:'eevee.png'},
    {name:'pikachu', img:'pikachu.png'},
    {name:'psyduck', img:'psyduck.png'},
    {name:'squirtle', img:'squirtle.png'},
    // --------------------------------------
    {name:'bullbasaur', img:'bullbasaur.png'},
    {name:'charmander', img:'charmander.png'},
    {name:'eevee', img:'eevee.png'},
    {name:'pikachu', img:'pikachu.png'},
    {name:'psyduck', img:'psyduck.png'},
    {name:'squirtle', img:'squirtle.png'},
];

boardItems.sort(()=>Math.random() - 0.5)

let initImg = 'pokeball.jpg';
let selectImg = 'pokecoin.jpg'
let sectionBoard = document.getElementById('board');
let cardsId = []
let countResult = 0
let spanResult = document.getElementById('result')

function flipImg(e){
    let id = this.getAttribute('id')

    if(cardsId.length < 3 && !cardsId.includes(id)){
        this.setAttribute('src',images + boardItems[id].img)
        
        if(cardsId.length<3) cardsId.push(id)

        console.log('ids=', cardsId)

        if(cardsId.length === 2)
            setTimeout(checkCards, 400)
    }
};

function checkCards(){
    countResult++
    let item1 = document.getElementById(cardsId[0])
    let item2 = document.getElementById(cardsId[1])

    if (item1.getAttribute('src') === item2.getAttribute('src')){
        item1.setAttribute('src', images+selectImg)
        item2.setAttribute('src', images+selectImg)
        item1.onclick = ''
        item2.onclick = ''
    }else{
        item1.setAttribute('src', images+initImg)
        item2.setAttribute('src', images+initImg)
    }
    cardsId = []
    spanResult.innerHTML = countResult

};

function createBoard(number = 12){
    for(let i = 0; i<number; i++){
        let img = document.createElement('img')
        img.setAttribute('src', images + initImg)
        img.setAttribute('id',i)
        img.onclick = flipImg
        sectionBoard.append(img)
    }
};

createBoard(boardItems.length);