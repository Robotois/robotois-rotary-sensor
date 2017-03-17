const RotarySensor = require('../index');

const rotary = new RotarySensor(2);

setInterval(() => { // Proceso en estado ocioso
  /* eslint-disable no-console */
  console.log(`BasicValue: ${rotary.getBasicValue()}`);
  /* eslint-disable no-console */
  console.log(`BasicScaledValue: ${rotary.getBasicScaledValue()}`);
}, 100);

setInterval(() => {}, 10000);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
