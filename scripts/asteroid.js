var spaceShip;


const genNumOfAsteroids = 3
const initNumOfAsteroids = 5
const asteroidGenInterval = 5000
const maxSpeed = 1.5
const minSpeed = 0
const maxSize = 110
const minSize = 60

// kolekcija kodova nijansi sive boje koji se koriste za asteroide
const grays = ['#808080', '#3B3B3B', '#979797', '#525252'];

//polje koje čuva asteroide kako bi se provjerila kolizija
var asteroids = []

// objekt koji predstavlja platno na kojem se odvija igra
var gameCanvas = {
    canvas : document.createElement("canvas"),

    //funkcija koja se koristi za inicijalizaciju platna
    start : function() {

        //postavi promatrača na pritisak tipke i funkciju koja obrađuje taj događaj
        document.addEventListener('keydown', moveSpaceShip) 
        this.canvas.id = "gameCanvas";
        this.context = this.canvas.getContext("2d");
        this.canvas.width = innerWidth
        this.canvas.height = innerHeight
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        //postavlja funkciju generiranja asteroida da se automatski izvodi u pravilnim intervalima
        this.interval = setInterval(generateAsteroids, asteroidGenInterval)
        
    },
  
    //funkcija čišćenja platna
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//funkcija za koja se izvodi pri učitavanju HTML dokumenta
function load() {
    
    //postavi vrijeme početka igre u Local Storage
    localStorage.setItem('startTime', Date.now())

    //init platno
    gameCanvas.start()

    ctx = gameCanvas.canvas.getContext('2d')
    const x = gameCanvas.canvas.width / 2
    const y = gameCanvas.canvas.height / 2

    //stvori objekt svemirskog broda
    spaceShip = new spaceShip(x, y, "red", 60, 60, 'spaceShip');

    //generiraj inicijalni broj asteroida
    generateAsteroids(initNumOfAsteroids)

    //pokreni animaciju
    updateGameCanvas()

}


//funkcija koja služi za stvaranje Asteroid objekta
function Asteroid(x, y, width, height, speed_x, speed_y) {
        this.width = width;
        this.height = height;
        
        this.speed_x = speed_x;
        this.speed_y = speed_y;
        this.x = x;
        this.y = y;
        this.initX = x;
        this.initY = y;
        this.color = grays[Math.ceil(Math.random() * (grays.length - 1))]


        //crta objekt
        this.drawAsteroid = () => {
            // console.log('drawing asteroid')
            ctx = gameCanvas.canvas.getContext('2d');
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'black';
            ctx.fillRect(this.x - this.width / 2,
                this.y - this.height / 2,
                this.width,
                this.height
            );
            
        };

        //pomiče koordinate objekta gdje se treba iscrtati
        this.move = () => {
            this.x += speed_x;
            this.y += speed_y;
        };

       
    
}


//funkcija koja služi za stvaranje objekta svemirskog broda
function spaceShip(x, y, color, width, height, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color
    this.speed_x = 10;
    this.speed_y = 10;
    this.x = x;
    this.y = y; 


    //pomiče brod prema gore, mijenja y koordinatu u negativnom smijeru
    this.moveUp = function(){
        this.y = this.y - this.speed_y
        // console.log(this.y)
        if(this.y < 0 || this.y == NaN){
            this.y = gameCanvas.canvas.height + this.height + 2
        }
        // updateGameCanvas()

    }

    //pomiče brod prema dolje, mijenja y u pozitivnom smijeru
    this.moveDown = function(){

        this.y = this.y + this.speed_y
        if(this.y > gameCanvas.canvas.height || this.y == NaN){
            this.y = this.height + 2
        }
        // console.log(this.y)

        // updateGameCanvas()

    }

    //pomiče brod ulijevo, mijenja x u negativnom smijeru
    this.moveLeft = function(){
        

        this.x = this.x - this.speed_x
        if(this.x < 0 || this.x == NaN){
            this.x = gameCanvas.canvas.width - this.width - 2
        }
        // console.log(this.x)

        // updateGameCanvas()

    }

     //pomiče brod udesno, mijenja x u pozitivnom smijeru
    this.moveRight = function(){
        this.x = this.x + this.speed_x
        if(this.x > gameCanvas.canvas.width || this.x == NaN){
            this.x = 0 + this.width
        }

        // updateGameCanvas()
    }

    //crta objekt na platnu
    this.draw = () => {
        // console.log('drawing spaceship')
        ctx = gameCanvas.canvas.getContext('2d')
        ctx.fillStyle = this.color
        ctx.fillRect(this.x - this.width / 2, 
                this.y - this.height / 2, 
                this.width, 
                this.height
        )
    }
}


//funckija koja obrađuje događaj pritiska tipke (eventListener)
function moveSpaceShip(event){
    // console.log(event.key)
    switch (event.key){
        case "ArrowDown":
            spaceShip.moveDown()
            break;
        case "ArrowUp":
            spaceShip.moveUp()
            break;
        case "ArrowLeft":
            spaceShip.moveLeft()
            break;
        case "ArrowRight":
            spaceShip.moveRight()
            break;
    }   
}


/*
    funkcija koja generira N asteroida
    u for petlji nasumično generiar dimenziju asteroida, koordite izvan platna i brzinu
    i postavlja ih u listu asteroida
*/
function generateAsteroids(n = genNumOfAsteroids){
    // console.log('generate asteroid called')
    for(var i = 0; i < n; i++){

        
        var dimension = Math.ceil(Math.random() * (maxSize + 1 - minSize) + minSize)

        const maxX = gameCanvas.canvas.width + dimension
        const minX = -dimension


        var x = Math.ceil(Math.random() * (maxX - minX) + minX) 
        // var y = Math.ceil(Math.random() * 2) % 2 == 0 ?  -dimension: gameCanvas.canvas.height  + dimension 
        
        var y = Math.ceil(Math.random() * 2) % 2 == 0 ?  -dimension: gameCanvas.canvas.height  + dimension

        if(x === minX || x == maxX ){

            const maxY = gameCanvas.canvas.height + dimension
            const minY = -dimension
            y = Math.ceil(Math.random() * (maxY - minY) + minY) 
        }
       
        

        var speed_y = Math.random() * (maxSpeed - minSpeed) + minSpeed
        var speed_x = Math.random() * (maxSpeed - minSpeed) + minSpeed
        if(x > 0){
            speed_x = speed_x * -1
        }

        if(y > 0){
            speed_y = speed_y * -1
        }
        

        // console.log(`Asteroid (x, y, dimension, speedX, speedY) (${x}, ${y}, ${dimension}, ${speed_x}, ${speed_y})`)
        
        //stvaranje objekta asteroida
        const asteroid = new Asteroid(x , y, dimension, dimension, speed_x, speed_y)
        asteroids.push(asteroid)
    }
}



/*
    funkcija koja crta trenutno vrijeme koje je igrač preživio i najbolje vrijeme ako ono postoji u local storage
    iz local storagea se uzima vrijeme početka igre i računa se razlika tog vremena i trenutka kada je funkcija 
    pozvana kako bi se dobilo vrijeme koje je igrač preživio

    dohvaća se i najbolje vrijeme iz local storagea

    vremena su u milisekundama pa je potrebno parsirati u format MM:SS.msmsms

    na kraju se vrijeme iscrtava na platnu

*/
function drawTime(){

    //uzimanje sadašnjeg trenutka
    var time = new Date().getTime()
    var start = parseInt(localStorage.getItem('startTime'))


    // console.log(time)
    // console.log(start)

    const runningMilis = time - parseInt(start)
    var bestTime = localStorage.getItem('bestTime')



    
    
    var millis = runningMilis
    var minutes = parseInt( millis / 60000 ); 
    // console.log(minutes)
    millis = millis % 60000;

    var seconds = parseInt(millis / 1000)
    millis = millis % 1000

    if(millis < 10) millis = '0' + millis
    if(seconds < 10) seconds = '0' + seconds
    if(minutes < 10) minutes = '0' + minutes
    const timeRunning = 'Vrijeme: ' + minutes + ':' + seconds + '.' + millis

    var bestTimeFormatted = 'Najbolje vrijeme: '
    
    if(bestTime !== null) {
        // console.log(bestTime)
        var millis = parseInt(bestTime)
        var minutes = parseInt( millis / 60000 ); 
        millis = millis % 60000;

        var seconds = parseInt(millis / 1000)
        millis = millis % 1000

    
        if(millis < 10) millis = '0' + millis
        if(seconds < 10) seconds = '0' + seconds
        if(minutes < 10) minutes = '0' + minutes
        bestTimeFormatted += minutes + ':' + seconds + '.' + millis
    } 

    

    var ctx = gameCanvas.canvas.getContext('2d')
    ctx.shadowBlur = 0
    var color = ctx.fillStyle
    ctx.fillStyle = '#000000'
    ctx.font = '40px Arieal'


    // računa početak teksta s obzirom na to koji je duži kako bi bili poravnati
    const x = Math.max(ctx.measureText(timeRunning).width, ctx.measureText(bestTimeFormatted).width)

    ctx.fillText(
            bestTimeFormatted, 
            gameCanvas.canvas.width - x - 40,
            ctx.measureText(bestTimeFormatted).actualBoundingBoxAscent +  ctx.measureText(bestTimeFormatted).actualBoundingBoxDescent
        )

        ctx.fillText(
            timeRunning, 
            gameCanvas.canvas.width - x - 40,
            ctx.measureText(bestTimeFormatted).actualBoundingBoxAscent +  
            ctx.measureText(bestTimeFormatted).actualBoundingBoxDescent + 
            ctx.measureText(bestTimeFormatted).actualBoundingBoxAscent +  
            ctx.measureText(bestTimeFormatted).actualBoundingBoxDescent
        )
    ctx.fillStyle = color
    ctx.shadowBlur = 20



}



/*
    funkcija ispituje koliziju svih asteroida i svemirskog broda

*/
function checkCollision(){


    for(var asteroid of asteroids){
        // console.log(asteroid.x)
       
        
        var rightSideIfShip = spaceShip.x + spaceShip.width
        var bottomOfShip = spaceShip.y + spaceShip.height

        var asteroidRightSide = asteroid.x + asteroid.width
        var bottomOfAsteroid = asteroid.y + asteroid.height


       

        if
        (
            rightSideIfShip >= asteroid.x &&
            spaceShip.x <= asteroidRightSide && 
            spaceShip.y <= bottomOfAsteroid && 
            bottomOfShip >= asteroid.y
        ) {
            console.log(
                `
                    ${rightSideIfShip} >= ${asteroid.x} = ${ rightSideIfShip >= asteroid.x}\n
                    ${spaceShip.x} <= ${asteroidRightSide} = ${ spaceShip.x <= asteroidRightSide}\n
                    ${spaceShip.y} <= ${bottomOfAsteroid} = ${spaceShip.y <= bottomOfAsteroid}\n
                    ${bottomOfShip} >= ${asteroid.y} = ${ bottomOfShip >= asteroid.y}\n
                `
            )

            return true
        }

   
    }

    return false
}


/*
    funkcija koja se konstantno poziva kako bi se iscrtavala animacija igre
*/
function updateGameCanvas() {


  //očisti platno  
  gameCanvas.clear();

    //iscrtaj brod i asteroide
    spaceShip.draw()
    for(var asteroid of asteroids){

        //pomakni asteroid
        asteroid.move()
        //nacrtaj asteroid
        asteroid.drawAsteroid()   
    }


    //provjeri koliziju
    if(!checkCollision()){
        //ako nema kolizije nastavi iscrtavati animaciju
        requestAnimationFrame(updateGameCanvas)
    } else {

        //izračunaj vrijeme i usporedi ga s najboljim i eventualno postavi u local storage
        var now = new Date().getTime()
        var start = parseInt(localStorage.getItem('startTime'))
        var running = now - start

        var best = localStorage.getItem('bestTime')
       if(best == null || (best != null && running > parseInt(best))) best = running

        localStorage.setItem('bestTime', best)
        // gameCanvas.clear()
        // spaceShip.draw()
        // for(var asteroid of asteroids){
        //     asteroid.drawAsteroid()   
        // }

        console.log('Collision, game ending')
        
    }
    //iscrtaj vrijeme
    drawTime()

}

 
