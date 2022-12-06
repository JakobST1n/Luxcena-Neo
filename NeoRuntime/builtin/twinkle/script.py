from luxcena_neo import NeoBehaviour, FloatVariable, IntegerVariable, ColorVariable, BooleanVariable, utils
from time import perf_counter
from random import randint

class Main(NeoBehaviour):

    def declare_variables(self):
        self.declare(FloatVariable("speed", 0.41, min_val=0.01, max_val=1, step=0.01))
        self.declare(IntegerVariable("count", 2, min_val=1, max_val=strip.num_pixels()))
        self.declare(BooleanVariable("random colors", False))
        self.declare(ColorVariable("color", "#ffffff"))

    def on_start(self):
        self.pixel_on_count = 0
        self.last_inst = perf_counter()

    def each_tick(self):
        if (perf_counter() - self.last_inst) > (1.01 - self.var.speed):
            self.pixel_on_count += 1
            if self.pixel_on_count >= self.var.count:
                strip.blank()
                self.pixel_on_count = 0
            else:
                c = utils.hex_to_rgb(self.var.color)
                if self.var["random colors"].value:
                    c = (randint(0,255), randint(0,255), randint(0,255))
                strip.set_pixel_color(randint(0,strip.num_pixels()), *c)
            strip.show()
            self.last_inst = perf_counter()

