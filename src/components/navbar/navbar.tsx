import { Component, createMemo, JSXElement, mergeProps } from 'solid-js';
import { SiDungeonsanddragons } from 'solid-icons/si';
import { BiMath } from 'solid-icons/bi';
import { useLocation, useNavigate } from 'solid-app-router';
import { AiFillFire } from 'solid-icons/ai';

// Currently the preferred way to make dynamic classnames in tailwind, this is called a lookup table
const whiteBar = {
  y: 'scale-y-[2] -left-1',
  n: '-left-2',
};

const square = {
  y: 'rounded-xl text-white bg-green-600',
  n: '',
};

const SidebarIcon: Component<{
  icon: JSXElement;
  tooltip?: string;
  route: string;
}> = (_props) => {
  const props = mergeProps({ tooltip: 'Default' }, _props);
  const navigate = useNavigate();
  const pathname = createMemo(() => useLocation().pathname)
  return (
    <div class="relative">
      <div
        class={`peer flex items-center cursor-pointer justify-center h-20 w-20 my-2 mx-auto shadow-lg bg-gray-800 text-green-500 rounded-3xl
        hover:bg-green-600 hover:text-white hover:rounded-xl 
        ${square[pathname() === props.route ? 'y' : 'n']} 
        active:translate-y-1 
        transition-all duration-100 ease-linear`}
        tabindex={0}
        onClick={() => {
          navigate(props.route);
        }}
      >
        {props.icon}
      </div>

      <span
        class="absolute w-auto p-2 m-2 min-w-max left-28 top-5 scale-0 rounded-md shadow-md text-white bg-gray-900 text-md font-bold origin-left
          transition-all duration-100 peer-hover:scale-100 select-none"
      >
        {props.tooltip}
      </span>
      <span
        class={`absolute origin-center bg-white h-6 w-2 rounded-md -left-2 top-9
        peer-hover:-left-1
        peer-active:scale-y-[2]
        ${pathname() === props.route ? whiteBar.y : whiteBar.n}
          transition-all duration-75 ease-linear`}
      />
    </div>
  );
};
export const Navbar: Component = () => {
  return (
    <div class="sticky top-0 left-0 h-screen w-28 flex flex-col bg-gray-900 text-white shadow-lg first:pt-2 last:pb-2">
      <SidebarIcon icon={<AiFillFire size={42} />} tooltip="Home" route="/" />
      <span class="h-1 relative bg-white opacity-50 w-auto mx-2 rounded-md" />
      <SidebarIcon
        icon={<SiDungeonsanddragons size={36} />}
        tooltip="5e Character sheet generator"
        route="/Chargen"
      />
      <SidebarIcon
        icon={<BiMath size={36} />}
        tooltip="Killer sudoku adder"
        route="/killersolver"
      />
    </div>
  );
};
