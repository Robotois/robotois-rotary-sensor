const RotarySensor = require('../index');

const rotary = new RotarySensor(2);

rotary.enableEvents();

rotary.on('medicion', (value) => {
  /* eslint-disable no-console */
  console.log(`Posicion: ${value}`);
});

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
