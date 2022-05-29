import { Component, mergeProps, JSX, createSignal, onMount } from 'solid-js';
import { changeBrightness, toHsl } from '_utils/color';
import { AwesomeColors, defaultPrimary } from './colors';
import styles from './styles.module.css';

const AwesomeButton: Component<
  {
    title: string;
    loading?: boolean;
    disabled?: boolean;
    /** Defaults to 2.25rem (36px) */ height?: string;
    /** Defaults to
  /** Defaults to 2.25rem */ horizontalPadding?: string;
    /** Defaults to 0.375rem */ borderRadius?: string;
    /** Defaults to 150 */ animDuration?: number;
    /** Defaults to 600 */ fontWeight?: JSX.CSSProperties['fontWeight'];
    /** Defaults to 1.25rem */ fontSize?: string;
    onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
  } & Partial<AwesomeColors>
> = _props => {
  const props = mergeProps(
    {
      height: '2.25rem',
      horizontalPadding: '2.25rem',
      borderRadius: '0.375rem',
      animDuration: 150,
      fontWeight: '600',
      fontSize: '1.25rem',
      onClick: (event: any) => console.log('Button clicked', event),
    },
    _props,
  );

  const colorLight = () =>
    props.colorLight || props.color
      ? changeBrightness(props.color, 30)
      : defaultPrimary.colorLight;
  const colorDark = () =>
    props.colorDark || props.color
      ? changeBrightness(props.color, -30)
      : defaultPrimary.colorDark;
  const colorHover = () =>
    props.colorHover || props.color
      ? changeBrightness(props.color, -10)
      : defaultPrimary.colorHover;
  const colorDisabledDark = () =>
    props.disabledDark || props.disabledColor
      ? changeBrightness(props.disabledColor, -30)
      : defaultPrimary.disabledDark;
  const fontColor = () =>
    props.fontColor || props.color
      ? Number(
          toHsl(props.color)
            .replaceAll(/hsl\(|\)| |%/gi, '')
            .split(',')[2],
        ) > 50
        ? '#000'
        : '#fff'
      : defaultPrimary.fontColor;

  const [width, setWidth] = createSignal(0);

  let buttonRef: HTMLButtonElement | undefined;

  onMount(() => setWidth(buttonRef?.clientWidth || 0));

  const [mousePos, setMousePos] = createSignal<'left' | 'right' | 'middle'>(
    'middle',
  );
  const onMouseMove: JSX.EventHandler<
    HTMLButtonElement,
    MouseEvent
  > = event => {
    if (!buttonRef || props.disabled) return;
    const { left } = buttonRef.getBoundingClientRect();
    const width = buttonRef.offsetWidth;
    if (event.pageX < left + width * 0.3) {
      setMousePos('left');
    } else if (event.pageX > left + width * 0.65) {
      setMousePos('right');
    } else {
      setMousePos('middle');
    }
  };
  return (
    <div class="relative my-2 h-fit w-fit">
      <button
        ref={buttonRef}
        onClick={e => props.onClick(e)}
        onMouseMove={onMouseMove}
        disabled={props.disabled}
        style={{
          'transform-style': 'preserve-3d',
          height: props.height,
          'border-radius': props.borderRadius,
          'padding-left': props.horizontalPadding,
          'padding-right': props.horizontalPadding,
          transition: `transform ${props.animDuration}ms cubic-bezier(0, 0, 0.58, 1), 
            background ${props.animDuration}ms cubic-bezier(0, 0, 0.58, 1), 
            text-decoration ${props.animDuration}ms cubic-bezier(0, 0, 0.58, 1)`,
          'font-weight': props.fontWeight,
          'font-style': 'normal',
          'text-align': 'center',
          'font-size': props.fontSize,
          position: 'relative',
          bottom: '5px',
          '--color-light': colorLight(),
          '--color-active': colorDark(),
          '--color-hover': colorHover(),
          '--color-disabled':
            props.disabledColor || defaultPrimary.disabledColor,
          '--color-disabled-dark': colorDisabledDark(),
          '--font-color': fontColor(),
          '--color': props.color || defaultPrimary.color,
        }}
        class={`${styles.button} ${
          props.disabled ? styles.disabled : styles[mousePos()]
        }`}
      >
        {props.title}
      </button>
      <span
        class={`${styles.inner} ${
          props.disabled ? styles.disabled : styles[mousePos()]
        }`}
        style={{
          width: `${width()}px`,
          'border-radius': props.borderRadius,
          height: `calc(${props.height} - 2px)`,
          position: 'absolute',
          transition: `background-color ${props.animDuration}ms cubic-bezier(0, 0, 0.58, 1)`,
          top: '3px',
          left: 0,
          'z-index': -1,
          '--color-dark': colorDark(),
          '--color-disabled-dark': colorDisabledDark(),
        }}
      />
      <span
        class={`${styles.shadow} ${styles[mousePos()]}`}
        style={{
          width: `${width()}px`,
          'border-radius': props.borderRadius,
          color: 'transparent',
          position: 'absolute',
          height: `calc(${props.height} - 2px)`,
          'z-index': -2,
          transition: `transform ${props.animDuration}ms cubic-bezier(0, 0, 0.58, 1)`,
          top: '8px',
          left: 0,
        }}
      />
    </div>
  );
};

export default AwesomeButton;
