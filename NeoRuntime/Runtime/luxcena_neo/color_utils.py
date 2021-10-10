def hex_to_rgb(value: str) -> tuple:
    """ Convert hex color to rgb tuple. """
    value = value.lstrip("#")
    lv = len(value)
    return tuple(int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3))

def rgb_to_hex(rgb: tuple) -> str:
    """ Convert rgb color to hex string. """
    return '#%02x%02x%02x' % rgb

def rgb_from_twentyfour_bit(color: int) -> tuple:
    """ Convert 24-bit color value into a tuple representing the rgb values. """
    # w = (color & 0xFF000000) >> 24
    r = (color & 0x00FF0000) >> 16
    g = (color & 0x0000FF00) >> 8
    b = (color & 0x000000FF)
    return (r, g, b)

def hex_from_twentyfour_bit(color: int) -> str:
    """ Convert 24-bit color value into hex str. """
    rgb_to_hex(rgb_from_24bit(color))

def twentyfour_bit_from_rgb(red, green, blue, white=0):
    """
    Convert the provided red, green, blue color to a 24-bit color value.
    Each color component should be a value 0-255
    where 0 is the lowest intensity and 255 is the highest intensity.
    """
    return (white << 24) | (red << 16) | (green << 8) | blue


def twentyfour_bit_from_hex(hex_color: str):
    """ Convert the provided hex code to a 24-bit color value. """
    print(hex_color)
    value = hex_color.lstrip('#')
    return (int(value[0:2], 16) << 16) | (int(value[2:4], 16) << 8) | (int(value[4:6], 16))


def detect_format_convert_color(*color) -> int:
    """
    Detect format of a color and return its 24-bit color value.

    If parameter is only a str, it will be treated as a hex value.
    If parameter is a tuple, the first three items in that tuple will be treated as a rgb value.
    If parameter is a int, it will be treated as a 24-bit color value.
    If there are 3 parameters, these will be treated as a rgb value.
    """
    if (len(color) == 1) and (isinstance(color[0], str)):
        return twentyfour_bit_from_hex(color[0])
    if (len(color) == 1) and (isinstance(color[0], tuple)):
        return twentyfour_bit_from_rgb(*(color[0]))
    if (len(color) == 1) and (isinstance(color[0], int)):
        return color[0]
    if (len(color) == 3):
        return twentyfour_bit_from_rgb(*color)
    raise ValueError("Invalid parameters provided, check documentation.")


class Color:

    def __init__(self, *color):
        self.__color = detect_format_convert_color(*color)
    
    @property
    def hex(self): return hex_from_twentyfour_bit(self.__color)

    @property
    def rgb(self): return rgb_from_twentyfour_bit(self.__color)

    def __repr__(self):
        return self.__color        

    def __str__(self):
        return str(repr(self))
    
    def __int__(self):
        return self.__color

    def __invert__(self):
        rgb_color = self.rgb
        return Color((255-rgb_color[0], 255-rgb_color[1], 255-rgb_color[2]))
