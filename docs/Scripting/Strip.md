# Documentation for `strip`

::: luxcena_neo.strip.Strip
    handler: python
    options:
      show_root_heading: true
      show_source: false

---

## A note on colors
Most methods which need colors takes a `*color` parameter. This is because it interprets multiple types of colors. The example below illustrates this, each of the lines has the exact same effect on the led strip.
```python
set_pixel_color(0, "#fafafa")
set_pixel_color(0, 16448250)
set_pixel_color(0, 250, 250, 250)
set_pixel_color(0, (250, 250, 250))
```
