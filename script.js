let isAutoplaying = false;
let intervalId;
function autoPlay() {
 if(!isAutoplaying){
        intervalId = setInterval(function(){
        const playerMove = pickComputermove();
        playGame(playerMove);
    },1000);
    isAutoplaying = true;
   } else{
    if(isAutoplaying){
        clearInterval(intervalId);
    }
    isAutoplaying = false;
}
}
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('Rock');
    }
    else if (event.key === 'p') {
        playGame('Paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
    else if (event.key === 'Enter') {
        autoPlay();
    }
    else if (event.key === 'Backspace') {
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScore();
    }
});




let score = JSON.parse(localStorage.getItem('score'));
if(score===null){
    score={
        wins:0,
        losses:0,
        ties:0
    }
}
updateScore();




function playGame(playerMove) {
    let result = '';
    const computer = pickComputermove();

    if (playerMove === 'scissors') {
        if (computer === 'Rock') {
            result = 'You lose';
        }
        else if (computer === 'Paper') {
            result = 'You Won';
        }
        else if (computer === 'scissors') {
            result = 'Match Tie';
        }
    }

    else if (playerMove === 'Paper') {
        if (computer === 'Rock') {
            result = 'You Won';
        }
        else if (computer === 'Paper') {
            result = 'Match Tie';
        }
        else if (computer === 'scissors') {
            result = 'You lose';
        }
    }

    else if (playerMove === 'Rock') {

        if (computer === 'Rock') {
            result = 'Match Tie';
        }
        else if (computer === 'Paper') {
            result = 'You lose';
        }
        else if (computer === 'scissors') {
            result = 'You Won';
        }
    }

    if (result === 'You Won') {
        score.wins += 1;
    }
    else if (result === 'You lose') {
        score.losses += 1;
    }
    else if (result === 'Match Tie') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    
    document.querySelector(".result").innerHTML=`${result}`;
    document.querySelector(".moves").innerHTML=`You 
    <img src="images/${playerMove}.webp" alt="" class="icon"> 
<img src="images/${computer}.webp" alt="" class="icon">
Computer`;
    updateScore();

   // alert(`You Picked ${playerMove}.Computer picked ${computer}.${result}.
//Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);

}
  function updateScore() {
    document.querySelector(".Score-board").innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
  }

function pickComputermove() {
    const randomNumber = Math.random();

    let computer = '';
    if (randomNumber >= 0 && randomNumber <= 1 / 3) {
        computer = 'Rock';
    }
    else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
        computer = 'Paper';
    }
    else if (randomNumber > 2 / 3 && randomNumber <= 1) {
        computer = 'scissors';
    }
    return computer;
}