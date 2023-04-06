

const moves = document.getElementById('moves-count')
const timeValue = document.getElementById('time')
const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const gamecontainer = document.querySelector('.game-container')
const controls = document.querySelector('.controls-container')
const result = document.getElementById('result')
const Wrapper = document.querySelector('.wrapper')

let interval;
let firstcard = false;
let secondcard = false;
let firstcardValue;


// item array

const item =[
    { name: 'item1', image: 'image/1.png' },
    { name: 'item2', image: 'image/2.png' },
    { name: 'item3', image: 'image/3.png' },
    { name: 'item4', image: 'image/4.png' },
    { name: 'item5', image: 'image/5.png' },
    { name: 'item6', image: 'image/6.png' },
    { name: 'item7', image: 'image/7.png' },
    { name: 'item8', image: 'image/14.png' },
    { name: 'item9', image: 'image/9.png' },
    { name: 'item10', image: 'image/10.png' },
    { name: 'item11', image: 'image/11.png' },
    { name: 'item12', image: 'image/12.png' }
]




// Inital time
let seconds = 0,
    minutes = 0
 

// inital move and win count

let movescount = 0,
    wincount = 0


// 

const timegenerator =()=>{
    seconds += 1
    // minutes logica
    if(seconds >= 60 ){
        minutes += 1
        seconds = 0
    }
    
    // format time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesvalue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>TIME:</span>${minutesvalue}: ${secondsValue}`
};

const movesCounter = ()=>{
    movescount += 1
    moves.innerHTML = `<span>Փորզ:</span>${movescount} `
};


// pick random objects from items array

const genereteRandom = (size = 4)=>{
// temporary array
    const tempAray = [...item]
    //initalizes card Value
    const cardsvaule = []
    //  size shuld be duble sice pairs of objects fould exist
    size  = (size * size) / 2
    for(let i = 0; i<size; i++){
        const randomIndex = Math.floor(Math.random() * tempAray.length)
        cardsvaule.push(tempAray[randomIndex])

        //once selected remove the object from temp array

        tempAray.splice(randomIndex, 1)
       
    }
    return cardsvaule

};


const matrixgenerator = (cardsValue, size = 4)=>{
  gamecontainer.innerHTML = ''
  cardsValue = [...cardsValue, ...cardsValue]
    
        // simple shufle
    cardsValue.sort(()=> Math.random() - 0.5)

    for(let i = 0; i<size*size;i++){
        /** create Cards 
        before => front side (contains question mark
        after => back side contains actual image ;
        data-card values is a custom attribute which stores the names of the cards to match later  */
          gamecontainer.innerHTML += `
          <div class="card-container" data-card-value="${cardsValue[i].name}" >
          <div class="card-before" ><img src="image/crack.png"/></div>
          <div class="after" >
          <img src="${cardsValue[i].image}" alt="#" class="image" >
          </div>
          </div>
          `  
    }
    // Grid
    gamecontainer.style.gridTemplateColumns = `repeat(${size},auto)`
    

    cards =document.querySelectorAll('.card-container')
    cards.forEach(card =>{
        card.addEventListener('click', ()=>{
            if(!card.classList.contains('machted')){
                card.classList.add('flipped')

                if(!firstcard){
                    firstcard = card
                    firstcardValue = card.getAttribute('data-card-value') 
                } else{

                movesCounter()

                secondcard =  card

                let secondcardValues = card.getAttribute('data-card-value')
                if(firstcardValue == secondcardValues){
                // if both cards add matched class so these cards  would beignored next time 
                firstcard.classList.add('matched')
                secondcard.classList.add('matched')

                firstcard = false

                wincount += 1

                if(wincount == Math.floor(cardsValue.length / 2)){
                    result.innerHTML = `
                    <h2>you won</h2>
                    <h4>Movus ${movescount}</h4>
                    `
                    stopGame()
                }
                } else {
                    // flip the cards back to normal
                    let [tempFrist,tempSecond] = [firstcard, secondcard]
                    firstcard = false
                    secondcard = false
                    let delay  = setTimeout( ()=>{
                        tempFrist.classList.remove('flipped')
                        tempSecond.classList.remove('flipped')
                    }, 900)
                }
            }
            } 
           
        })
    })
};

// start Game

startButton.addEventListener('click', ()=>{
    Wrapper.classList.add('active')
    movescount = 0
    time = 0
    controls.classList.add('hide')
    stopButton.classList.remove('hide')
    startButton.classList.add('hide')

    interval = setInterval(timegenerator, 1000)

    moves.innerHTML = `<span>Փորձ: </span>${movescount} `;
    initalize()
});

// Stop Game  


stopButton.addEventListener('click', (stopGame = ()=>{
    Wrapper.classList.remove('active')
    controls.classList.remove('hide')
    stopButton.classList.add('hide')
    startButton.classList.remove('hide')
    clearInterval(interval)
}))


// initalize values and func calils

const initalize = ()=>{
    result.innerText = ''
    wincount = 0
    let cardvalues = genereteRandom()
    matrixgenerator(cardvalues)
}



