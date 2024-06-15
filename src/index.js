const { NeoPixel } = require('neopixel');

const NUM_DOWN_TUBE_LEDS = 36;

const PIN = 14; // GP14

const LENGTH = NUM_DOWN_TUBE_LEDS;

const np = new NeoPixel(PIN, LENGTH);

// const colors = [
//   np.color(0xff, 0, 0), // red
//   np.color(0, 0xff, 0), // green
//   np.color(0, 0, 0xff), // blue
//   np.color(0xff, 0xff, 0), // yellow
//   np.color(0xff, 0, 0xff), // magenta
//   np.color(0, 0xff, 0xff), // cyan
//   np.color(0xff, 0xff, 0xff), // white
// ];

let hueAngle = 0;
let time = 36*3; // millisecond

setInterval(() => {
    hueAngle = ( hueAngle + 1 ) % 360;

    let [ r, g, b ] = hsl2rgb(hueAngle, 1.0, 0.5);
    let color = np.color(r * 255, g * 255, b * 255);

    for ( let i = 0; i < np.length; i++ ) {
        np.setPixel(i, color);
    }
    
    np.show();
}, time);

// // input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
// // https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hsl2rgb(h,s,l) 
{
   let a=s*Math.min(l,1-l);
   let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
   return [f(0),f(8),f(4)];
} 

// https://gist.github.com/mjackson/5311256

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
// function hsvToRgb(h, s, v) 
// {
//   var r, g, b;

//   var i = Math.floor(h * 6);
//   var f = h * 6 - i;
//   var p = v * (1 - s);
//   var q = v * (1 - f * s);
//   var t = v * (1 - (1 - f) * s);

//   switch (i % 6) {
//     case 0: r = v, g = t, b = p; break;
//     case 1: r = q, g = v, b = p; break;
//     case 2: r = p, g = v, b = t; break;
//     case 3: r = p, g = q, b = v; break;
//     case 4: r = t, g = p, b = v; break;
//     case 5: r = v, g = p, b = q; break;
//   }

//   return [ r * 255, g * 255, b * 255 ];
// }
