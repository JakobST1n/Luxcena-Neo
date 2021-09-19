def hex_to_rgb(value: str) -> tuple:
    """ Convert hex color to rgb tuple. """
    value = value.lstrip("#")
    lv = len(value)
    return tuple(int(value[i:i + lv // 3], 16) for i in range(0, lv, lv // 3))

def rgb_to_hex(rgb: tuple) -> str:
    """ Convert rgb color to hex string. """
    return '#%02x%02x%02x' % rgb

def rgb_from_24bit(color: int) -> tuple:
    """ Convert 24-bit color value into a tuple representing the rgb values. """
    # w = (color & 0xFF000000) >> 24
    r = (color & 0x00FF0000) >> 16
    g = (color & 0x0000FF00) >> 8
    b = (color & 0x000000FF)
    return (r, g, b)

def hex_from_24bit(color: int) -> str:
    """ Convert 24-bit color value into hex str. """
    rgb_to_hex(rgb_from_24bit(color))
