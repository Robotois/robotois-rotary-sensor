const Rotary = require('../../index');
const LEDModule = require('robotois-led');

const led = new LEDModule(5);
const rotary = new Rotary(1);
rotary.enableEvents();

/*
Practica con alarma de LED usando 'equals', en donde se enciende el LED cuando el sensor
rotatorio devuelve un valor especifico
 */
rotary.equals(5,
  () => {
    led.turnOn();
  },
  () => {
    led.turnOff();
  }
);

/*
Practica con alarma de LED usando 'equals', en donde se hace parpadear el LED cuando el sensor
rotatorio devuelve un valor especifico
 */
// rotary.equals(5,
//   () => {
//     led.blink(true);
//   },
//   () => {
//     led.blink(false);
//   }
// );

/*
Practica con alarma de LED usando 'moreThan', en donde se enciende el LED cuando la posicion
del sensor rotatorio es mayor que el valor especificado
 */
// rotary.moreThan(4,
//   () => {
//     led.turnOn();
//   },
//   () => {
//     led.turnOff();
//   }
// );

/*
Practica con alarma de LED usando 'moreThan', en donde se hace parpadear el LED cuando
la posicion del sensor rotatorio es mayor que el valor especificado
 */
// rotary.moreThan(4,
//   () => {
//     led.blink(true);
//   },
//   () => {
//     led.blink(false);
//   }
// );

/*
Practica con alarma de LED usando 'between', en donde se enciende el LED cuando
la posicion del sensor rotatorio se encuentra dentro del rango [min-max]
 */
// rotary.between(2, 4,
//   () => {
//     led.turnOn();
//   },
//   () => {
//     led.turnOff();
//   }
// );

/*
Practica con alarma de LED usando 'between', en donde se hace parpadear el LED cuando
la posicion del sensor rotatorio se encuentra dentro del rango [min-max]
 */
// rotary.between(2, 3,
//   () => {
//     led.blink(true);
//   },
//   () => {
//     led.blink(false);
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
