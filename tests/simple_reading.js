const RotarySensor = require('../index');

const rotary = new RotarySensor(2);

setInterval(() => {
  /* eslint-disable no-console */
  // console.log(`Value: ${rotary.getValue().toFixed(3)}`);
  // console.log(`BasicValue: ${rotary.getBasicValue().toFixed(3)}`);
  console.log(`ScaledValue: ${rotary.getScaledValue()}`);
}, 250);

process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
