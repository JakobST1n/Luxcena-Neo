import json
from os import path
from enum import Enum

class NeoBehaviour:
    """
    This is the base-class "main" should inherit from!
    All methods are blocking :) This means that you could potentially loose a "tick"
    For example, if "eachSecond" is taking up the thread, and the clock goes from 11:58 to 12:02, "eachHour", will not be called.
    """

    def __init__(self, package_path):
        """
        THIS METHOD SHOULD NOT BE OVERIDDEN! Use onStart if you want a setup-method!!!
        Contains basic setup 
        """
        self.vars = Variables(package_path)

    def declare_variables(self):
        """ This should be overridden, and ALL variables should be declared here. """
        return

    def on_start(self):
        """ This method will be run right after __init__ """
        return

    def each_tick(self):
        """ This method will be run every tick, that means every time the program has time """
        return

    def each_second(self):
        """ This method is called every second (on the clock), given that the thread is open """
        return

    def each_minute(self):
        """ This method is called every mintue (on the clock), given that the thread is open """
        return

    def each_hour(self):
        """ This method is called every whole hour (on the clock), given that the thread is open """
        return

    def each_day(self):
        """ This method is called every day at noon, given that the thread is open """
        return

class VariableType(Enum):
    TEXT = 1
    INT = 2
    RANGE = 3
    COLOR = 4

class Variables:

    def __init__(self, package_path):
        self.__vars = {}
        self.__vars_save_file = f"{package_path}/variables.json"
        self.__saved_variables = {}
        self.read_saved_variables()
    
    def __getattr__(self, name):
        if name in ["_Variables__vars", "_Variables__vars_save_file", "_Variables__saved_variables"]:
            return super(Variables, self).__getattr__(name)
        return self.__vars[name].value

    def __setattr__(self, name, value):
        if name in ["_Variables__vars", "_Variables__vars_save_file", "_Variables__saved_variables"]:
            super(Variables, self).__setattr__(name, value)
        elif type(value) == Variable:
            self.__vars[name] = value
        else:
            self.__vars[name].value = value
    
    def __delattr__(self, name):
        if name in ["_Variables__vars", "_Variables__vars_save_file", "_Variables__saved_variables"]:
            super(Variables, self).__delattr__(name)
        else:
            del self.__vars[name]

    def __getitem__(self, name):
        return self.__vars[name]

    def __setitem__(self, name, value):
        self.__vars[name].value = value
    
    def __contains__(self, name):
        return name in self.__vars
    
    def __repr__(self):
        return json.dumps({name: var.value for name, var in self.__vars.items()})
    
    def __str__(self):
        return repr(self)
    
    def __dir__(self):
        return super(Variables, self).__dir__() + [name for name in self.__vars.keys()]
    
    def __len__(self):
        return len(self.__vars)
    
    def __iter__(self):
        return iter(self.__vars.items())

    def declare(self, name: str, default: any, var_type: VariableType, on_change = None, **kwargs):
        """ Declare a new variable. """
        if name in self.__saved_variables:
            default = self.__saved_variables[name]
        var = Variable(self.save_variables, name, default, var_type, on_change, **kwargs)
        self.__setattr__(name, var)
    
    def read_saved_variables(self):
        """ Read saved variable values from file. """
        if not path.exists(self.__vars_save_file):  return
        try:
            with open(self.__vars_save_file, "r") as f:
                self.__saved_variables = json.load(f)
        except:
            print("Could not load saved variables")

    def save_variables(self):
        """ Save variable values to file. """
        self.__saved_variables = {name: var.value for name, var in self.__vars.items()}
        with open(self.__vars_save_file, "w") as f:
            f.write(json.dumps(self.__saved_variables))

class Variable:

    def __init__(self, save_func, key, default, var_type, on_change):
        self.__save_func = save_func
        self.__key = key
        self.__value = default
        self.__var_type = var_type
        self.__on_change = on_change
    
    @property
    def key(self): return self.__key

    @property
    def value(self): return self.__value

    @value.setter
    def value(self, value):
        self.__value = value
        self.__save_func()
        if self.__on_change is not None:
            self.__on_change(self.value)
    
    @property
    def var_type(self): return self.__var_type.name
