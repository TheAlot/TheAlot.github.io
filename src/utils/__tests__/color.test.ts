import { toHsl } from '../color';

describe('Color converter', () => {
  it('converts rgb to hsl', () => {
    expect(toHsl('rgb(255, 255, 255)')).toBe('hsl(0, 0%, 100%)');
    expect(toHsl('rgb(255, 0, 0)')).toBe('hsl(0, 100%, 50%)');
    expect(toHsl('rgb(11, 233, 11)')).toBe('hsl(120, 91%, 48%)');
  });
  it('converts hwb to hsl', () => {
    expect(toHsl('hwb(0, 31%, 0%)')).toBe('hsl(0, 100%, 66%)');
    expect(toHsl('hwb(223, 31%, 25%)')).toBe('hsl(223, 47%, 53%)');
  });
  it('doesnt convert hsl', () => {
    expect(toHsl('hsl(0, 0%, 0%)')).toBe('hsl(0, 0%, 0%)');
  });
  it('converts cmyk', () => {
    expect(toHsl('cmyk(0%, 0%, 0%, 0%)')).toBe('hsl(0, 0%, 100%)');
    expect(toHsl('cmyk(0%, 0%, 0%, 100%)')).toBe('hsl(0, 0%, 0%)');
    expect(toHsl('cmyk(87%, 50%, 0%, 65%)')).toBe('hsl(214, 76%, 20%)');
    expect(toHsl('cmyk(49%, 0%, 80%, 61%)')).toBe('hsl(96, 66%, 23%)');
  });
  it('converts hex', () => {
    expect(toHsl('#336314')).toBe('hsl(96, 66%, 23%)');
    expect(toHsl('#ff0000')).toBe('hsl(0, 100%, 50%)');
    expect(toHsl('#11e111')).toBe('hsl(120, 86%, 47%)');
  });
  it('converts ncol', () => {
    expect(toHsl('Y60, 8%, 62%')).toBe('hsl(96, 65%, 23%)');
    expect(toHsl('R0, 0%, 0%')).toBe('hsl(0, 100%, 50%)');
    expect(toHsl('G0, 7%, 13%')).toBe('hsl(120, 85%, 47%)');
  });
  it('converts color names', () => {
    expect(toHsl('magenta')).toBe('hsl(300, 100%, 50%)');
    expect(toHsl('green')).toBe('hsl(120, 100%, 25%)');
  });
});
