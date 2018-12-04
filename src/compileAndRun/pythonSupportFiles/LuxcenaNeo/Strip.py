from neopixel import *
from Matrix import Matrix, getSegmentRange

class Strip:

    def __init__(self, stripConf):
        self.SEGMENTS = stripConf["segments"]
        self.SEGMENT_CONFIG = stripConf["segment_config"]

        self.LED_FREQ_HZ = stripConf["led_freq_hz"]  # LED signal frequency in hertz (usually 800khz)
        self.LED_CHANNEL = stripConf["led_channel"]  # Set to '1' for GPIOs 13, 19, 41, 45, 53
        self.LED_INVERT  = stripConf["led_invert"]   # True to invert the signal, (when using NPN transistor level shift)
        self.LED_PIN     = stripConf["led_pin"]      # 18 uses PWM, 10 uses SPI /dev/spidev0.0
        self.LED_DMA     = stripConf["led_dma"]      # DMA channel for generating the signal, on the newer ones, try 10
        self.LED_COUNT   = sum(self.SEGMENTS)        # Number of LEDs in strip


        self.LED_BRIGHTNESS = 255

        self.strip = Adafruit_NeoPixel(
            self.LED_COUNT,
            self.LED_PIN,
            self.LED_FREQ_HZ,
            self.LED_DMA,
            self.LED_INVERT,
            self.LED_BRIGHTNESS,
            self.LED_CHANNEL
        )

        self.strip.begin()

        # Blank out all the LEDs
        i = 0
        while True:
            self.strip.setPixelColor(i, 0)
            i += 1
            if (i > self.LED_COUNT): break
        self.strip.show()

        # Setup matrix
        #try:
        self.pixelMatrix = Matrix(self.SEGMENTS, stripConf["matrix"])
        self.pixelMatrix.dump()
        #except:
        #    print("Something went wrong while setting up your self-defined matrix.")

    def show(self):
        """Update the display with the data from the LED buffer."""
        self.strip.show()

    def setPixelColor(self, n, color):
        """Set LED at position n to the provided 24-bit color value (in RGB order).
        """
        self.strip.setPixelColor(n, color)

    def setPixelColorXY(self, x, y, color):
        """Set LED at position n to the provided 24-bit color value (in RGB order).
        """
        self.strip.setPixelColor(self.pixelMatrix.get(x, y), color)

    def setPixelColorRGB(self, n, red, green, blue, white = 0):
        """Set LED at position n to the provided red, green, and blue color.
        Each color component should be a value from 0 to 255 (where 0 is the
        lowest intensity and 255 is the highest intensity).
        """
        self.strip.setPixelColor(n, Color(red, green, blue, white))

    def setPixelColorXYRGB(self, x, y, red, green, blue, white = 0):
        """Set LED at position n to the provided red, green, and blue color.
        Each color component should be a value from 0 to 255 (where 0 is the
        lowest intensity and 255 is the highest intensity).
        """
        self.strip.setPixelColor(self.pixelMatrix.get(x, y), Color(red, green, blue, white))

    def setSegmentColorRGB(self, segment, red, green, blue, white = 0):
        """Set a whole segment to the provided red, green and blue color.
        Each color component should be a value from 0 to 255 (where 0 is the
        lowest intensity and 255 is the highest intensity)."""
        for n in getSegmentRange(self.SEGMENTS, segment):
            self.strip.setPixelColor(n, Color(red, green, blue, white))

    def setBrightness(self, brightness):
        """Scale each LED in the buffer by the provided brightness.  A brightness
        of 0 is the darkest and 255 is the brightest.
        """
        self.strip.setBrightness(brightness)

    def getBrightness(self):
        """Get the brightness value for each LED in the buffer. A brightness
        of 0 is the darkest and 255 is the brightest.
        """
        return self.strip.getBrightness()

    def getPixels(self):
        """Return an object which allows access to the LED display data as if
        it were a sequence of 24-bit RGB values.
        """
        return self.strip.getPixels()

    def numPixels(self):
        """Return the number of pixels in the display."""
        return self.LED_COUNT

    def getPixelColor(self, n):
        """Get the 24-bit RGB color value for the LED at position n."""
        return self.strip.getPixelColor(n)


def Color(red, green, blue, white = 0):
    """Convert the provided red, green, blue color to a 24-bit color value.
    Each color component should be a value 0-255 where 0 is the lowest intensity
    and 255 is the highest intensity.
    """
    return (white << 24) | (red << 16)| (green << 8) | blue

def hexColor(value):
    value = value.lstrip('#')
    lv = len(value)
    rgb = tuple(int(value[i:i+lv/3], 16) for i in range(0, lv, lv/3))
    return (0 << 24) | (rgb[1] << 16) | (rgb[0] << 8) | rgb[2]
