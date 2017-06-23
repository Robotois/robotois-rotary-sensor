{
  "targets": [
    {
      "target_name": "RotarySensor",
      "sources": [ "src/wrapper/RotarySensor.cpp","src/wrapper/RotaryWrapper.cpp",
      "src/RotarySensor.cpp",
      "src/libraries/robotois-ADS1015/ADS1015.cpp",
      "src/libraries/robotois-timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
