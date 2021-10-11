from luxcena_neo import NeoBehaviour, ColorVariable, utils

class Main(NeoBehaviour):

    def declare_variables(self):
        self.declare(ColorVariable("color", "#fafafa", on_change=self.set_color))

    def on_start(self):
        print("Script started, color: {}".format(self.var.color))
        
    def set_color(self, value):
        print("Color var changed: {}".format(value))
        print(utils.detect_format_convert_color(value))
        for i in range(strip.LED_COUNT):
            strip.set_pixel_color(i, value)
        strip.show()

