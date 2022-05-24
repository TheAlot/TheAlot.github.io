const colorNames = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen',
];

export function toHsl(color: string): string {
  const firstThree = color.slice(0, 3).toUpperCase();
  if (firstThree === 'RGB') return rgbToHsl(color);
  if (firstThree === 'HSL') return color;
  if (firstThree === 'HWB') return hwbToHsl(color);
  if (firstThree === 'CMY') return cmykToHsl(color);
  const first = color[0];
  const second = color[1];
  if (first === '#') return hexToHsl(color);
  if (
    /(R|Y|G|C|B|M|W)/.test(first) &&
    !Number.isNaN(second) &&
    color.length === 6 &&
    color.indexOf(',') !== -1
  ) {
    return ncolToHsl(color);
  }
  if (colorNames.includes(color)) return nameToHsl(color);
  console.log(
    'Unknown color string provided',
    firstThree,
    first,
    second,
    color,
  );
  return 'hsl(0, 0%, 100%)';
}

function rgbToHsl(color: string): string {
  let h = 0;
  let l = 0;
  let s = 0;
  const [r, g, b] = color.replaceAll(/(r|g|b|\(|\)| )/gi, '').split(',');
  const rgb = [Number(r) / 255, Number(g) / 255, Number(b) / 255];
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
  return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function hwbToHsl(color: string): string {
  // let newH = 0;
  // let s = 0;
  // let l = 0;
  // const [h, w, b] = color.replaceAll(/(h|w|b|\(|\)| )/gi, '').split(',');
  return color;
}

function cmykToHsl(color: string): string {
  console.log('cmykToHsl', color);
  return color;
}

function hexToHsl(color: string): string {
  console.log('hextToHsl', color);
  return color;
}

function ncolToHsl(color: string): string {
  console.log('ncolToHsl', color);
  return color;
}

function nameToHsl(color: string): string {
  console.log('nameToHsl', color);
  return color;
}
