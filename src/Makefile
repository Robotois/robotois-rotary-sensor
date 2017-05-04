CC=g++

COMPILE_FLAGS = -g -std=c++11 -Wall -c
LINKER_FLAGS = -g
LIBS = -l bcm2835 -l rt

OBJECTS = \
	test.o \
	ADS1015.o \
	RotarySensor.o \
	AccurateTiming.o

#OBJECTS = $(subst .cpp,.o,$(SOURCES))

all: ads.o rotary.o timer.o main.o
	$(CC) $(LINKER_FLAGS) -o runner $(OBJECTS) $(LIBS)

main.o: test.cpp
	$(CC) $(COMPILE_FLAGS) test.cpp
ads.o: Libraries/ADS1015/ADS1015.cpp Libraries/ADS1015/ADS1015.h
	$(CC) $(COMPILE_FLAGS) Libraries/ADS1015/ADS1015.cpp
timer.o: Libraries/Timer/AccurateTiming.cpp Libraries/Timer/AccurateTiming.h
	$(CC) $(COMPILE_FLAGS) Libraries/Timer/AccurateTiming.cpp
rotary.o: Modules/AnalogModules/RotarySensor.cpp Modules/AnalogModules/RotarySensor.h
	$(CC) $(COMPILE_FLAGS) Modules/AnalogModules/RotarySensor.cpp

clean:
	$(RM) $(OBJECTS) runner
