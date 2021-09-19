# Support Library

---

## `class` Strip
This is the object you are refeering to when you want to do things with LED's.
You shouldn't have to do instantiate your own new strip-object as you can use the one
set up by the software itself.


### strip.show()
Display all the changes made to the LEDs, on the actual LEDs.

### strip.set_pixel_color(`n`, `*color`)
Set LED at position n to the provided 24-bit color value (in RGB order).

### strip.set_pixel_color_XY(`x`, `y`, `*color`)
Set LED at position (x, y) in the defined matrix to the provided 24-bit color value (in RGB order).

### strip.set_segment_color(`segment`, `*color`)
Set a whole segment to the provided red, green and blue color.
Each color component should be a value from 0 to 255 (where 0 is the
lowest intensity and 255 is the highest intensity).

### strip.get_pixels():
Return an object which allows access to the LED display data as if
it were a sequence of 24-bit RGB values.

### strip.num_pixels():
Return the number of pixels in the display.

### strip.get_pixel_color(`n`)
Get the 24-bit RGB color value for the LED at position n.

## `*color``
All functions that take in this, will automatically parse the value provided.

If parameter is only a str, it will be treated as a hex value. e.g. `set_pixel_color(0, "#fafafa")`
If parameter is a tuple, the first three items in that tuple will be treated as a rgb value. e.g. `set_pixel_color(0, (255, 238, 10))`
If parameter is a int, it will be treated as a 24-bit color value. e.g. `set_pixel_color(0, 2812873)`
If there are 3 parameters, these will be treated as a rgb value. e.g. `set_pixel_color(0, 255, 238, 10)`
This means that all of these have the same effect:
```
set_pixel_color(0, "#fafafa")
set_pixel_color(0, 16448250)
set_pixel_color(0, 250, 250, 250)
set_pixel_color(0, (250, 250, 250))
```

---

These are in `utils`, can be imported with `from luxcena_neo import utils`.

## utils.hex_to_rgb(`value`)
Convert provided hex color to a tuple with rgb colors. (r, g, b).

## utils.rgb_to_hex(`rgb`)
Converts rgb colors in tuple to hex string.

## utils.rgb_from_24bit(`color`)
Takes a 24bit color value and returns a rgb tuple.

## utils.rgb_from_24bit(`color`)
Takes a 24bit color value and returns a hex string.
