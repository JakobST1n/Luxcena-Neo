# Documentation for `NeoBehaviour`

::: luxcena_neo.neo_behaviour.NeoBehaviour
    handler: python
    options:
      show_root_heading: true
      show_source: false
      filters: ["!^__init__"]


### An example of the usage of the class
```python
from luxcena_neo import NeoBehaviour

class Main(NeoBehaviour):
    def on_start(self):
        strip.setPixelColor(0, "#fafafa")
```

---

::: luxcena_neo.neo_behaviour.Variable
    handler: python
    options:
      show_root_heading: true
      show_source: false

---

::: luxcena_neo.neo_behaviour.ColorVariable
    handler: python
    options:
      show_root_heading: true
      show_source: false

---

::: luxcena_neo.neo_behaviour.IntegerVariable
    handler: python
    options:
      show_root_heading: true
      show_source: false

---

::: luxcena_neo.neo_behaviour.FloatVariable
    handler: python
    options:
      show_root_heading: true
      show_source: false
      #show_category_heading: true
      #show_if_no_docstring: true

---

::: luxcena_neo.neo_behaviour.BooleanVariable
    handler: python
    options:
      show_root_heading: true
      show_source: false

---

::: luxcena_neo.neo_behaviour.Trigger
    handler: python
    options:
      show_root_heading: true
      show_source: false
