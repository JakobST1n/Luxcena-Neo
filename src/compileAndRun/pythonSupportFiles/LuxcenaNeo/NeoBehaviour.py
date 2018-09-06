# This is the base-class "main" should inherit from!
# All methods are blocking :) This means that you could potentially loose a "tick"
#   For example, if "eachSecond" is taking up the thread, and the clock goes from 11:58 to 12:02, "eachHour", will not be called.
class NeoBehaviour:

    # THIS METHOD SHOULD NOT BE OVERIDDEN! Use onStart if you want a setup-method!!!
    # Contains basic setup
    def __init__(self):
        return

    # This method will be run right after __init__
    def onStart(self):
        return

    # This method is called every second (on the clock), given that the thread is open
    def eachSecond(self):
        return

    # This method is called every mintue (on the clock), given that the thread is open
    def eachMinute(self):
        return

    # This method is called every whole hour (on the clock), given that the thread is open
    def eachHour(self):
        return

    # This method is called every day at noon, given that the thread is open
    def eachDay(self):
        return
