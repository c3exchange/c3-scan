export const hexToRgba = (hex: string, opacity?: number): string => {
  let r, g, b;
  const alpha = opacity !== undefined ? opacity / 100 : 1;
  hex = hex.replace('#', '');

  if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (hex.length === 3) {
    r = parseInt(hex.charAt(0).repeat(2), 16);
    g = parseInt(hex.charAt(1).repeat(2), 16);
    b = parseInt(hex.charAt(2).repeat(2), 16);
  } else {
    throw new Error('Invalid hex color format');
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
