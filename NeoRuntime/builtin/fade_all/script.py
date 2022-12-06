from luxcena_neo import NeoBehaviour, FloatVariable
from time import perf_counter

class Main(NeoBehaviour):

    def declare_variables(self):
        self.declare(FloatVariable("speed", 0.99, min_val=0.5, max_val=1, step=0.001))

    def on_start(self):
        self.intensity = 0
        self.color = 0
        self.inc = 1
        self.last_inst = perf_counter()

    def each_tick(self):
        if (perf_counter() - self.last_inst) > (1.001-self.var.speed):
            self.intensity += self.inc
            if self.intensity % 256 == 0: self.inc *= -1
            if self.intensity <= 0: self.color = (self.color + 1) % 3
            set_all(*[self.intensity if i == self.color else 0 for i in range(3)])
            self.last_inst = perf_counter()

def set_all(*color):
    for i in range(strip.num_pixels()):
        strip.set_pixel_color(i, *color)
    strip.show()
