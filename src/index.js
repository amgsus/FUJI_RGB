const { NeoPixel } = require('neopixel');

const NUM_DOWN_TUBE_LEDS = 36;
const LENGTH = NUM_DOWN_TUBE_LEDS;

const DAT_PIN = 14; // GP14
const BTN_RED = 2;
const BTN_GREEN = 3;
const BTN_BLUE = 4;

const PREDEFINED_COLORS_COUNT = 6;

const MODE_CONSTANT = 0;
const MODE_HUE = 1;

const HUE_UPDATE_INTERVAL = 36 * 3; // ms

const NO_COLOR = np.color(0, 0, 0);
const WHITE_COLOR = np.color(0xff, 0xff, 0xff);

const PREDEFINED_COLORS = [
    np.color(0xff, 0, 0),       // Red
    np.color(0, 0xff, 0),       // Green
    np.color(0, 0, 0xff),       // Blue
    np.color(0xff, 0xff, 0),    // Yellow
    np.color(0xff, 0, 0xff),    // Magenta
    np.color(0, 0xff, 0xff),    // Cyan
    // Out of cycle
    WHITE_COLOR
];

const np = new NeoPixel(DAT_PIN, LENGTH);

let colorIndex = 1; // Green
let emittingColor = PREDEFINED_COLORS[0];
let mode = MODE_CONSTANT;
let hueAngle = 0;
let updateTimer = null;

(() => {
    setWatch(buttonClick, BTN_RED, RISING, 50);
    setWatch(buttonClick, BTN_GREEN, RISING, 50);
    setWatch(buttonHold , BTN_GREEN, LOW_LEVEL, 3000);
    setWatch(buttonClick, BTN_BLUE, RISING, 50);

    requireUpdate();
})();

function
setWhiteColor()
{
    colorIndex = PREDEFINED_COLORS_COUNT;
    emittingColor = PREDEFINED_COLORS[colorIndex];
}

function
nextColor()
{
    colorIndex = (colorIndex + 1) % PREDEFINED_COLORS_COUNT;
    emittingColor = PREDEFINED_COLORS[colorIndex];
}

function
buttonClick(pin)
{
    switch (pin) {
        case BTN_RED:
            if (mode === MODE_CONSTANT) {
                mode = MODE_HUE;
            } else if (mode === MODE_HUE) {
                mode = MODE_CONSTANT;
            }
            requireUpdate();
            break;
        case BTN_GREEN:
            if (mode === MODE_CONSTANT) {
                nextColor();
                requireUpdate();
            }
            break;
        case BTN_BLUE:
            // Not used
            break;
    }
}

function
buttonHold(pin)
{
    if (pin === BTN_GREEN) {
        if (mode === MODE_CONSTANT) {
            setWhiteColor();
            requireUpdate();
        }
    }
}

function
requireUpdate()
{
    if (updateTimer) {
        clearInterval(updateTimer);
    }

    switch (mode) {
        case MODE_CONSTANT:
            setPixels(PREDEFINED_COLORS[colorIndex]);
            enableConstantColor();
            break;
        case MODE_HUE:
            hueAngle = 0;
            enableHueWheel();
            break;
    }
}

function
enableConstantColor()
{
    refreshPixels();
    updateTimer = setInterval(refreshPixels, 5000);
}

function
enableHueWheel()
{
    hueWheelUpdate();
    updateTimer = setInterval(hueWheelUpdate, HUE_UPDATE_INTERVAL);
}

function
setPixels(color, evenFirst = false) // Sets either odd, or even LEDs (reducing power consumption)
{
    let skip = evenFirst;

    for ( let i = 0; i < np.length; i++ ) {
        np.setPixel(i, skip ? NO_COLOR : color);
        skip = !skip;
    }
}

function
refreshPixels()
{
    np.show();
}

function
hueWheelUpdate()
{
    hueAngle = ( hueAngle + 1 ) % 360;
    let [ r, g, b ] = hsl2rgb(hueAngle, 1.0, 0.5);
    let color = np.color(r * 255, g * 255, b * 255);
    setPixels(color);
    refreshPixels();
}

// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
//      https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function 
hsl2rgb(h, s, l)
{
   let a = s * Math.min(l, 1 - l);
   const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
   return [ f(0), f(8), f(4) ];
}
