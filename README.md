# Public website

Will contain random stuff that i want to play around with or can use in some way or another


## Todolist

- Create a closable side drawer optimized for phone displays
- Use a svelte ui library
- Include routing
- Create an input that matches the button
- Make the button an actual replica of the awesome react button component (should take inputs corresponding to the react component)
- Make the button using other CSS tools
  - Styled components
  - Scss
  - Sass?
- Learn how to type style props to a component (how to tell typescript that padding is a string like '1em 2em 3em 4em')

## Issues i have with current development of svelte

- It is not possible to lint the `<style>` tag of components with eslint unless you use pure CSS. If you want to use the fx SCSS you need to either tell eslint to ignore the `<style>` part of your .svelte files or move the style into another file and point to that: `<style src="./style.scss"></style>`.