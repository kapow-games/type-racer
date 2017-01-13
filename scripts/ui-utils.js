var ui = {};

ui.showLoadingScreen = function() {
  $('#loadingScreen').show();
  $('#startScreen').hide();
  $('#waitingScreen').hide();
  $('#gameScreen').hide();
}

ui.showStartScreen = function() {
  $('#loadingScreen').hide();
  $('#startScreen').show();
  $('#waitingScreen').hide();
  $('#gameScreen').hide();
}

ui.showPlayerSelectScreen = function() {
  $('#loadingScreen').hide();
  $('#startScreen').hide();
  $('#waitingScreen').hide();
  $('#gameScreen').hide();
}

ui.showWaitingScreen = function() {
  $('#loadingScreen').hide();
  $('#startScreen').hide();
  $('#waitingScreen').show();
  $('#gameScreen').hide();
}

ui.showGameScreen = function() {
  $('#loadingScreen').hide();
  $('#startScreen').hide();
  $('#waitingScreen').hide();
  $('#gameScreen').show();
}
