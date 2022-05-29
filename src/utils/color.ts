import { colorNames } from './colorNames';

interface Hsl {
  h: number;
  s: number;
  l: number;
}

export function changeBrightness(color: string, amount: number): string {
  const hsl = toHsl(color);
  const [h, s, l] = hsl
    .replaceAll(/hsl\(| |\)|%/gi, '')
    .split(',')
    .map(Number);
  let newL = l + amount;
  if (newL < 0) newL = 0;
  if (newL > 100) newL = 100;
  return `hsl(${h}, ${s}%, ${newL}%)`;
}

export function toHsl(color: string): string {
  let h = 0;
  let s = 0;
  let l = 1;
  const firstThree = color.slice(0, 3).toUpperCase();
  if (firstThree === 'RGB') {
    const [r, g, b] = color
      .replaceAll(/(r|g|b|\(|\)| )/gi, '')
      .split(',')
      .map(value => parseInt(value));
    ({ h, s, l } = rgbToHsl(r, g, b));
  }
  if (firstThree === 'HSL') return color;
  if (firstThree === 'HWB') {
    const [hue, white, black] = color
      .replaceAll(/(h|w|b|\(|\)| |%)/gi, '')
      .split(',')
      .map(value => parseInt(value));
    ({ h, s, l } = hwbToHsl(hue, white / 100, black / 100));
  }
  if (firstThree === 'CMY') {
    const [c, m, y, k] = color
      .replaceAll(/(cmyk|\(|\)| |%)/gi, '')
      .split(',')
      .map(value => parseInt(value) / 100);
    ({ h, s, l } = cmykToHsl(c, m, y, k));
  }
  const first = color[0];
  const second = color[1];
  if (first === '#') {
    ({ h, s, l } = hexToHsl(color));
  }
  if (
    /(R|Y|G|C|B|M|W)/.test(first) &&
    !Number.isNaN(parseInt(second)) &&
    color.indexOf(',') !== -1
  ) {
    const [ncol, white, black] = color.replaceAll(/(| |%)/gi, '').split(',');
    ({ h, s, l } = ncolToHsl(
      ncol,
      parseInt(white) / 100,
      parseInt(black) / 100,
    ));
  }
  if (colorNames[color.toLowerCase()])
    ({ h, s, l } = hexToHsl(colorNames[color.toLowerCase()]));
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(
    l * 100,
  )}%)`;
}

function rgbToHsl(r: number, g: number, b: number): Hsl {
  let h = 0;
  let l = 0;
  let s = 0;
  const rgb = [r / 255, g / 255, b / 255];
  let min = rgb[0];
  let max = rgb[0];
  let maxcolor = 0;
  for (let i = 1; i < rgb.length; i++) {
    if (rgb[i] <= min) min = rgb[i];

    if (rgb[i] >= max) {
      max = rgb[i];
      maxcolor = i;
    }
  }

  if (maxcolor === 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor === 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor === 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if (Number.isNaN(h)) h = 0;
  h = h * 60;
  if (h < 0) h = h + 360;

  l = (min + max) / 2;
  if (min == max) s = 0;
  else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }
  return { h, s, l };
}

function hwbToHsl(hue: number, white: number, black: number): Hsl {
  const hslRgb = hslToRgb(hue, 1, 0.5);
  const hwbRgb = [hslRgb.r / 255, hslRgb.g / 255, hslRgb.b / 255];
  const tot = white + black;
  if (tot > 1) {
    white = Number((white / tot).toFixed(2));
    black = Number((black / tot).toFixed(2));
  }
  const [r, g, b] = hwbRgb.map(value => {
    let val = value;
    val *= 1 - white - black;
    val += white;
    return Number(val * 255);
  });
  return rgbToHsl(r, g, b);
}

function cmykToHsl(c: number, m: number, y: number, k: number): Hsl {
  const rgb = {
    r: Math.round(255 - Math.min(1, c * (1 - k) + k) * 255),
    g: Math.round(255 - Math.min(1, m * (1 - k) + k) * 255),
    b: Math.round(255 - Math.min(1, y * (1 - k) + k) * 255),
  };
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

function ncolToHsl(ncol: string, white: number, black: number): Hsl {
  const letter = ncol[0].toUpperCase();
  let h = 0;
  let percent: string | number = ncol.substring(1);
  if (percent == '') {
    percent = 0;
  }
  percent = Number(percent);
  if (isNaN(percent)) {
    percent = 0;
  }
  if (letter == 'R') {
    h = 0 + percent * 0.6;
  }
  if (letter == 'Y') {
    h = 60 + percent * 0.6;
  }
  if (letter == 'G') {
    h = 120 + percent * 0.6;
  }
  if (letter == 'C') {
    h = 180 + percent * 0.6;
  }
  if (letter == 'B') {
    h = 240 + percent * 0.6;
  }
  if (letter == 'M') {
    h = 300 + percent * 0.6;
  }
  if (letter == 'W') {
    h = 0;
    white = 1 - percent / 100;
    black = percent / 100;
  }

  return hwbToHsl(h, white, black);
}

function hexToHsl(hex: string): Hsl {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return rgbToHsl(r, g, b);
}

/**
 * @param hue value between 0 and 360
 * @param sat value between 0 and 1
 * @param light value between 0 and 1
 */
function hslToRgb(
  hue: number,
  sat: number,
  light: number,
): { r: number; g: number; b: number } {
  hue = hue / 60;
  const t2 = light <= 0.5 ? light * (sat + 1) : light + sat - light * sat;
  const t1 = light * 2 - t2;
  const r = hueToRgb(t1, t2, hue + 2) * 255;
  const g = hueToRgb(t1, t2, hue) * 255;
  const b = hueToRgb(t1, t2, hue - 2) * 255;
  return { r, g, b };
}

function hueToRgb(t1: number, t2: number, hue: number): number {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;
  if (hue < 1) return (t2 - t1) * hue + t1;
  else if (hue < 3) return t2;
  else if (hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
}
