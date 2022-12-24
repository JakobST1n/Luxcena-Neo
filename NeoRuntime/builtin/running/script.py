from luxcena_neo import NeoBehaviour, ColorVariable, utils
from time import perf_counter
from math import sin

class Main(NeoBehaviour):

    def declare_variables(self):
        self.declare(ColorVariable("color", "#ffffff", on_change=self.change_color))

    def change_color(self, color):
        self.red, self.green, self.blue = utils.hex_to_rgb(color)

    def on_start(self):
        self.red, self.green, self.blue = 255, 255, 255
        self.position = 0
        self.last_inst = perf_counter()

    def each_tick(self):
        if (perf_counter() - self.last_inst) > (0.07):
            self.position = (self.position + 1) % (strip.num_pixels() * 2)
            for i in range(strip.num_pixels()):
                level = int(sin(i+self.position) * 127 + 128);
                strip.set_pixel_color(i,int(((sin(i+self.position) * 127 + 128)/255)*self.red),
                                        int(((sin(i+self.position) * 127 + 128)/255)*self.green),
                                        int(((sin(i+self.position) * 127 + 128)/255)*self.blue));
            self.last_inst = perf_counter()
            strip.show()
     
