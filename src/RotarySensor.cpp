/*
 * File:   RotarySensor.cpp
 * Author: yova
 *
 * Created on 26 de mayo de 2016, 04:10 PM
 */

#include <stdint.h>
#include <stdlib.h>
#include<iostream>
#include <cmath>
#include "RotarySensor.h"

RotarySensor::RotarySensor(uint8_t _addr) {
    analogModule = new ADS1015(_addr);
    scaleFactor = 10.0f/1700.0f; // - usin a gain of ADS1015_6144_GAIN, 1700.0 => 5.1v
}

RotarySensor::RotarySensor(const RotarySensor& orig) {
}

RotarySensor::~RotarySensor() {
}

void RotarySensor::selectPort(uint8_t _port){
    inputPort = _port;
    switch(inputPort){
        case 0x01:
            analogModule->selectInput(ADS1015_SENSOR1,ADS1015_6144_GAIN);
            break;
        case 0x02:
            analogModule->selectInput(ADS1015_SENSOR2,ADS1015_6144_GAIN);
            break;
        case 0x03:
            analogModule->selectInput(ADS1015_SENSOR3,ADS1015_6144_GAIN);
            break;
        case 0x04:
            analogModule->selectInput(ADS1015_SENSOR4,ADS1015_6144_GAIN);
            break;
        default:
            printf("Error selecting the Analog Port...\n");
            return;
    }
}

float RotarySensor::getValue(){
    selectPort(inputPort);
    float reading = analogModule->readInput();
    // printf("RotarySensor voltage: %0.3f\n", reading);
    return reading;
}

float RotarySensor::getBasicValue(){
   selectPort(inputPort);
   return analogModule->readRawInput() * scaleFactor;
}

int16_t RotarySensor::getScaledValue(){
    selectPort(inputPort);
    int16_t input = (int16_t)( std::round( getBasicValue() ) );
    return input;
}

void RotarySensor::release(){
    // analogModule->release();
    delete analogModule;
    printf("[RotarySensor] => Released\n");
}
