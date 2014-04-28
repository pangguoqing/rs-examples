
if (document.attachEvent) {
  alert("这个例子不支持 Old IE 哦")
}


  var data = require('./data.json');
  var lucky = require('./lucky');

  lucky.init(data);


