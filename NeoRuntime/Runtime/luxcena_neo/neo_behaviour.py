import json
from os import path
from enum import Enum
from .strip import detect_format_convert_color
from .color_utils import rgb_from_twentyfour_bit, hex_from_twentyfour_bit

class NeoBehaviour:
    """ This is the base-class "main" should inherit from!
    
    Note: All methods are blocking
          This means that you could potentially loose a "tick"
          
          For example, if "eachSecond" is taking up the thread, and the clock goes from 11:58 to 12:02, "eachHour", will not be called.

    Danger: Do NOT override __init__ in your implementation, this will break some features.
               For this purpose you should instead use the [on_start][luxcena_neo.neo_behaviour.NeoBehaviour.on_start] method!

    Important: An instance of the [Strip][luxcena_neo.strip.Strip] class will be available in your module as `strip` without any setup on your part.
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
        """ This should be overridden, and ALL variables should be declared here.
            When this method is called, variables can be declared using `self.declare()`. """
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
    BOOL = 5
    TRIGGER = 6

class Variables:

    def __init__(self, package_path):
        self.__vars = {}
        self.__vars_save_file = "{}/state.json".format(package_path)
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
            raise Exception("Variable with name {} already defined.".format(variable.name))
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
    """ The base class for any variable, this should _probably_ not be used directly. """

    def __init__(self, name, default, var_type: VariableType, on_change = None):
        """ The base constructor for any variable. All these parameters should likely be passed on by
            the subclass inheriting this one.

        Args:
            name: A string which is the name of the variable, keep in mind that this is case sensitive.
            default: This will be set as the default value of the variable the first time the script is started.
            var_type: This is the enum number of the variable type, this is just a number which is used to
                      communicate with the frontend which value picker to show.
            on_change: Optional callable, which will be called with the new value every time the variable is
                       updated (both programatically and via user input).
        """
        self.__name = name
        self.__value = default
        self.__var_type = var_type
        self.__on_change = on_change
        self.__save_func = None
    
    @property
    def name(self): return self.__name

    @property
    def value(self):
        """ This is likely the property you should use to get the current value of the variable. """
        return self.__value

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
        return "{}: {}".format(self.name, self.value)

    def set_save_func(self, save_func):
        self.__save_func = save_func

class ColorVariable(Variable):
    """ This is a variable storing a color value. 

    Note: Right now, this only properly supports setting the value as a hex string.
          This will hopefully change in the future, but it is likely that the main
          operation will remain as hex strings.
    """

    def __init__(self, name: str, *color, **kwargs):
        """ Constructor for a color variable

        Args:
            name: Will be passed on to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
            *color: The next positional parameters will be used as the default color.
                    Right now, it will just pick the first one, and interpret it as a hex color.
            **kwargs: Keyword arguments will be passed to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
        """
        if not self.verify_color(*color):
            raise Exception("Invalid color {}".format(color))
        super().__init__(name, self.extract_interesting(*color), VariableType.COLOR, **kwargs)
    
    @Variable.value.setter
    def value(self, *color):
        if not self.verify_color(*color):
            print("Attempting to set {} to invalid value {}".format(self.name, color))
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
    """ A variable for storing a integer value (whole number). """

    def __init__(self, name: str, default: int = 0, min_val: int = 0, max_val: int = 255, **kwargs):
        """ Constructor for a integer variable

        Args:
            name: Will be passed on to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
            default: A number which will be set as the default if the mode has never been run before.
            min_val: The lowest value this variable can have (inclusive).
            max_val: The highest value this variable can have (inclusive).
            **kwargs: Keyword arguments will be passed to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
        """
        self.__min = min_val
        self.__max = max_val
        super().__init__(name, default, VariableType.INT, **kwargs)
    
    @Variable.value.setter
    def value(self, value):
        try:
            value = int(value)
            if (self.__min <= value <= self.__max):
                super(IntegerVariable, type(self)).value.fset(self, value)
            else:
                print("Attempted to set {} to {} but range is [{},{}].".format(self.name, value, self.__min, self.__max))
        except ValueError:
            print("Attempted to set {} to \"{}\", which is not a valid integer...".format(self.name, value))

    def to_dict(self):
        return {"name": self.name, "value": self.value, "type": self.var_type, "min": self.__min, "max": self.__max}


class FloatVariable(Variable):
    """ A variable for storing a float value (decimal number). """

    def __init__(self, name: str, default: float = 0.0, min_val: float = 0.0, max_val: float = 255.0, step: float = 0.5, **kwargs):
        """ Constructor for a float variable

        Args:
            name: Will be passed on to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
            default: A number which will be set as the default if the mode has never been run before.
            min_val: The lowest value this variable can have (inclusive).
            max_val: The highest value this variable can have (inclusive).
            step: This does not affect the python code, it only affects the value picker which will be shown in the frontend.
            **kwargs: Keyword arguments will be passed to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
        """
        self.__min = min_val
        self.__max = max_val
        self.__step = step
        super().__init__(name, default, VariableType.FLOAT, **kwargs)
    
    @Variable.value.setter
    def value(self, value):
        try:
            value = float(value)
            if (self.__min <= value <= self.__max):
                super(FloatVariable, type(self)).value.fset(self, value)
            else:
                print("Attempted to set {} to {} but range is [{},{}].".format(self.name, value, self.__min, self.__max))
        except ValueError:
            print("Attempted to set {} to \"{}\", which is not a valid float...".format(self.name, self.value))
    
    def __str__(self):
        return round(self.value, 2)

    def to_dict(self):
        return {"name": self.name, "value": self.value, "type": self.var_type, "min": self.__min, "max": self.__max, "step": self.__step}



class BooleanVariable(Variable):
    """ A variable for storing a boolean value (on/off). """

    def __init__(self, name: str, default: bool, **kwargs):
        """ Constructor for a boolean variable

        Args:
            name: Will be passed on to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
            default: A boolean which will be set as the default if the mode has never been run before.
            **kwargs: Keyword arguments will be passed to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
        """
        super().__init__(name, default, VariableType.BOOL, **kwargs)
    
    @Variable.value.setter
    def value(self, value):
        try:
            value = value.lower() == "true"
            super(BooleanVariable, type(self)).value.fset(self, value)
        except:
            print("Attempted to set {} to \"{}\", which is not a valid bool...".format(self.name, value))

class Trigger(Variable):
    """ A trigger which can execute some function.

    Although technically a variable, this is not intended as one.
    It is intended to be used with a on_change function, such that 
    this action is performed when this trigger is activated.

    It will show up as a button in the frontend, and can also be triggered by
    setting the value (What you set it as will be ignored, so e.g. None. """

    def __init__(self, name: str, **kwargs):
        """ Constructor for the Trigger
        It is important to set the on_change callable (see the Variable class). If you don't
        this class is completely useless.

        Args:
            name: The name of the trigger variable (mostly useful if you wanted to trigger it in the code).
            **kwargs: Keyword arguments will be passed to the parent class ([Variable][luxcena_neo.neo_behaviour.Variable]).
        """
        super().__init__(name, False, VariableType.TRIGGER, **kwargs)
    
    @Variable.value.setter
    def value(self, value):
        super(Trigger, type(self)).value.fset(self, False)
