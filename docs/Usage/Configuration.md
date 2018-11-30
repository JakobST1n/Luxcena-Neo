# Configuration

How to setup luxcena-neo to work with your setup

---

```bash
$ sudo lux-neo conf
```

When running the command above, a config file should appear in the editor 'nano'.
```json
{
    "led_count": 53,
    "segments": [],
    "matrix": [],
    "segmentConfiguration": "snake",
    "led_pin": 18,
    "led_freq_hz": 800000,
    "led_dma": 10,
    "led_invert": false,
    "led_channel": 0
}
```
{% hint style='tip' %}
If you rather want to use vim or another editor, the file is at `/home/lux-neo/userdata/config/strip.json`
{% endhint %}

## led_count

This is the number of LED's you want to control.

## segments

This is a simple list, here you should add the lenghts of all your segments. Please enter the "real" length, and don't start counting from 0. If you just want one segment, you should just have one element in the list, which is the number of led's you are controlling.

When summing this list, it should check out with the "led-count"-option.

## matrix

This is a two dimensonal array, used to arrange the segments in a matrix of your likings. Here you enter the segment-number to represent them. In the example above, all the segments are in one line. If you want to have them in a square, it could look like this:

```json
"segments": [10, 10, 10, 10, 10, 10, 10, 10, 10],
"matrix": [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
]
```
{% hint style='danger' %}
If you don't have a reference to all the segments or something, the matrix setup will fail. And fall back to 'segmentsconfiguration'
{% endhint %}

## segmentconfiguration

If the matrix-option is empty or badly setup. The matrix will be set up using one of these defaults:

```
"snake":
"line":
"random":
```

## led_pin
If using the luxcena-shield, you shouldn't have to worry about this option. But set it to the GPIO-port connected to your pixel's din-port.

## led_dma
{% hint style='danger' %}
If using a newer RPi (3 or newer), leave this as 10! Or your file-system might crash.
{% endhint %}
This is the dma-channel used to generate the data-stream. If you for some reason need channel 10 for something else, you can change it. But i strongly recommend leaving it to 10!

## led_invert
This should not be touched, unless you are using a inverting level converter.

## led_channel
Leave this as default unless you know what you are doing.