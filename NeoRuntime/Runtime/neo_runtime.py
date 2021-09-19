# This is the entry-point for all Luxcena-Neo python-scripts
# The script should be in the same folder as this, and be named "script.py"
# In the future you could possibly have more files and stuff alongside the "script.py"-file as well
import sys
import json
import importlib
import datetime
import argparse
import configparser
import time
import threading
import select
import traceback
from os import path

from luxcena_neo.strip import Strip

def init_strip(strip_config_file):
    """ Initialize a strip object with a config file path. """
    print("> Loading pixel-configuration...")
    strip_config_obj = configparser.ConfigParser()
    strip_config_obj.read(args.strip_config)
    strip_config = dict(strip_config_obj.items("DEFAULT"))
    strip_config["matrix"] = json.loads(strip_config["matrix"].replace('"', ""))
    strip_config["segments"] = [int(x) for x in strip_config["segments"].split(" ")]
    strip_config["led_channel"] = int(strip_config["led_channel"])
    strip_config["led_dma"] = int(strip_config["led_dma"])
    strip_config["led_freq_hz"] = int(strip_config["led_freq_hz"])
    strip_config["led_invert"] = (strip_config["led_invert"] == "false")
    strip_config["led_pin"] = int(strip_config["led_pin"])
    strip = Strip(strip_config)
    return strip

def init_package(package_path, entry_module, strip):
    """ Initialize the package we are going to run. """
    print ("> Initializing package (mode)...")
    sys.path.append(package_path)
    module = importlib.import_module(entry_module)
    module_entry_instance = module.Main(package_path)

    # Make the strip instance available in our modules
    setattr(module, "strip", strip)

    module_entry_instance.declare_variables()
    return module_entry_instance

def exec_module(module_executor_loop_func):
    """ Create and start a new thread to run the package loop. """
    th = threading.Thread(target=module_executor_loop_func, daemon=True)
    th.start()
    return th

class NeoRuntime:


    def __init__(self, package_path, entry_module, strip_config_file):
        self.__strip = init_strip(strip_config_file)
        self.__module_entry_instance = init_package(package_path, entry_module, self.__strip)
        self.__module_th = None
        

    def start(self):
        # The mode is starting in it's own thread
        print("> Running the mode...")
        self.__module_th = exec_module(self.__module_loop)

        # This will run in this thread.
        print("> Starting to listen on stdin")
        try:
            self.__command_listener_loop()
        except KeyboardInterrupt:
            print("Exiting...")
        except Exception as e:
            traceback.print_exc()
    

    def __command_listener_loop(self):
        last_send = time.perf_counter()
        while True:
            if not self.__module_th.is_alive(): break
            while sys.stdin in select.select([sys.stdin], [], [], 0)[0]:
                line = sys.stdin.readline()
                if line:
                    line = line.replace("\n", "")
                    if (line[0:10] == ":::setvar:"):
                        name, value = (line.split(" ", 1)[1]).replace("\"", "").split(":", 1)
                        if name in self.__module_entry_instance.vars:
                            self.__module_entry_instance.vars[name] = value
                    elif (line[0:11] == ":::setglob:"):
                        name, value = (line.split(" ", 1)[1]).replace("\"", "").split(":", 1)
                        if name == "brightness":
                            self.__strip.brightness = int(value)
                        elif name == "power_on":
                            self.__strip.power_on = value == "true"
                        else:
                            print(f"Unknown globvar \"{name}\"")
            else:
                if (time.perf_counter() - last_send) > 0.5:
                    _vars = "{"
                    for name, var in self.__module_entry_instance.vars:
                        _vars += f" \"{name}\" : {{ \"value\": \"{var.value}\", \"var_type\": \"{var.var_type}\" }}, "
                    if len(_vars) > 2:
                        _vars = _vars[0:-2]
                    _vars += "}"

                    globvars = "{ \"power_on\": " + str(self.__strip.power_on).lower() + ", "
                    globvars += " \"brightness\":" + str(self.__strip.brightness) + " }"
                    print(f"{{ \":::data:\": {{ \"variables\": {_vars}, \"globvars\": {globvars} }} }}")
                    last_send = time.perf_counter()

    

    def __module_loop(self):
        self.__module_entry_instance.on_start()

        self.__module_last_tick   = time.perf_counter()
        self.__module_last_second = time.perf_counter()
        self.__module_last_minute = self.__module_last_second
        self.__module_last_hour   = self.__module_last_second
        self.__module_last_day    = self.__module_last_second

        while True:
            c_time = time.perf_counter()
            try:
                self.__module_tick(c_time, c_time - self.__module_last_tick)
            except Exception as e:
                traceback.print_exc()
            self.__module_last_tick = time.perf_counter()


    def __module_tick(self, runningtime, deltatime):
        self.__module_entry_instance.each_tick()

        if (runningtime - self.__module_last_second > 1):
            self.__module_entry_instance.each_second()
            self.__module_last_second = time.perf_counter()

        if (((runningtime - self.__module_last_minute) % 60) > 1):
            self.__module_entry_instance.each_minute()
            self.__module_last_minute = time.perf_counter()

        if (((runningtime - self.__module_last_hour) % 3600) > 1):
            self.__module_entry_instance.each_minute()
            self.__module_last_hour = time.perf_counter()

        if (((runningtime - self.__module_last_day) % 86400) > 1):
            self.__module_entry_instance.each_minute()
            self.__module_last_day = time.perf_counter()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--strip-config', help='Path to the strip config file.')
    parser.add_argument('--mode-path', help='Path of the folder the mode is in.')
    parser.add_argument('--mode-entry', help='Path of the module that is the entry-point of the module.')
    args = parser.parse_args()

    args.strip_config = args.strip_config.replace("\"", "")
    args.mode_path = args.mode_path.replace("\"", "")
    args.mode_entry = args.mode_entry.replace("\"", "")
    if not path.exists(args.strip_config):
        print(f"Strip config not found ({args.strip_config}).")
        sys.exit(1)
    if not path.exists(args.mode_path):
        print(f"Mode path not found ({args.mode_path}).")
        sys.exit(1)
    if not path.exists(f"{args.mode_path}/{args.mode_entry}.py"):
        print(f"Mode entry not found in mode path ({args.mode_path}/{args.mode_entry}).")
        sys.exit(1)
    
    print(f"StripConfig: {args.strip_config}")
    print(f"Module     : {args.mode_path}/{args.mode_entry}")

    print(f"> Starting \"{args.mode_path}\" in NeoRuntime.")
    runtime = NeoRuntime(args.mode_path, args.mode_entry, args.strip_config)
    runtime.start()
    print ("> NeoRuntime exited...")
