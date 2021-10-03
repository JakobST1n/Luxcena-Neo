import json
from os import path
from enum import Enum
from .strip import detect_format_convert_color
from .color_utils import rgb_from_24bit, hex_from_24bit

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
        self.var = Variables(package_path)

        self.declare = self.var.declare
        self.declare_variables()
        del self.declare

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
    FLOAT = 3
    COLOR = 4

class Variables:

    def __init__(self, package_path):
        self.__vars = {}
        self.__vars_save_file = f"{package_path}/state.json"
        self.__saved_variables = {}
        self.read_saved_variables()
    
    def __getattr__(self, name):
        if name in ["_Variables__vars", "_Variables__vars_save_file", "_Variables__saved_variables"]:
            return super(Variables, self).__getattr__(name)
        return self.__vars[name].value

    def __setattr__(self, name, value):
        if name in ["_Variables__vars", "_Variables__vars_save_file", "_Variables__saved_variables"]:
            super(Variables, self).__setattr__(name, value)
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

    def declare(self, variable):
        """ Declare a new variable. """
        if variable.name in self.__vars:
            raise Exception(f"Variable with name {variable.name} already defined.")
        if variable.name in self.__saved_variables:
            variable.value = self.__saved_variables[variable.name]

        variable.set_save_func(self.save_variables)
        self.__vars[variable.name] = variable
    
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

    def to_dict(self):
        return {x.name: x.to_dict() for x in self.__vars.values()}

class Variable:

    def __init__(self, name, default, var_type: VariableType, on_change = None):
        self.__name = name
        self.__value = default
        self.__var_type = var_type
        self.__on_change = on_change
        self.__save_func = None
    
    @property
    def name(self): return self.__name

    @property
    def value(self): return self.__value

    @value.setter
    def value(self, value):
        self.__value = value
        if self.__save_func is not None:
            self.__save_func()
        if self.__on_change is not None:
            self.__on_change(self.value)
    
    @property
    def var_type(self): return self.__var_type.name

    def to_dict(self):
        return {"name": self.name, "value": self.value, "type": self.var_type}
    
    def __str__(self):
        return f"{self.name}: {self.value}"

    def set_save_func(self, save_func):
        self.__save_func = save_func

class ColorVariable(Variable):

    def __init__(self, name: str, *color, **kwargs):
        if not self.verify_color(*color):
            raise Exception(f"Invalid color {color}")
        super().__init__(name, self.extract_interesting(*color), VariableType.COLOR, **kwargs)
    
    @Variable.value.setter
    def value(self, *color):
        if not self.verify_color(*color):
            print(f"Attempting to set {self.name} to invalid value {color}")
            return
        super(ColorVariable, type(self)).value.fset(self, self.extract_interesting(*color))

    def verify_color(self, *color):
        if (len(color) == 1) and (isinstance(color[0], str)):
            return True
        if (len(color) == 1) and (isinstance(color[0], tuple)):
            if len(color[0]) != 3: return False
            for c in color[0]:
                if not (0 <= c <= 255): return False
            return True
        if (len(color) == 1) and (isinstance(color[0], int)):
            return True
        if (len(color) == 3):
            for c in color:
                if not isinstance(c, int): return False
                if not (0 <= c <= 255): return False
                return True
        return False
    
    def extract_interesting(self, *color):
        if (len(color) == 1): return color[0]
        return color

class IntegerVariable(Variable):

    def __init__(self, name: str, default: int = 0, min_val: int = 0, max_val: int = 255, **kwargs):
        self.__min = min_val
        self.__max = max_val
        super().__init__(name, default, VariableType.INT)
    
    @Variable.value.setter
    def value(self, value):
        try:
            value = int(value)
            if (self.__min <= value <= self.__max):
                super(ColorVariable, type(self)).value.fset(self, value)
            else:
                print(f"Attempted to set {self.name} to {value} but range is [{self.__min},{self.__max}].")
        except ValueError:
            print(f"Attempted to set {self.name} to \"{value}\", which is not a valid integer...")

    def to_dict(self):
        return {"name": self.name, "value": self.value, "type": self.var_type, "min": self.__min, "max": self.__max}


class FloatVariable(Variable):

    def __init__(self, name: str, default: float = 0.0, min_val: float = 0.0, max_val: float = 255.0, **kwargs):
        self.__min = min_val
        self.__max = max_val
        super().__init__(name, default, VariableType.FLOAT)
    
    @Variable.value.setter
    def value(self, value):
        try:
            value = float(value)
            if (self.__min <= value <= self.__max):
                super(ColorVariable, type(self)).value.fset(self, value)
            else:
                print(f"Attempted to set {self.name} to {value} but range is [{self.__min},{self.__max}].")
        except ValueError:
            print(f"Attempted to set {self.name} to \"{value}\", which is not a valid float...")
    
    def __str__(self):
        return round(self.value, 2)

    def to_dict(self):
        return {"name": self.name, "value": self.value, "type": self.var_type, "min": self.__min, "max": self.__max}
