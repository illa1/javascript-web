console.log('start');
const canvas = document.getElementById('ghost');
const ctx = canvas.getContext('2d');
const cWidth = canvas.width;
const cHeight = canvas.height;
const imgFolder = 'images/';

const bgImg = new Image();
bgImg.src = imgFolder + 'map01_preview-01.png';

let gameFrame = 0

let mouse = {
    x: cWidth/2,
    y: cHeight/2
}

canvas.addEventListener('mousemove', function(event){
    console.log(event)
    let c = canvas.getBoundingClientRect()
    mouse.x = event.clientX - c.left
    mouse.y = event.clientY - c.top
    
})

class Player{
    constructor(x = 0, y = 0){
        this.x = x
        this.y = y

        this.heroImg = new Image()
        this.heroImg.src = imgFolder + 'idle_hero.png'
        this.heroMaxFrame = 17
        // left
        this.runLeftImg = new Image()
        this.runLeftImg.src = imgFolder + 'run_left.png'
        
        // right
        this.runRightImg = new Image()
        this.runRightImg.src = imgFolder + 'run_right.png'

        this.runMaxFrame = 8

        this.xFrame = 0
        this.sWidth = 43
        this.sHeight = 50
        this.takt = 7

    }
    stay(){
        // console.log(mouse)
        ctx.drawImage(
            this.heroImg,
            this.sWidth * this.xFrame,
            0,
            this.sWidth,
            this.sHeight,
            this.x,
            this.y,
            this.sWidth,
            this.sHeight,

        )
        if(gameFrame % this.takt === 0){
            if(this.xFrame >= this.heroMaxFrame-1){
                this.xFrame = 0
            } else{
                this.xFrame++
            }
        }
    }
    runLeft(){

    }
    runRight(){

    }
    update(){

    }
    move(){
        if(this.x < mouse.x){
            this.runRight()
        } else if (this.x > mouse.x){
            this.runLeft()
        }else {
            this.stay()
        }

    }
}
class Ghost{

}

let player = new Player(cWidth / 2, cHeight / 2)
let ghost = new Ghost()

function start() {
    // console.log(gameFrame)
    ctx.clearRect(0, 0, cWidth, cHeight)
    ctx.drawImage(bgImg, 0, 0, cWidth, cHeight)
    
    player.update()
    player.move()

    gameFrame ++
    requestAnimationFrame(start)
}

// setInterval(start, 100)

start()