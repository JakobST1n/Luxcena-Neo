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
import socket
from os import path, remove
from inspect import signature

from luxcena_neo.strip import Strip

def init_strip(strip_config_file):
    """ Initialize a strip object with a config file path. """
    print("> Loading pixel-configuration...")
    strip_config_obj = configparser.ConfigParser()
    strip_config_obj.read(args.strip_config)
    strip_config = dict(strip_config_obj.items("DEFAULT"))
    strip_config["matrix"] = json.loads(strip_config_obj.get("DEFAULT", "matrix").replace('"', ""))
    strip_config["segments"] = [int(x) for x in strip_config_obj.get("DEFAULT", "segments").split(" ")]
    strip_config["led_channel"] = strip_config_obj.getint("DEFAULT", "led_channel")
    strip_config["led_dma"] = strip_config_obj.getint("DEFAULT", "led_dma")
    strip_config["led_freq_hz"] = strip_config_obj.getint("DEFAULT", "led_freq_hz")
    strip_config["led_invert"] = strip_config_obj.getboolean("DEFAULT", "led_invert")
    strip_config["led_pin"] = strip_config_obj.getint("DEFAULT", "led_pin")
    strip = Strip(strip_config)
    return strip

def init_package(package_path, entry_module, strip):
    """ Initialize the package we are going to run. """
    print ("> Initializing package (mode)...")
    sys.path.append(package_path)
    module = importlib.import_module(entry_module)

    # Make the strip instance available in our modules
    setattr(module, "strip", strip)

    module_entry_instance = module.Main(package_path)

    return module_entry_instance

def exec_module(module_executor_loop_func):
    """ Create and start a new thread to run the package loop. """
    th = threading.Thread(target=module_executor_loop_func, daemon=True)
    th.start()
    return th

