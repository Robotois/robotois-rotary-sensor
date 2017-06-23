#include <cstdio>
#include <bcm2835.h>

#include "./libraries/robotois-ADS1015/ADS1015.h"
#include "./RotarySensor.h"
#include "./libraries/robotois-timer/AccurateTiming.h"

void i2c_init();
void i2c_end();

int main(int argc, char const *argv[]) {
  i2c_init();
  RotarySensor rotary;
  while (true) {
    rotary.selectPort(1);
    printf("getValue: %f, getBasicValue: %0.2f, getScaledValue: %d\n",
      rotary.getValue(),
      rotary.getBasicValue(),
      rotary.getScaledValue());
    mDelay(100);
  }
  i2c_end();
  return 0;
}

void i2c_init() {
  uint16_t clkDiv = BCM2835_I2C_CLOCK_DIVIDER_626;

  if(!bcm2835_init()){
    printf("BCM2835 Error!!!\n");
  }

  bcm2835_i2c_begin();

  bcm2835_i2c_setClockDivider(clkDiv);
}

void i2c_end() {
  bcm2835_i2c_end();
  bcm2835_close();
}