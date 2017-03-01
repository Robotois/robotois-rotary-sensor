var _rotary = require('../index'),
  rotary = new _rotary(2);

rotary.when(5,()=>{
  console.log("Wow, la posicion es 5!!");
});

// setInterval(()=>{ // Proceso en estado ocioso
//   console.log("Temp: " + temp.getValue().toFixed(3));
//   console.log("Int: " + temp.getIntValue());
// },1000);

setInterval(()=>{ // Proceso en estado ocioso
  true;
},10000);

process.on('SIGTERM', function () {
  process.exit();
});

process.on('SIGINT', function () {
  process.exit();
});
