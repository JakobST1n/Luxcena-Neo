from luxcena_neo import NeoBehaviour, IntegerVariable

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

class Main(NeoBehaviour):

    def declare_variables(self):
        self.declare(IntegerVariable("speed", 2, min_val=1, max_val=50))

    def on_start(self):
        """ Execute when mode is selected. """
        self.i = 0

    def each_tick(self):
        self.i += self.var.speed
        if self.i > 255: self.i = 0
        for i in range(strip.num_pixels()):
            strip.set_pixel_color(i, wheel(self.i))
        strip.show()
