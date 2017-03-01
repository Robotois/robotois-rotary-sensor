var _rotary = require('../index'),
  rotary = new _rotary(2);
rotary.enableEvents();

rotary.on('medicion',function(value){
  console.log("Posicion: "+value);
});

setInterval(()=>{ // Proceso en estado ocioso
  true;
},10000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
