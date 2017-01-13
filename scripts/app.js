var user = {};
var room = {};
var opponent = {};
var acceptedPlayers = [];
var game = {};
var passage;
var enteredText = "";

$(function() {
  ui.showLoadingScreen();
});

/*
---------------------------------------------------------------------------------------
  Life cycle methods begin
  P.S: All game life cycle methods are expected to be defined inside the `game` object
---------------------------------------------------------------------------------------
*/

game.onLoad = function(room) {
  console.log("onLoad");
  if (room == null) {
    ui.showStartScreen();
  } else {
    onRoomCreated(room);
  }
};

game.onPlayerJoined = function(player) {
  console.log("Player joined: ", player);
  acceptedPlayers.push(player);
  if (player.id != user.player.id) {
    $('#opponentName').text(player.name);
    opponent = player;
  }
  if (acceptedPlayers.length == 2) {
    startGame();
  } else {
    ui.showWaitingScreen();
  }
}

game.onDataReceived = function(data) {
  console.log("Data received: ", data);
  var d = JSON.parse(data.data);
  if (d.type == 'update') {
    $('#opponentText').text(d.text);
  } else if (d.type == 'victory') {
    alert("Sorry, you lost! :(");
  }
}
/*
---------------------------------
  Life cycle methods end
---------------------------------
*/

var onRoomCreated = function(createdRoom) {
  console.log("Created room: ", createdRoom);
  room = createdRoom;
  kapow.getUserInfo(function(usr) { // Fetch and store user information
    user = usr;
    setupPlayers();
  });
}

var setupPlayers = function() {
  for (playerIndex in room.players) {
    player = room.players[playerIndex];
    if (player.affiliation == "accepted") {
      game.onPlayerJoined(player);
    }
  }
}

/*
  Called onClick of the buttons to choose between friends and random players
*/
var playAgainst = function(opponentType) {
  if (opponentType == 'random') {
    kapow.startGameWithRandomPlayers(null, onRoomCreated, function() {
      alert('Error');
    });
  } else {
    kapow.startGameWithFriends(2, 2, onRoomCreated, function() {
      alert('Error');
    });
  }
}

/*
  Called when there are enough players in the room
*/
var startGame = function() {
  ui.showGameScreen();

  kapow.invokeRPC('getText', room.roomId, function(text) { // Fetch text from the server and set it on the screen
    passage = JSON.parse(text);
    console.log("Received text: ", passage);
    $('#content').text(passage);
  });

  addHandlerForTextBox();
}

/*
  Sets up a handler that's invoked each time the player types something in the textbox
*/
var addHandlerForTextBox = function() {
  $("#playerText").on('change keyup paste', function() {
    var currentValue = $(this).val();
    if (currentValue == enteredText) {
      return;
    }

    enteredText = currentValue;
    kapow.invokeRPC('sendState', enteredText); // Broadcast latest state
    colorText();

    if (enteredText == passage) {
      kapow.invokeRPC('postVictory');
      alert("Congratulations! You won!");
    }
  });
}

/*
  Color the correctly typed portion of text green
*/
var colorText = function() {
  var correct = "";
  var hasCorrectText = false;
  var index = 0;
  for (index = 0; index < enteredText.length; index++) {
    if (index >= passage.length) {
      break;
    }
    if (enteredText[index] == passage[index]) {
      hasCorrectText = true;
      correct += passage[index];
    } else {
      break;
    }
  }

  if (hasCorrectText) {
    var greenText = correct.fontcolor("green");
    var rest = passage.substr(index, passage.length);
    $('#content')[0].innerHTML = greenText + rest;
  } else {
    $('#content').text(passage);
  }
}
