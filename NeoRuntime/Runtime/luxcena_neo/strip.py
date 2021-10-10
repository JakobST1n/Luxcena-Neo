import json
from os import path
import rpi_ws281x as ws
from .matrix import Matrix, get_segment_range
from .power_calc import calcCurrent


class Strip:

    def __init__(self, strip_conf):
        self.SEGMENTS = strip_conf["segments"]

        self.LED_FREQ_HZ = int(strip_conf["led_freq_hz"])  # LED signal frequency in hertz (usually 800khz)
        self.LED_CHANNEL = int(strip_conf["led_channel"])  # Set to '1' for GPIOs 13, 19, 41, 45, 53
        self.LED_INVERT  = strip_conf["led_invert"]   # True to invert the signal, (when using NPN transistor level shift)
        self.LED_PIN     = int(strip_conf["led_pin"])      # 18 uses PWM, 10 uses SPI /dev/spidev0.0
        self.LED_DMA     = int(strip_conf["led_dma"])      # DMA channel for generating the signal, on the newer ones, try 10
        self.LED_COUNT   = sum(self.SEGMENTS)        # Number of LEDs in strip

        if ("color_calibration" in strip_conf) and (strip_conf["color_calibration"] != ""):
            self.COLOR_CALIBRATION = strip_conf["led_calibration"]
        else:
            self.COLOR_CALIBRATION = [0xffffffff for x in range(self.LED_COUNT)]

        self.TMPCOLORSTATE = [0 for x in range(self.LED_COUNT)]
        self.COLORSTATE = [0 for x in range(self.LED_COUNT)]

        self.LED_BRIGHTNESS = 255
        
        self.strip = ws.Adafruit_NeoPixel(
            self.LED_COUNT,
            self.LED_PIN,
            self.LED_FREQ_HZ,
            self.LED_DMA,
            self.LED_INVERT,
            self.LED_BRIGHTNESS,
            self.LED_CHANNEL,
            strip_type=ws.WS2812_STRIP
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
        print("  * Generating matrix")
        # try:
        self.pixelMatrix = Matrix(self.SEGMENTS, strip_conf["matrix"])
        self.pixelMatrix.dump()
        # except:
        #    print("Something went wrong while setting up your self-defined matrix.")

        self.__power_on = True
        self.__brightness = 255
        self.__actual_brightness = self.__brightness

        self.__globvars_path = path.join(path.split(path.dirname(path.abspath(__file__)))[0], "state.json")
        if path.exists(self.__globvars_path):
            try:
                with open(self.__globvars_path, "r") as f:
                    globvars = json.load(f)
                    self.power_on = globvars["power_on"]
                    self.brightness = globvars["brightness"]
            except:
                print("Could not load saved globvars...")


    def save_globvars(self):
        with open(self.__globvars_path, "w") as f:
            f.write(json.dumps({
                "power_on": self.__power_on,
                "brightness": self.__brightness
            }))

    @property
    def power_on(self):
        return self.__power_on

    @power_on.setter
    def power_on(self, value: bool):
        self.__power_on = value
        if (self.power_on):
            self.__actual_brightness = self.__brightness
            self.strip.setBrightness(self.__brightness)
            self.strip.show()
        else:
            self.__actual_brightness = 0
            self.strip.setBrightness(0)
            self.strip.show()
        self.save_globvars()

    @property
    def brightness(self):
        #return self.strip.getBrightness()
        return self.__actual_brightness

    @brightness.setter
    def brightness(self, value: int):
        if 0 <= value <= 255:
            self.__brightness = value
            if (self.power_on):
                self.__actual_brightness = value
                self.strip.setBrightness(value)
                self.strip.show()
            self.save_globvars()
        else:
            raise Exception("Value ({}) outside allowed range (0-255)".format(value))

    def show(self):
        """Update the display with the data from the LED buffer."""
        self.COLORSTATE = self.TMPCOLORSTATE
        # self.strip.show()

    def set_pixel_color(self, n, *color):
        """Set LED at position n to the provided 24-bit color value (in RGB order).
        """
        c = detect_format_convert_color(*color)
        self.TMPCOLORSTATE[n] = c
        self.strip.setPixelColor(n, c)

    def set_pixel_color_XY(self, x, y, *color):
        """Set LED at position n to the provided 24-bit color value (in RGB order).
        """
        self.set_pixel_color(self.pixelMatrix.get(x, y), *color)

    def set_segment_color(self, segment, *color):
        """Set a whole segment to the provided red, green and blue color.
        Each color component should be a value from 0 to 255 (where 0 is the
        lowest intensity and 255 is the highest intensity)."""
        for n in get_segment_range(self.SEGMENTS, segment):
            self.set_pixel_color(n, *color)

    def get_pixels(self):
        """Return an object which allows access to the LED display data as if
        it were a sequence of 24-bit RGB values.
        """
        return self.strip.getPixels()

    def num_pixels(self):
        """Return the number of pixels in the display."""
        return self.LED_COUNT

    def get_pixel_color(self, n):
        """Get the 24-bit RGB color value for the LED at position n."""
        return self.strip.getPixelColor(n)


def color_from_rgb(red, green, blue, white=0):
    """
    Convert the provided red, green, blue color to a 24-bit color value.
    Each color component should be a value 0-255
    where 0 is the lowest intensity and 255 is the highest intensity.
    """
    return (white << 24) | (red << 16) | (green << 8) | blue


def color_from_hex(hex_color: str):
    """ Convert the provided hex code to a 24-bit color value. """
    value = hex_color.lstrip('#')
    lv = len(value)
    rgb = tuple(int(value[i:i+lv//3], 16) for i in range(0, lv, lv//3))
    return color_from_rgb(red=rgb[0], green=rgb[1], blue=rgb[2])


def detect_format_convert_color(*color) -> int:
    """
    Detect format of a color and return its 24-bit color value.

    If parameter is only a str, it will be treated as a hex value.
    If parameter is a tuple, the first three items in that tuple will be treated as a rgb value.
    If parameter is a int, it will be treated as a 24-bit color value.
    If there are 3 parameters, these will be treated as a rgb value.
    """
    if (len(color) == 1) and (isinstance(color[0], str)):
        return color_from_hex(color[0])
    if (len(color) == 1) and (isinstance(color[0], tuple)):
        return color_from_rgb(*(color[0]))
    if (len(color) == 1) and (isinstance(color[0], int)):
        return color[0]
    if (len(color) == 3):
        return color_from_rgb(*color)
    raise ValueError("Invalid parameters provided, check documentation.")
