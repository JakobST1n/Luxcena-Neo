from luxcena_neo import NeoBehaviour, utils
import time

def colorWipe(*color, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.num_pixels()):
        strip.set_pixel_color(i, *color)
        strip.show()
        time.sleep(wait_ms/1000.0)

def theaterChase(*color, wait_ms=50, iterations=10):
    """Movie theater light style chaser animation."""
    for j in range(iterations):
        for q in range(3):
            for i in range(0, strip.num_pixels(), 3):
                strip.set_pixel_color(i+q, *color)
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.num_pixels(), 3):
                strip.set_pixel_color(i+q, 0)

def wheel(pos):
    """Generate rainbow colors across 0-255 positions."""
    if pos < 85:
        return (pos * 3, 255 - pos * 3, 0)
    elif pos < 170:
        pos -= 85
        return (255 - pos * 3, 0, pos * 3)
    else:
        pos -= 170
        return (0, pos * 3, 255 - pos * 3)

def rainbow(wait_ms=20, iterations=1):
    """Draw rainbow that fades across all pixels at once."""
    for j in range(256*iterations):
        for i in range(strip.num_pixels()):
            strip.set_pixel_color(i, wheel((i+j) & 255))
        strip.show()
        time.sleep(wait_ms/1000.0)

def rainbowCycle(wait_ms=20, iterations=5):
    """Draw rainbow that uniformly distributes itself across all pixels."""
    for j in range(256*iterations):
        for i in range(strip.num_pixels()):
            strip.set_pixel_color(i, wheel(int((i * 256 // strip.num_pixels()) + j) & 255))
        strip.show()
        time.sleep(wait_ms/1000.0)

def theaterChaseRainbow(wait_ms=50):
    """Rainbow movie theater light style chaser animation."""
    for j in range(256):
        for q in range(3):
            for i in range(0, strip.num_pixels(), 3):
                strip.set_pixel_color(i+q, wheel((i+j) % 255))
            strip.show()
            time.sleep(wait_ms/1000.0)
            for i in range(0, strip.num_pixels(), 3):
                strip.set_pixel_color(i+q, 0)

class Main(NeoBehaviour):

    def on_start(self):
        # Do an endless loop with some default ixel test patterns
        while True:
            theaterChase(*(127, 127, 127))  # White theater chase
            theaterChase(*(127,   0,   0))  # Red theater chase
            theaterChase(*(  0,   0, 127))  # Blue theater chase

            rainbow()
            rainbowCycle()
            theaterChaseRainbow()
