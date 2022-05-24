import { JSX } from 'solid-js';

type Color = JSX.CSSProperties['color'];

export interface AwesomeColors {
  color: Color;
  colorLight: Color;
  colorDark: Color;
  colorHover: Color;
  disabled: Color;
  disabledDark: Color;
}

export const defaultPrimary: AwesomeColors = {
  color: 'rgb(37, 99, 235)',
  colorLight: 'rgb(255, 255, 255)',
  colorDark: 'rgb(27, 59, 170)',
  colorHover: 'rgb(27, 89, 215)',
  disabled: 'rgb(175, 175, 175)',
  disabledDark: 'rgb(137, 137, 137)',
};

export const defaultSecondary: AwesomeColors = {
  color: '#f2f6f9',
  colorDark: defaultPrimary.colorDark,
  colorLight: 'rgb(77, 149, 255)',
  colorHover: '#e1eaf1',
  disabled: 'rgb(175, 175, 175)',
  disabledDark: 'rgb(137, 137, 137)',
};
