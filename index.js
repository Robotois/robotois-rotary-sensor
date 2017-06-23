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
    // let scaledValue;
    this.eventInterval = setInterval(() => {
      // scaledValue = this.rotary.getScaledValue();
      this.emit('medicion', this.rotary.getScaledValue());
    }, 250); // Tomar mediciones cada 333ms
  }
};

RotarySensor.prototype.equals = function equals(value, onTrue, onFalse) {
  this.on('medicion', (rotaryValue) => {
    if (rotaryValue == value) {
      onTrue(rotaryValue);
    } else {
      onFalse(rotaryValue);
    }
  })
};

RotarySensor.prototype.lessThan = function lessThan(value, onTrue, onFalse) {
  this.on('medicion', (rotaryValue) => {
    if (rotaryValue < value) {
      onTrue(rotaryValue);
    } else {
      onFalse(rotaryValue);
    }
  })
};

RotarySensor.prototype.moreThan = function moreThan(value, onTrue, onFalse) {
  this.on('medicion', (rotaryValue) => {
    if (rotaryValue > value) {
      onTrue(rotaryValue);
    } else {
      onFalse(rotaryValue);
    }
  })
};

RotarySensor.prototype.between = function between(min, max, onTrue, onFalse) {
  this.on('medicion', (rotaryValue) => {
    if (rotaryValue >= min && rotaryValue <= max) {
      onTrue(rotaryValue);
    } else {
      onFalse(rotaryValue);
    }
  })
};

RotarySensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.rotary.release();
};

inherits(RotarySensor, EventEmitter);

module.exports = RotarySensor;
