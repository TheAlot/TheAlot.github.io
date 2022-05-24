import { toHsl } from "../color";

describe('Color converter', () => {
  it('converts rgb to hsl', () => {
    expect(toHsl('rgb(255, 255, 255)')).toBe('hsl(0, 0%, 100%)');
    expect(toHsl('rgb(255, 0, 0)')).toBe('hsl(0, 100%, 50%)');
    expect(toHsl('rgb(11, 233, 11)')).toBe('hsl(120, 91%, 48%)')
  });
  it('converts hwb to hsl', () => {
    expect(toHsl('hwb(0, 31%, 0%)')).toBe('hsl(0, 100%, 66%)')
  })
});
