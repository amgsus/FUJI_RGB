# Bicycle Light Controller (RP2040-based)

I like to ride my bicycle at the evening, when the sun goes down and it is not so hot. To keep me visible in the dark, I created this project.

The project uses [Kaluma.js](https://github.com/kaluma-project/kaluma), a Raspberry Pico (RP2040) board and the bunch of addressable LED strips of NeoPixels (WS2812B).

It is pretty simple to make.

Wish you have safe and funny ride! :)

## Connections

### Inputs

- `GP2` is an input for a RED switch.
- `GP3` is an input for a GREEN switch.
- `GP4` is an input for a BLUE switch.

Note: The described above inputs must be pulled up HIGH with an external resistor (10-20 kOhm) to the 3V3 rail of Raspberry Pico.

### Outputs

- `GP14` is data output to an addressable LED strip of NeoPixels (WS2812B or any other with the same protocol). Connected directly to the DAT pin of the strip.

## Controls

### Red Switch

The RED switch cycles through light modes. These are:

- Color (static)
- HUE-wheel (dynamic), 3 sec/cycle

### Green Switch

In static color mode, the GREEN switch changes emitting color. Colors are changed cyclicly (6 colors). These are:

- Red
- Green
- Blue
- Yellow
- Magenta
- Cyan
- White (hold for 3 seconds)

Note: White color consumes most current (~60mA per LED). Keep attention at the possibilities of your 5V power supply and the battery when switching to this color to avoid risk of damage.

### Blue Switch

The BLUE switch is reserved for future use and has no function yet.

## License

You are free to use this code for your own. Also you can contribute your awesome ideas to the project.

The project uses [NeoPixel library](https://github.com/niklauslee/neopixel) written by Minkyu Lee.
