let shooterGrid = document.getElementById('shooter-grid');

const gridWidth = 15;
const gridHeight = 15;

for(let i = 0; i < gridWidth*gridHeight; i++){
    let div = document.createElement('div')
    div.innerText = i
    shooterGrid.append(div);
};

const gridDivs = document.querySelectorAll('#shooter-grid div')

let bombs = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

let bombRemoved = [];

function drawBombs(bombsList){
    for(let i = 0; i < bombsList.length; i++){
        if(!bombRemoved.includes(i))
            gridDivs[bombsList[i]].classList.add('bomb')
    };
};
drawBombs(bombs);

function removeBombs(bombsList){
    for(let i = 0; i < bombsList.length; i++){
        gridDivs[bombsList[i]].classList.remove('bomb')
    };
};

let shooterIndex = 217;
gridDivs[shooterIndex].classList.add('shooter');

function moveShooter(event){
    
    gridDivs[shooterIndex].classList.remove('shooter');

    console.log(event)

    switch (event.code){
        case 'ArrowLeft': //left
            if(shooterIndex>210)
                shooterIndex--
            break
        case 'ArrowRight': //right
            if(shooterIndex<224)
                shooterIndex++
            break
    };

    gridDivs[shooterIndex].classList.add('shooter');
};

function shoot(event,){
    let setIntervalIndex;
    let currentrshootIndex = shooterIndex;

    function moveShoot(){
        gridDivs[currentrshootIndex].classList.remove('shoot')
        currentrshootIndex -= gridWidth

        if(currentrshootIndex < 0)
            clearInterval(setIntervalIndex)

        if(gridDivs[currentrshootIndex].classList.contains('bomb')){
            gridDivs[currentrshootIndex].classList.remove('bomb')
            gridDivs[currentrshootIndex].classList.add('explosion.png')
            // console.log('-------1-------')

            bombRemoved.push(bombs.indexOf(currentrshootIndex))
            clearInterval(setIntervalIndex)
            gridDivs[currentrshootIndex].classList.remove('explosion.png')

            // console.log(bombRemoved)
        }else{
            gridDivs[currentrshootIndex].classList.add('shoot')
        }

    };

    if(event.code == "Space"){
        setIntervalIndex = setInterval(moveShoot, 100)
    };
};

let xStep = 1
let yStep = 0
let directionRight = true

function moveBombs(bombsList){
    removeBombs(bombsList);

    yStep = 0
    if(directionRight && bombsList[bombsList.length-1] % gridWidth == gridWidth - 1){
        directionRight = false
        xStep = -1
        yStep = gridWidth
    };

    if(!directionRight && bombsList[0] % gridWidth == 0){
        directionRight = true
        xStep = 1
        yStep = gridWidth
    };

    for(let i = 0; i < bombsList.length; i++){
        bombsList[i] += xStep + yStep
    };

    drawBombs(bombsList)

    if(bombsList.length === bombRemoved.length){
        alert('Ви виграли')
        document.getElementById('main-el').classList.add('gamewin')
        clearInterval(gameLoopId)
    }

    if(bombsList[bombsList.length-1] > 210){
        alert('Ви програли')
        document.getElementById('main-el').classList.add('gameover')
        clearInterval(gameLoopId)
    }

};

let gameLoopId = setInterval(moveBombs, 500, bombs)

document.addEventListener('keydown',moveShooter);
document.addEventListener('keydown',shoot);
