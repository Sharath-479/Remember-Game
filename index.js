var buttoncolor=["red", "blue", "green", "yellow"]
var gamePattern=[];
var userClickedPattern = [];
var level=0;
var count=0;

$(this).on('keypress', function(event) {
  if(event.key=" " && count===0){
    count=1;
    nextsequence();
    $(".heading").text("Level " + level);

  }
})
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
          nextsequence();
        }, 1000);
    }
  }
    else {
      var n="wrong";
      playSound(n);
      finish();
      $(".heading").text("Game Over, space Key to Restart");
      startover();
    }
}
function nextsequence(){
  userClickedPattern=[];
  level++;
  $(".heading").text("Level " + level);
   var randomnumber=Math.floor(Math.random()*4);
   var randomChosenColour= buttoncolor[randomnumber];
   gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}
function playSound(name){
  var audio = new Audio("music/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).toggleClass("pressed");
  setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
  },100);
}
function finish(){
  $("body").toggleClass("game-over");
  setTimeout(function(){
      $("body").removeClass("game-over");
  },200);
}
function startover(){
  level=0;
  gamePattern=[];
  count=0;
}
