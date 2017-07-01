const Rotary = require('../../index');
const LCDModule = require('robotois-lcd-display');

const lcd = new LCDModule();
const rotary = new Rotary(1);
rotary.enableEvents();

rotary.on('medicion', (rotaryValue) => {
  lcd.displaySensor({ rotaryValue, text: 'Rotary:' });
  switch (true) {
    case (rotaryValue < 3):
      lcd.setBacklight(false);
      break;
    case (rotaryValue >= 5 && rotaryValue <= 7):
      lcd.blinkBacklight(true);
      break;
    default:
      lcd.setBacklight(true);
  }
});

/*
Practica simple, donde solo se muestra el valor actual del sensor de temperatura
en el display
 */
// rotary.on('medicion', (value) => {
//   lcd.displaySensor({ value, text: 'Rotary:' });
// });

/*
Practica con alarma en el LCD, en donde se muestra en el display el valor actual
del sensor y cuando se tiene un valor especifico se activa la alarma del LCD
 */
// rotary.equals(5,
//   (value) => {
//     lcd.displaySensor({ value, text: 'Rotary:' });
//     lcd.blinkBacklight(true);
//   },
//   (value) => {
//     lcd.displaySensor({ value, text: 'Rotary:' });
//     lcd.blinkBacklight(false);
//   }
// );

/*
Practica con alarma en el LCD, en donde se activa la alarma del LCD cuando el valor
de temperatura es mayor que el valor especificado
 */
// rotary.moreThan(5,
//   (value) => {
//     lcd.displaySensor({ value, text: 'Rotary:' });
//     lcd.blinkBacklight(true);
//   },
//   (value) => {
//     lcd.displaySensor({ value, text: 'Rotary:' });
//     lcd.blinkBacklight(false);
//   }
// );

/*
Practica con alarma en el LCD, en donde se activa la alarma del LCD cuando el valor
de temperatura se encuentra dentro del rango [min-max]
 */
// rotary.between(2, 4,
//   (value) => {
//     lcd.displaySensor({ value, text: 'Rotary:', unit: '' });
//     lcd.blinkBacklight(true);
//   },
//   (value) => {
//     lcd.displaySensor({ value, text: 'Rotary:', unit: '' });
//     lcd.blinkBacklight(false);
//   }
// );

/*
Finalizacion del proceso
 */
process.on('SIGTERM', () => {
  process.exit();
});

process.on('SIGINT', () => {
  process.exit();
});
