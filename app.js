//Globals Variables 
let playerChoice;
let computerChoice;
let winner;
let round = 0;
let playerScore = 0;
let computerScore = 0;
let bestOf;
let overallResultClass;
let overallResultText;
let character;
let choices = ["rock", "paper", "scissors"];


// Text  Globals Variables
let playerWinsText = "You win the round!";
let computerWinsText = "Computer wins the round!";
let tieText = "It's a Tie!";
let = overallPlayerWinText = "<h2>Well Done!</h2> <p>You won against the <b>computer.</b></p>";
let = overallComputerWinText = "<h2>You Lose...</h2> <p>The computer power is over <b>9000</b></p>";
let = overallTieText = "<h2>It's a draw!</h2> <p>Good effort computer has .</p>";


function nextScreen(div, section) {
    
    switch(section) {
    case 'start':
        // Hide Start Button
        div.style.display = 'none'
        div.nextElementSibling.classList.add("animate-in");
        break;
    case 'rounds':
        div = div.parentNode.parentNode.parentNode;
        div.style.display = 'none'
        div.nextElementSibling.classList.add("animate-in");
        break;
    case 'character':
        div = div.parentNode.parentNode.parentNode;
        div.style.display = 'none'
        div.nextElementSibling.classList.add("animate-in");
        break;
    default:
        // code block
    }
    
    div.style.display = 'none'
    div.nextElementSibling.classList.add("animate-in");
  }

  

// Start Function
  document.querySelector(".start").addEventListener("click", function (e) {
    e.preventDefault();
    nextScreen(this, 'start');
  });

// How many rounds would you play  
let howManyRounds = document.querySelectorAll(".choose-rounds li");
howManyRounds.forEach(liRound => {
    liRound.addEventListener("click", function (e){
        e.preventDefault();
        setBestOf(this);
        nextScreen(this, 'rounds');
    });
})


 // Set the total number of rounds
function setBestOf(selectedRounds) {
        
    let endScreenRounds;
    bestOf = selectedRounds.dataset.rounds;
    document.querySelector(".best-of").innerText = bestOf;
}  



    // Set what character is chosen and start the game
    function setCharacter(div, className) {
        character = div.dataset.character;
        document.querySelector(className).classList.add(character);
      }


    let chooseCharacter  = document.querySelectorAll(".choose-character li");
chooseCharacter.forEach(character => {
    character.addEventListener("click", function (e){
        e.preventDefault();
        setCharacter(this, ".player-character");
        nextScreen(this, 'character');
    });
});


      // Set what character is chosen and start the game
    let chooseRival  = document.querySelectorAll(".choose-rival li");
    chooseRival.forEach(rival => {
        rival.addEventListener("click", function(e) {
            e.preventDefault();
            setCharacter(this, ".computer-character");
            document.querySelector("body").classList.add('game-started');
        });
    });


    function decideWinner(playerChoice, computerChoice) {
        let resultClass;
  
        // Lose or Win logic
        if (playerChoice === computerChoice) {
          // If there is a tie
          winner = tieText;
          resultClass = "tie";
        } 
        
        // Player "Rock"
        else if (playerChoice === "rock") {
          
          switch (computerChoice) {
            case "scissors":
              winner = playerWinsText;
              playerScore++;
              resultClass = "win";
              break;
            case "paper":
              winner = computerWinsText;
              computerScore++;
              resultClass = "lose";
              break;
          }
          // Player "Paper"
        } else if (playerChoice === "paper") {
          
          switch (computerChoice) {
            case "rock":
              winner = playerWinsText;
              playerScore++;
              resultClass = "win";
              break;
            case "scissors":
              winner = computerWinsText;
              computerScore++;
              resultClass = "lose";
              break;
          }
        } else {
          // Player "Scissors"
          switch (computerChoice) {
            case "rock":
              winner = computerWinsText;
              computerScore++;
              resultClass = "lose";
              break;
            case "paper":
              winner = playerWinsText;
              playerScore++;
              resultClass = "win";
              break;
          }
        }
  
        // Set the class of the result screen
        document.querySelector(".result").setAttribute("class", "result " + resultClass);
  
        return winner;
      }


    // Play the game
    let  weaponPick  = document.querySelectorAll(".weapon li");
    weaponPick.forEach( game => {
        game.addEventListener("click", function(e){
            e.preventDefault();
            playerChoice = this.dataset.weapon;
            document.querySelector('body').classList.add("weapon-chosen");
            playGame(playerChoice);
            if (round > bestOf) {
                endGame();
            }            

        });
    });

    // Decides on whether the computer is playing rock, paper or scissors
    function computerDecision() {
        var randomChoice = Math.floor(Math.random() * choices.length);
        return choices[randomChoice];
    }

    // Sets all the values on the board
    function setValues(playerChoice, computerChoice, winnerText) {
        document.querySelector(".player-choice").innerText = playerChoice; 
        document.querySelector(".computer-choice").innerText = computerChoice; 
        document.querySelector(".winner").innerText = winnerText; 
      
            // If the game has been reset set the score immediately
            if (round !== 1) {
              // Set the values once the animation has finished
              setTimeout(function () {
                setScore();
              }, 4000);
            } else {
              // Set the values immediately
              setScore();
              document.querySelector(".round").innerHTML = round;
            }
          }

    // Set the scores inner Text desktop
    function setScore() {
        document.querySelector(".player-score").innerText = playerScore; 
        document.querySelector(".computer-score").innerText = computerScore; 
    }

    // Play the next round
    document.querySelector(".play-again").addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector("body").classList.remove("weapon-chosen");
            document.querySelector(".round").innerText = round; 
          });

    // Plays the game function 
    function playGame(playerChoice) {
        computerChoice = computerDecision();
        round++;  
        winner = decideWinner(playerChoice, computerChoice);

        setValues(playerChoice, computerChoice, winner);

        // Icons added for each round
        document.querySelector(".player-choice-icon").setAttribute( "class", "player-choice-icon " + playerChoice);
        document.querySelector(".computer-choice-icon").setAttribute("class","computer-choice-icon " + computerChoice);
    }


    // Decide on who is the winner of the whole game
    function overallWinner() {
        if (playerScore > computerScore) {
            // Player wins
         overallResultText = overallPlayerWinText;
         overallResultClass = "win";
        } else if (playerScore < computerScore) {
            // Computer wins
          overallResultText = overallComputerWinText;
          overallResultClass = "lose";
            } else {
            // Tie
          overallResultText = overallTieText;
          overallResultClass = "tie";
            }
      
        document.querySelector(".end-result").innerHTML = overallResultText;
        document.querySelector(".end-screen").setAttribute("class", "end-screen " + overallResultClass);
    }


    // Reset the game from the beginning
    document.querySelector(".reset").addEventListener("click", function (e) {
            e.preventDefault();
            resetGame();
          });


   // Endgame function for the game
    function endGame() {
        document.querySelector("body").classList.add("end-game");
            document.querySelector(".play-again").style.display = 'none'
      
            overallWinner();
    }

    // Reset the game 
    function resetGame() {
        playerChoice = "";
        computerChoice = "";
        winner = "";
        round = 1;
        playerScore = 0;
        computerScore = 0;
      
       setValues();
        document.querySelector("body").classList.remove("end-game", "weapon-chosen");
        document.querySelector(".play-again").style.display = 'block';
    }

    // Reset the game 
      let resetRound  = document.querySelectorAll(".rounds-end-screen li");
      resetRound.forEach( resetButton => {
        resetButton.addEventListener("click", function(e){
            e.preventDefault();
            setBestOf(this);
            resetGame();
        });
      });