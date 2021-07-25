var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = -1;
var start = false;

$(".ins-set").slideUp();
$(".instructions").on("click",function()
{
    $(".ins-set").slideToggle();

});
$(document).on("keypress", function (event) {
    console.log(event.key);
    if (event.key === "a" && start === false) {
        nextSequence();
        start = true;
    }

});

$(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(150).fadeIn(150);
    playSound(randomChoosenColor);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        console.log("wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },500);
        $("#level-title").text("Game Over, Press 'A' Key to Restart");
        startOver();
    }
}

function playSound(colorName) {
    var buttonSound = new Audio('sounds/' + colorName + '.mp3');
    buttonSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = -1;
    gamePattern = [];
    start = false;
  }
  

