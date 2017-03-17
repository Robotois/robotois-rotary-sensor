const RotarySensor = require('../index');

const rotary = new RotarySensor(2);

rotary.when(5, () => {
  /* eslint-disable no-console */
  console.log('Wow, la posicion es 5!!');
});

setInterval(() => {}, 10000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
