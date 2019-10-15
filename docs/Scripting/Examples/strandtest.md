# Strandtest

---
This script just does some fancy patterns to show of the neopixels' capabilities.
Runs in an endless loop, take a look at the code to see what it does more
precisely.

``` python
import LuxcenaNeo as neo  # Can be imported as LuxcenaNeo as well. but anything else and it will fail...
import time

def colorWipe(color, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(neo.strip.numPixels()):
        neo.strip.setPixelColor(i, color)
        neo.strip.show()
        time.sleep(wait_ms/1000.0)

def theaterChase(color, wait_ms=50, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, neo.strip.numPixels(), 3):
                neo.strip.setPixelColor(i+q, color)
            neo.strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, neo.strip.numPixels(), 3):
                neo.strip.setPixelColor(i+q, 0)

def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return neo.Color(pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return neo.Color(255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return neo.Color(0, pos * 3, 255 - pos * 3)

def rainbow(wait_ms=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256*iterations):
        for i in range(neo.strip.numPixels()):
            neo.strip.setPixelColor(i, wheel((i+j) & 255))
        neo.strip.show()
        time.sleep(wait_ms/1000.0)

def rainbowCycle(wait_ms=20, iterations=5):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    for j in range(256*iterations):
        for i in range(strip.numPixels()):
            neo,strip.setPixelColor(i, wheel(((i * 256 / neo.strip.numPixels()) + j) & 255))
        neo.strip.show()
        time.sleep(wait_ms/1000.0)

def theaterChaseRainbow(wait_ms=50):
    """Rainbow movie theater light style chaser animation."""
    for j in range(256):
        for q in range(3):
            for i in range(0, neo.strip.numPixels(), 3):
                neo.strip.setPixelColor(i+q, wheel((i+j) % 255))
            neo.strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, neo.strip.numPixels(), 3):
                neo.strip.setPixelColor(i+q, 0)


class Main(neo.NeoBehaviour):

    def onStart(self):
        # Change the brightness of the strip
        neo.strip.setBrightness(100)

        # Do an endless loop with some default neopixel test patterns
        while True:
            colorWipe(neo.Color(255, 0, 0))  # Red wipe
            colorWipe(neo.Color(0, 255, 0))  # Blue wipe
            colorWipe(neo.Color(0, 0, 255))  # Green wipe

            theaterChase(neo.Color(127, 127, 127))  # White theater chase
            theaterChase(neo.Color(127,   0,   0))  # Red theater chase
            theaterChase(neo.Color(  0,   0, 127))  # Blue theater chase

            rainbow()
            rainbowCycle()
            theaterChaseRainbow()


```
