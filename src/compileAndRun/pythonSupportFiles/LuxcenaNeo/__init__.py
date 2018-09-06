from NeoBehaviour import *
from Strip import *

strip = None       # The strip object, should be set in entry.py, and is then accessible in the script-file
forceStop = False  # When set to true, execution of the script will halt

# A function that could be used to halt the script
def stop():
    global forceStop
    forceStop = True
