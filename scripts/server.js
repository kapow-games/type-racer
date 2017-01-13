var game = {};

var passages = [
  "A quick brown fox jumps over the lazy dog.",
  "He felt that his whole life was some kind of dream and he sometimes wondered whose it was and whether they were enjoying it.",
  "For a moment, nothing happened. Then, after a second or so, nothing continued to happen."
]

sendState = function(value) {
  kapow.sendData({
    'type': 'update',
    'text': value
  });
}

postVictory = function() {
  kapow.sendData({
    'type': 'victory'
  });
}

getText = function(roomId) {
  console.log("Getting text for: ", roomId)
  return passages[Math.abs(hashCode(roomId) % passages.length)];
}

// Source: http://stackoverflow.com/a/15710692/1069405
var hashCode = function(s) {
  return s.split("").reduce(function(a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a
  }, 0);
}
