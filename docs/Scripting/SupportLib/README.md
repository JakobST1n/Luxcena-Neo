# Support Library

---

## `class` Strip
This is the object you are refeering to when you want to do things with LED's.
You shouldn't have to do instantiate your own new strip-object as you can use the one
set up by the software itself.
```python
LuxcenaNeo.strip
or
neo.strip
```


### Strip.show()
Display all the changes made to the LEDs, on the actual LEDs.

### Strip.setPixelColor(`n`, `color`)
Set LED at position n to the provided 24-bit color value (in RGB order).

### Strip.setPixelColorXY(`x`, `y`, `color`)
Set LED at position (x, y) in the defined matrix to the provided 24-bit color value (in RGB order).

### Strip.setPixelColorRGB(`n`, `red`, `green`, `blue`, `white = 0`)
Set LED at position n to the provided red, green, and blue color.
Each color component should be a value from 0 to 255 (where 0 is the
lowest intensity and 255 is the highest intensity).

### Strip.setPixelColorXYRGB(`x`, `y`, `red`, `green`, `blue`, `white = 0`)
Set LED at position (x, y) in the defined matrix to the provided red, green, and blue color.
Each color component should be a value from 0 to 255 (where 0 is the
lowest intensity and 255 is the highest intensity).

### Strip.setSegmentColorRGB(`segment`, `red`, `green`, `blue`, `white = 0`)
Set a whole segment to the provided red, green and blue color.
Each color component should be a value from 0 to 255 (where 0 is the
lowest intensity and 255 is the highest intensity).

### Strip.setBrightness(`brightness`)
Scale each LED in the buffer by the provided brightness.  A brightness
of 0 is the darkest and 255 is the brightest.

### Strip.getBrightness():
Get the brightness value for each LED in the buffer. A brightness
of 0 is the darkest and 255 is the brightest.

### Strip.getPixels():
Return an object which allows access to the LED display data as if
it were a sequence of 24-bit RGB values.

### Strip.numPixels():
Return the number of pixels in the display.

### Strip.getPixelColor(`n`)
Get the 24-bit RGB color value for the LED at position n.

---

## Color(`red`, `green`, `blue`, `white = 0`)
Convert the provided red, green, blue color to a 24-bit color value.
Each color component should be a value 0-255 where 0 is the lowest intensity
and 255 is the highest intensity.

## hexColor(`value`)
Convert the provided hexadecimal color to a 24-bit color value.
