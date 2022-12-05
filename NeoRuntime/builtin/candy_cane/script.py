from luxcena_neo import NeoBehaviour, ColorVariable, IntegerVariable

class Main(NeoBehaviour):

    def declare_variables(self):
        self.declare(ColorVariable("Color 1", "#ff0000"))
        self.declare(ColorVariable("Color 2", "#ffffff"))
        self.declare(IntegerVariable("LED Groups", 3, min_val=1, max_val=10))

    def update_self(self):
        N = self.var["LED Groups"].value
        for i in range(strip.num_pixels()):
            c = self.var["Color 1"].value if i % (2 * N) < N else self.var["Color 2"].value
            strip.set_pixel_color(i, c)
        strip.show()

    def each_tick(self):
        self.update_self()
        