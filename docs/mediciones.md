# Mediciones Avanzadas

En esta sección se abordan otros métodos para obtener mediciones del Sensor Rotatorio. El método de medición por eventos y usando la función `when()` se pueden llegar a considerar como un punto de inicio, ya que para ciertas aplicaciones se requiere obtener mediciones más precisas y/o con un menor tiempo de muestreo, lo que implica un mejor tiempo de respuesta.

## Función `getValue()`

La función `getValue()` permite obtener mediciones del Sensor Rotatorio con base en la señal analógica (*raw value*) que éste proporciona con respecto a la posición de la perilla. En este caso las mediciones tienen un rango de `0-5`, en donde el valor de medición es igual al voltaje de la señal que se deriva en el Sensor Rotatorio, y de hecho el valor máximo (`5`) es en realidad igual al voltaje con el cual el módulo es alimentado, normalmente son `5V` por ello se establece dicho valor. Consecuentemente en algunos casos el valor máximo en la señal puede variar debido a que éste no siempre es exacto.

En el siguiente ejemplo se ilustra cómo puede utilizarse la función `getValue()`:

```javascript
const RotarySensor = require('robotois-rotary-sensor');

const rotary = new RotarySensor(1);

setInterval(() => {
  console.log(`Value: ${rotary.getValue().toFixed(3)}`);
}, 250);
```
A continuación se muestra un posible resultado de ejecutar el ejemplo anterior. Como se puede observar, se tiene el caso en el cual la perilla del Sensor Rotatorio gira de la posición más baja a la posición máxima.

```text
Value: 0.000
Value: 0.003
Value: 0.054
Value: 0.111
Value: 0.177
Value: 0.486
Value: 0.828
Value: 1.056
Value: 1.335
Value: 1.608
Value: 1.854
Value: 2.229
Value: 2.544
Value: 3.084
Value: 3.591
Value: 3.996
Value: 4.266
Value: 4.497
Value: 4.716
Value: 4.893
Value: 5.028
```
En este resultado es importante notar que el valor máximo es `5.028`, lo cual, como se mencionó anteriormente, significa que éste es el voltaje de alimentación que se tiene en el módulo. Y de manera general, el voltaje de alimentación es igual al de la **Raspberry PI**.

## Función `getBasicValue()`
Para muchas aplicaciones no siempre resulta intuitivo utilizar el nivel de voltaje de la señal como indicador de la posición de la perilla en el Sensor Rotatorio. Por ello en esta librería se incluye la función `getBasicValue()`, la cual proporciona valores de medición que se encuentran en el rango de `0-10`, en donde el valor `0` es el mínimo y el valor `10` es el máximo. También cabe mencionar que los valores de medición son valores reales, es decir que tienen una alta precisión con punto decimal.

Para ejemplificar el uso de la función `getBasicValue()`, se proporciona el siguiente ejemplo:

```javascript
const RotarySensor = require('robotois-rotary-sensor');

const rotary = new RotarySensor(1);

setInterval(() => {
  console.log(`BasicValue: ${rotary.getBasicValue().toFIxed(3)}`);
}, 250);
```
A continuación se muestra un posible resultado de ejecutar el ejemplo anterior, en donde se observa que se tienen los valores para cuando la perilla del Sensor Rotatorio gira desde la posición mínima a la posición máxima.

```text
BasicValue: 0.000
BasicValue: 0.218
BasicValue: 0.329
BasicValue: 1.335
BasicValue: 2.065
BasicValue: 2.682
BasicValue: 3.276
BasicValue: 4.294
BasicValue: 4.859
BasicValue: 5.647
BasicValue: 6.453
BasicValue: 6.971
BasicValue: 7.447
BasicValue: 8.065
BasicValue: 8.847
BasicValue: 9.347
BasicValue: 9.641
BasicValue: 9.882
BasicValue: 10.012
```

## `getScaledValue()`
Esta función es muy similar a la función `getBasicValue()`, la diferencia radica en que los valores de medición son enteros. Esta función se ha incluido debido a que en algunos casos no se requiere de una presición alta, y así se puede simplificar su uso. De esta manera la librería proporciona los elementos esenciales para abordar una amplia gama de aplicaciones que se puedan derivar.

```javascript
const RotarySensor = require('robotois-rotary-sensor');

const rotary = new RotarySensor(1);

setInterval(() => {
  console.log(`ScaledValue: ${rotary.getScaledValue()}`);
}, 250);
```
El resultado de la ejecución del ejemplo anterior se muestra a continuación, en donde se observa cómo se obtienen los valores de medición cuando la perilla es girada desde la posición mínima a la posición máxima.
```text
ScaledValue: 0
ScaledValue: 1
ScaledValue: 2
ScaledValue: 4
ScaledValue: 5
ScaledValue: 6
ScaledValue: 6
ScaledValue: 7
ScaledValue: 8
ScaledValue: 8
ScaledValue: 9
ScaledValue: 10
```
