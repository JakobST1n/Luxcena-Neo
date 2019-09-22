# This is the entry-point for all Luxcena-Neo python-scripts
# The script should be in the same folder as this, and be named "script.py"
# In the future you could possibly have more files and stuff alongside the "script.py"-file as well
import sys
import json
import importlib
import datetime

def runSync(moduleSc, sc):
    timeNow = datetime.datetime.now()
    lastDay = timeNow.day
    lastHour = timeNow.hour
    lastMinute = timeNow.minute
    lastSecond = timeNow.second

    while True:
        timeNow = datetime.datetime.now()

        if ("LuxcenaNeo" in dir(moduleSc)):
            if moduleSc.LuxcenaNeo.forceStop: break
        elif ("neo" in dir(moduleSc)):
            if moduleSc.neo.forceStop == True: break

        if (timeNow.second != lastSecond):
            lastSecond = timeNow.second
            sc.eachSecond()

        if (timeNow.minute != lastMinute):
            lastMinute = timeNow.minute
            sc.eachMinute()

        if (timeNow.hour != lastHour):
            lastHour = timeNow.hour
            sc.eachHour()

        if (timeNow.day != lastDay):
            lastDay = timeNow.lastDay
            sc.eachDay()

def runAsync(moduleSc, sc):
    return

def main():
    print ("Starting script named \"{0}\"".format("test"))

    root_dir = sys.argv[1]
    config_dir = root_dir + "/config/"

    print ("> Loading pixel-configuration...")
    with open(config_dir + "strip.json", "r") as rawStripConf:
        stripConf = json.load(rawStripConf)

    print ("> Initializing script...")
    moduleSc = importlib.import_module("script")

    if ("LuxcenaNeo" in dir(moduleSc)):
        moduleSc.LuxcenaNeo.strip = moduleSc.LuxcenaNeo.Strip(stripConf)
    elif ("neo" in dir(moduleSc)):
        moduleSc.neo.strip = moduleSc.neo.Strip(stripConf)
    else:
        raise Exception("Neither LuxcenaNeo nor neo found in script, check docs!")

    sc = moduleSc.Main()

    print ("> Running the script...")
    sc.onStart()

    if (("async" in dir(moduleSc)) and (moduleSc.async == True)):
        runAsync(moduleSc, sc)
    else:
        runSync(moduleSc, sc)

    print ("> Script exited...")

if __name__ == "__main__":
    main()
