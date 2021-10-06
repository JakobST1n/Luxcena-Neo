from luxcena_neo import NeoBehaviour, ColorVariable, utils
import time

class Main(NeoBehaviour):
    
    def declare_variables(self):
        self.declare(ColorVariable("color", "#fafafa", on_change=self.set_color))
        self.declare(ColorVariable("color2", "#fafafa", on_change=self.set_color))

    def on_start(self):
        print(f"Script started, color: {self.var.color}")
        self.set_color(self.var.color)
        strip.power_on = True
        self.current_color = self.var.color

    def set_color(self, value):
        print(f"Color var changed: {value}")
        # transition_color(self.current_color, value, 1)

def lerp(a, b, u):
    return (1 - u) * a + u * b

def transition_color(start_color, end_color, duration):
    start_color = utils.hex_to_rgb(start_color)
    end_color = utils.hex_to_rgb(end_color)
    interval = 10
    steps = duration / interval
    step_u = 1.0 / steps
    u = 0

    while u < 1:
        r = round(lerp(start_color[0], end_color[0], u))
        g = round(lerp(start_color[1], end_color[1], u))
        b = round(lerp(start_color[2], end_color[2], u))
        for i in len(strip.LED_COUNT):
            strip.set_pixel_color(i, (r, g, b))
        strip.show()

        time.sleep(interval / 100)