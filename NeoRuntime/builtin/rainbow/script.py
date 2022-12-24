from luxcena_neo import NeoBehaviour, utils, FloatVariable, BooleanVariable
from time import perf_counter

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
        self.declare(FloatVariable("speed", 0.95, min_val=0, max_val=1, step=0.01))
        self.declare(BooleanVariable("Uniform", True))

    def on_start(self):
        """ Execute when mode is selected. """
        self.j = 0
        self.i = 0
        self.last_inst = perf_counter()

    def each_tick(self):
        """Draw rainbow that fades across all pixels at once."""
        if (perf_counter() - self.last_inst) > (1.01-self.var.speed):
            self.last_inst = perf_counter()
            self.j += 1
            if self.j >= 256: self.j = 0
            for i in range(strip.num_pixels()):
                if self.var["Uniform"]:
                    strip.set_pixel_color(i, wheel(int((i * 256 // strip.num_pixels()) + self.j) & 255))
                else:
                    strip.set_pixel_color(i, wheel((i+self.j) & 255))
            strip.show()
