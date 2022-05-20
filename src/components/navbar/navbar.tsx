import { Component, JSXElement, mergeProps } from 'solid-js';
import { SiDungeonsanddragons } from 'solid-icons/si';
import { BiMath } from 'solid-icons/bi';

const SidebarIcon: Component<{ icon: JSXElement; tooltip?: string }> = (
  _props,
) => {
  const props = mergeProps({ tooltip: 'Default' }, _props);
  return (
    <div class="relative">
      <div
        class="peer flex items-center cursor-pointer justify-center h-20 w-20 my-2 mx-auto shadow-lg bg-gray-800 text-green-500 rounded-3xl
        hover:bg-green-600 hover:text-white hover:rounded-xl 
        focus:rounded-xl 
        active:translate-y-1 
        transition-all duration-100 ease-linear"
        tabindex={0}
      >
        {props.icon}
      </div>

      <span
        class="absolute w-auto p-2 m-2 min-w-max left-28 top-5 scale-0 rounded-md shadow-md text-white bg-gray-900 text-md font-bold origin-left
          transition-all duration-100 peer-hover:scale-100 "
      >
        {props.tooltip}
      </span>
      <span
        class="absolute origin-center bg-white h-6 w-2 rounded-md -left-2 top-9
        peer-hover:-left-1
        peer-active:scale-y-[2]
        peer-focus:scale-y-[2] peer-focus:-left-1
          transition-all duration-75 ease-linear"
      />
    </div>
  );
};
export const Navbar: Component = () => {
  return (
    <div class="fixed top-0 left-0 h-screen w-28 flex flex-col bg-gray-900 text-white shadow-lg first:pt-2 last:pb-2">
      <SidebarIcon
        icon={<SiDungeonsanddragons size={36} />}
        tooltip="5e Character sheet generator"
      />
      <SidebarIcon icon={<BiMath size={36} />} tooltip="Killer sudoku adder" />
    </div>
  );
};
