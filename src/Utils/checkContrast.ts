type RGBA = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

export const hexToRgb = (hex: string): RGBA => {
  hex = hex.replace(/^#/, '');
  let alpha = 255;

  if (hex.length === 8) {
    alpha = parseInt(hex.slice(6, 8), 16);
    hex = hex.substring(0, 6);
  }

  if (hex.length === 4) {
    alpha = parseInt(hex.slice(3, 4).repeat(2), 16);
    hex = hex.substring(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const num = parseInt(hex, 16);
  const red = num >> 16;
  const green = (num >> 8) & 255;
  const blue = num & 255;

  return { red, green, blue, alpha };
};

export const luminance = (a: number, b: number) => {
  const l1 = Math.max(a, b);
  const l2 = Math.min(a, b);
  return (l1 + 0.05) / (l2 + 0.05);
};

export const rgbContrast = (a: RGBA, b: RGBA) => {
  return luminance(relativeLuminance(a), relativeLuminance(b));
};

// calculate the color contrast ratio
export const checkContrast = (hexC1: string, hexC2: string) => {
  const color1rgb = hexToRgb(hexC1);
  const color2rgb = hexToRgb(hexC2);

  const contrast = rgbContrast(color1rgb, color2rgb);

  if (contrast >= 7) {
    return 'AAA';
  }

  if (contrast >= 4.5) {
    return 'AA';
  }

  if (contrast >= 3) {
    return 'AA Large';
  }

  return 'Fail';
};

// red, green, and blue coefficients
const rc = 0.2126;
const gc = 0.7152;
const bc = 0.0722;
// low-gamma adjust coefficient
const lowc = 1 / 12.92;

function adjustGamma(_) {
  return Math.pow((_ + 0.055) / 1.055, 2.4);
}

export const relativeLuminance = (rgb: RGBA) => {
  const rsrgb = rgb.red / 255;
  const gsrgb = rgb.green / 255;
  const bsrgb = rgb.blue / 255;

  const r = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb);
  const g = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb);
  const b = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);

  return r * rc + g * gc + b * bc;
};
