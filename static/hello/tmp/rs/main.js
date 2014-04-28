define("./main.js",["./spinning"],function(require,exports,module,define){
  var Spinning = require('./spinning');

  var s = new Spinning('#container');
  s.render();


});