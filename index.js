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
  this.prevValue = -1;

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

RotarySensor.prototype.publishNow = function publishNow() {
  this.mqttClient.publish(this.myTopic, this.rotary.getScaledValue().toString());
};

RotarySensor.prototype.enableEvents = function enableEvents(mqttConfig) {
  if (mqttConfig) {
    this.mqttClient = mqttConfig.mqttClient;
    this.myTopic = `sensors/rotary${mqttConfig.instance}`;
    this.mqttClient.publish('registerTopic', this.myTopic);
  }
  if (!this.eventInterval) {
    this.eventInterval = setInterval(() => {
      const currentValue = this.rotary.getScaledValue();
      this.emit('medicion', currentValue);
      if (this.prevValue !== currentValue && this.mqttClient) {
        this.mqttClient.publish(this.myTopic, currentValue.toString());
        this.prevValue = currentValue;
      }
    }, 100);
  }
};

RotarySensor.prototype.release = function release() {
  clearInterval(this.eventInterval);
  this.rotary.release();
};

inherits(RotarySensor, EventEmitter);

module.exports = RotarySensor;
