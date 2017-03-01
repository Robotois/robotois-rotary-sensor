var _rotary = require('../index'),
  rotary = new _rotary(2);

setInterval(()=>{ // Proceso en estado ocioso
  console.log("BasicValue: " + rotary.getBasicValue());
  console.log("BasicScaledValue: " + rotary.getBasicScaledValue());
},100);

setInterval(()=>{ // Proceso en estado ocioso
  true;
},10000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
