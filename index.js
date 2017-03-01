const RSensor = require('bindings')('RotarySensor');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;

/**
 * Creates an instance of temperature.
 * @param {int} port The port number where this component us connected.
 * @param {int} add The second argument.
 * @returns {int} The sum of the two numbers.
 */
function RotarySensor(port, add = 0) {
  const self = this;
  EventEmitter.call(this);

  this.rotary = new RSensor(port, add);

  process.on('SIGINT', () => {
    self.rotary.release();
  });

  process.on('SIGTERM', () => {
    self.rotary.release();
  });
}

RotarySensor.prototype.getValue = function getValue() {
  return this.rotary.getValue();
};

RotarySensor.prototype.getBasicValue = function getBasicValue() {
  const value = Math.round(this.rotary.getValue() * 100) / 100;
  return value;
};

RotarySensor.prototype.getScaledValue = function getScaledValue() {
  return this.rotary.getScaledValue();
};

RotarySensor.prototype.getBasicScaledValue = function getBasicScaledValue() {
  return this.rotary.getBasicScaledValue();
};

RotarySensor.prototype.enableEvents = function enableEvents() {
  const self = this;
  let scaledValue;
  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => {
      scaledValue = this.rotary.getBasicScaledValue();
      self.emit('medicion', scaledValue);
    }, 100); // Tomar mediciones cada 100ms
  }
};

RotarySensor.prototype.when = function when(value, callback) {
  if (!this.interval) {
    this.interval = setInterval(() => {
      /* eslint-disable no-console */
      console.log(`Rotatorio: ${this.rotary.getBasicScaledValue()}`);
      /* eslint-disable eqeqeq */
      if (this.rotary.getBasicScaledValue() == value) {
        callback();
      }
    }, 100); // Tomar mediciones cada 100ms
  }
};

RotarySensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  clearInterval(this.interval);
  this.rotary.release();
};

inherits(RotarySensor, EventEmitter);

module.exports = RotarySensor;
