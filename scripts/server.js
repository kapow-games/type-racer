var game = {};

var passages = [
  "A quick brown fox jumps over the lazy dog.",
  "He felt that his whole life was some kind of dream and he sometimes wondered whose it was and whether they were enjoying it.",
  "For a moment, nothing happened. Then, after a second or so, nothing continued to happen."
]

game.sendState = function(value) {
  kapow.sendData({
    'type': 'update',
    'text': value
  }, kapow.getPlayerId(), kapow.getRoomInfo().roomId, function() {
    kapow.return({
      'result': 'success'
    });
  });
}

game.postVictory = function(ranks) {
  kapow.endGame(ranks, kapow.getRoomInfo().roomId, function() {
    kapow.return("success");
  }, function(error) {
    kapow.return(null, error);
  });
}

getToken = function() {
  return '91t4ty47t91taxxxayy43x94133t5tx3';
}

game.getText = function(room) {
  console.log("Getting text for: ", room.roomId)
  kapow.return({
    'text': passages[Math.abs(hashCode(room.roomId) % passages.length)]
  });
}

// Source: http://stackoverflow.com/a/15710692/1069405
var hashCode = function(s) {
  return s.split("").reduce(function(a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a
  }, 0);
}
