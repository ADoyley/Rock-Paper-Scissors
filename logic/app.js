let userScore = 0;
let compScore = 0;

const winGame = () =>{
    userScore++;
    $("article > #user-score").text(userScore);
    $("article > #computer-score").text(compScore);
}

const loseGame = () =>{
    compScore++;
    $("article > #user-score").text(userScore);
    $("article > #computer-score").text(compScore);
}

const tieGame = () =>{
    userScore++;
    compScore++;
    $("article > #user-score").text(userScore);
    $("article > #computer-score").text(compScore);
    return -1;
}

//to help with preventing accidental double taps
const toggleButtons = (state) => {
    $(".selection button").prop("disabled", state);
};

const gameTime = (opt, compOpt) =>{
    if (opt == "r" && compOpt == 'p'){
        $("#result-msg").attr("display","block");
        $("#result-msg").hide().fadeIn(1000).text("Paper beats Rock. Computer wins!");
        loseGame();
    } else if (opt == "r" && compOpt == 's'){
        $("#result-msg").attr("display","block");
        $("#result-msg").hide().fadeIn(1000).text("Rock beats Scissors. You wins!");
        winGame();
    } else if (opt == "p" && compOpt == 's'){
        $("#result-msg").attr("display","block");
        $("#result-msg").hide().fadeIn(1000).text("Scissors beats Paper. Computer wins!");
        loseGame();
    } else if (opt == "p" && compOpt == 'r'){
        $("#result-msg").attr("display","block");
        $("#result-msg").hide().fadeIn(1000).text("Paper beats Rock. You wins!");
        winGame();
    } else if (opt == "s" && compOpt == 'r'){
        $("#result-msg").attr("display","block");
        $("#result-msg").hide().fadeIn(1000).text("Rock beats Scissors. Computer wins!");
        loseGame();
    }  else if (opt == "s" && compOpt == 'p'){
        $("#result-msg").attr("display","block");
        $("#result-msg").hide().fadeIn(1000).text("Scissors beats paper. You wins!");
        winGame();
    } else {
        $("#result-msg").attr("display","block");
        $("#result-msg").hide().fadeIn(1000).text("Its a tie!");
        tieGame();
        
    } 
}

const playRound = (userPick) => {
    const computerPick = compChoice();

    toggleButtons(true);

    // Hide previous result
    $("#result-msg").hide();

    //Add subtle vibration (mobile only)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    // Remove any previous animations (important for replay)
    $("#left").removeClass("shake-left");
    $("#right img").removeClass("shake-right");

    // 3-second delay before shake
    setTimeout(() => {
        $("#left").addClass("shake-left");
        $("#right img").addClass("shake-right");

        // Show result AFTER shaking finishes (0.5s * 3 = 1.5s)
        setTimeout(() => {
            gameTime(userPick, computerPick);

            // Clean up classes so it can re-trigger next round
            $("#left").removeClass("shake-left");
            $("#right img").removeClass("shake-right");

            toggleButtons(false);
        }, 1500);

    }, 0);
}

//To randomly generate an option for the computer
const compChoice = () =>{
    let pick = ['r', 'p', 's'];
    let randonNum = Math.floor(Math.random() * 3);

    return pick[randonNum];
}


$(document).ready(() =>{    
    $("#r").click(() => playRound('r'));
    $("#p").click(() => playRound('p'));
    $("#s").click(() => playRound('s')); 

    /*$("#r").click(() =>{
        gameTime('r', compChoice());
    });
    $("#p").click(() =>{
        gameTime('p', compChoice());
    });
    $("#s").click(() =>{
        gameTime('s', compChoice());
    });*/
});