class NeoRuntime:


    def __init__(self, package_path, entry_module, strip_config_file, socket_file):
        self.__strip = init_strip(strip_config_file)
        self.__module_entry_instance = init_package(package_path, entry_module, self.__strip)
        self.__module_th = None
        self.__socket_file = socket_file
        self.__send_strip_buffer = False


    def start(self):
        # The mode is starting in it's own thread
        print("> Running the mode...")
        self.__module_th = exec_module(self.__module_loop)

        # This will run in this thread.
        print("> Starting to listen on stdin")
        self.__s = None
        try:
            self.__bind_socket()
            self.__socket_listener()
        except KeyboardInterrupt:
            print("Exiting...")
        except Exception as e:
            traceback.print_exc()
        finally:
            self.__close_socket()

    def __bind_socket(self):
        if path.exists(self.__socket_file):
            remove(self.__socket_file)

        self.__s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
        self.__s.bind(self.__socket_file)
        self.__s.listen(1)

    def __socket_listener(self):
        self.__s_clients = []
        last_send = time.perf_counter()

        while True:
            if not self.__module_th.is_alive(): break

            r, w, e = select.select([self.__s, *self.__s_clients], self.__s_clients, [], 0)

            if (time.perf_counter() - last_send) > 0.5:
                states = {
                    "variables": self.__module_entry_instance.var.to_dict(),
                    "globvars": {
                        "power_on": self.__strip.power_on,
                        "brightness": self.__strip.brightness
                    }
                }
                buf = bytes([1]) + bytes(json.dumps(states), "ascii")

                for ws in w:
                    try:
                        ws.send(buf)
                    except BrokenPipeError:
                        self.__s_clients.remove(ws)
                        ws.close()

                last_send = time.perf_counter()

            for rs in r:
                if rs is self.__s:
                    c, a = self.__s.accept()
                    self.__s_clients.append(c)
                else:
                    data = rs.recv(128)
                    if not data:
                        self.__s_clients.remove(rs)
                        rs.close()
                    else:
                        try:
                            self.__execute_command(data)
                        except Exception as e:
                            traceback.print_exc()

    def __close_socket(self):
        if (self.__s is None): return
        r, w, e = select.select([self.__s, *self.__s_clients], self.__s_clients, [], 0)
        for ws in w:
            try:
                ws.shutdown(socket.SHUT_RDWR)
            except BrokenPipeError:
                ws.close()
            self.__s_clients.remove(ws)
            ws.close()
        self.__s.close()



    def __execute_command(self, command):
        """
        command should be of type bytes
        first byte indicates command type (currently setglob or setvar)

        for command type 1
          byte 1 indicates which globvar
          byte 2 indicates value
        for command type 2
          first 32 bytes are the var name

        """
        # print(command.hex(" "))
        if command[0] == 0:
            if command[1] == 0:
                self.__strip.power_on = (command[2] == 1)
            elif command[1] == 1:
                self.__strip.brightness = command[2]
            else:
                print("Unknown globvar {}.".format(command[1]))
        elif command[0] == 1:
            name  = command[3:3+command[1]].decode("ascii")
            value = command[3+command[1]:3+command[1]+command[2]].decode("ascii")
            if name in self.__module_entry_instance.var:
                self.__module_entry_instance.var[name] = value
            else:
                print("Unknown variable ".format(name))
        elif command[0] == 2:
            self.__send_strip_buffer = (command[1] == 1)
        else:
            print("UNKNOWN COMMAND")


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
        if (len(signature(self.__module_entry_instance.each_tick).parameters) == 2):
            self.__module_entry_instance.each_tick(deltatime)
        else:
            self.__module_entry_instance.each_tick()

        if (runningtime - self.__module_last_second > 1):
            if (len(signature(self.__module_entry_instance.each_second).parameters) == 2):
                self.__module_entry_instance.each_second(time.perf_counter() - self.__module_last_second)
            else:
                self.__module_entry_instance.each_second()
            self.__module_last_second = time.perf_counter()

        if (((runningtime - self.__module_last_minute) % 60) >= 1):
            if (len(signature(self.__module_entry_instance.each_minute).parameters) == 2):
                self.__module_entry_instance.each_minute(time.perf_counter() - self.__module_last_minute)
            else:
                self.__module_entry_instance.each_minute()
            self.__module_last_minute = time.perf_counter()

        if (((runningtime - self.__module_last_hour) % 3600) >= 1):
            if (len(signature(self.__module_entry_instance.each_hour).parameters) == 2):
                self.__module_entry_instance.each_hour(time.perf_counter() - self.__module_last_hour)
            else:
                self.__module_entry_instance.each_hour()
            self.__module_last_hour = time.perf_counter()

        if (((runningtime - self.__module_last_day) % 86400) >= 1):
            if (len(signature(self.__module_entry_instance.each_day).parameters) == 2):
                self.__module_entry_instance.each_day(time.perf_counter() - self.__module_last_day)
            else:
                self.__module_entry_instance.each_day()
            self.__module_last_day = time.perf_counter()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--strip-config', help='Path to the strip config file.')
    parser.add_argument('--mode-path', help='Path of the folder the mode is in.')
    parser.add_argument('--mode-entry', help='Path of the module that is the entry-point of the module.')
    parser.add_argument('--socket-file', help='The socket file the runtime will use to allow communication [default: /tmp/neo_runtime.sock].', default='/tmp/neo_runtime.sock')
    parser.add_argument('--socket-enable', help='Wether to enable socket communication [default: true].', default=True)
    args = parser.parse_args()

    args.strip_config = args.strip_config.replace("\"", "")
    args.mode_path = args.mode_path.replace("\"", "")
    args.mode_entry = args.mode_entry.replace("\"", "")
    args.socket_file = args.socket_file.replace("\"", "")
    if not path.exists(args.strip_config):
        print("Strip config not found ({})".format(args.strip_config))
        sys.exit(1)
    if not path.exists(args.mode_path):
        print("Mode path not found ({})".format(args.mode_path))
        sys.exit(1)
    if not path.exists("{}/{}.py".format(args.mode_path, args.mode_entry)):
        print("Mode entry not found in mode path ({}/{})".format(args.mode_path, args.mode_entry))
        sys.exit(1)

    print("StripConfig: ".format(args.strip_config))
    print("Module     : ".format(args.mode_path, args.mode_entry))

    print("> Starting \"{}\" in NeoRuntime.".format(args.mode_path))
    runtime = NeoRuntime(args.mode_path, args.mode_entry, args.strip_config, args.socket_file)
    runtime.start()
    print ("> NeoRuntime exited...")
