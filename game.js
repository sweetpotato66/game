var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelStart = false;
var level = 0;

$(document).keypress(function() {
  if (!levelStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    levelStart = true;
  }
});

$(".myButton").on("click", function(){
  $("#level-title").text("Level " + level);
  nextSequence();
  levelStart = true;
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      console.log("Success");
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    var wrongAudio = new Audio('sounds/wrong.mp3');
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("TANGA MO. Press any Key or the Button to Restart");
    startOver();
  }
}

function nextSequence() {
  $(".myButton").hide();
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  $(".myButton").show().text("RETRY");
  level = 0;
  gamePattern = [];
  levelStart = false;
}
