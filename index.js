const RSensor = require('bindings')('RotarySensor');
const EventEmitter = require('events').EventEmitter;
const inherits = require('util').inherits;

/**
 * Creates an instance of RotarySensor.
 * @param {int} port The port number where this component us connected.
 * @param {int} add The second argument.
 * @returns {RotarySensor} RotarySensor object.
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
  return this.rotary.getBasicValue();
};

RotarySensor.prototype.getScaledValue = function getScaledValue() {
  return this.rotary.getScaledValue();
};

RotarySensor.prototype.enableEvents = function enableEvents() {
  if (!this.eventInterval) {
    let scaledValue;
    this.eventInterval = setInterval(() => {
      scaledValue = this.rotary.getScaledValue();
      this.emit('medicion', scaledValue);
    }, 250); // Tomar mediciones cada 100ms
  }
};

RotarySensor.prototype.when = function when(value, callback) {
  this.enableEvents();
  this.on('medicion', (rotaryValue) => {
    console.log(`Posicion: ${rotaryValue}`);
    if (value == rotaryValue) {
      callback();
    }
  });
};

RotarySensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.rotary.release();
};

inherits(RotarySensor, EventEmitter);

module.exports = RotarySensor;
