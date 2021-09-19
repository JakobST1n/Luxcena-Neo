from luxcena_neo import NeoBehaviour

class Main(NeoBehaviour):

    def on_start(self):
        """ Execute when mode is selected. """
        print("Script started")

    def each_second(self):
        """ Execute once every second. """
        print("A second has passed")