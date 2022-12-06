from luxcena_neo import NeoBehaviour, FloatVariable, IntegerVariable, ColorVariable, BooleanVariable
from time import perf_counter

class Main(NeoBehaviour):

    def declare_variables(self):
        self.declare(FloatVariable("delay", 0.07, min_val=0.01, max_val=0.5, step=0.01))
        self.declare(IntegerVariable("pause", 20, min_val=1, max_val=60))
        self.declare(IntegerVariable("strobe count", 10, min_val=1, max_val=100))
        self.declare(ColorVariable("color", "#fafafa"))

    def on_start(self):
        self.strobe_enabled = False
        self.strobe_on = False
        self.strobe_c  = 0
        self.last_inst = perf_counter()

    def each_tick(self):
        if (perf_counter() - self.last_inst) > (self.var["delay"].value if self.strobe_enabled else self.var["pause"].value):
            if not self.strobe_enabled: self.strobe_enabled = True
            self.strobe_c += 1
            set_all(self.var["color"].value if self.strobe_on else 0)
            self.strobe_on = not self.strobe_on
            if self.strobe_c >= (self.var["strobe count"].value * 2):
                self.strobe_c = 0
                self.strobe_enabled = False
                self.strobe_on = False
                set_all(0)
            self.last_inst = perf_counter()
            
def set_all(*color):
    for i in range(strip.num_pixels()):
        strip.set_pixel_color(i, *color)
    strip.show()