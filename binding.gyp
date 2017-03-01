{
  "targets": [
    {
      "target_name": "RotarySensor",
      "sources": [ "RotarySensor.cpp","RotaryWrapper.cpp",
      "src/Modules/AnalogModules/RotarySensor.cpp",
      "src/Libraries/ADS1015/ADS1015.cpp",
      "src/Libraries/Timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
