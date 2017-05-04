{
  "targets": [
    {
      "target_name": "RotarySensor",
      "sources": [ "src/Wrapper/RotarySensor.cpp","src/Wrapper/RotaryWrapper.cpp",
      "src/Modules/AnalogModules/RotarySensor.cpp",
      "src/Libraries/ADS1015/ADS1015.cpp",
      "src/Libraries/Timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}
