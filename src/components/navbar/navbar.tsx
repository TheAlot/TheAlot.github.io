import { Component, createMemo, JSXElement, mergeProps } from 'solid-js';
import { SiDungeonsanddragons } from 'solid-icons/si';
import { BiMath } from 'solid-icons/bi';
import { useLocation, useNavigate } from 'solid-app-router';
import { AiFillFire } from 'solid-icons/ai';
import Space from '../space';

// Currently the preferred way to make dynamic classnames in tailwind, this is called a lookup table
const whiteBar = {
  y: 'scale-y-[2] -left-1',
  n: '-left-2',
};

const square = {
  y: 'rounded-xl text-white bg-green-600',
  n: 'rounded-3xl text-green-500 bg-gray-800',
};

const SidebarIcon: Component<{
  icon: JSXElement;
  tooltip?: string;
  route: string;
}> = (_props) => {
  const props = mergeProps({ tooltip: 'Default' }, _props);
  const navigate = useNavigate();
  const pathname = createMemo(() => useLocation().pathname);
  return (
    <div class="relative">
      <div
        class={`peer my-2 mx-auto flex h-20 w-20 cursor-pointer items-center justify-center shadow-lg  
          hover:rounded-xl hover:bg-green-600 hover:text-white 
          ${square[pathname() === props.route ? 'y' : 'n']} 
          transition-all duration-100 ease-linear active:translate-y-1`}
        tabindex={0}
        onClick={() => {
          navigate(props.route);
        }}
      >
        {props.icon}
      </div>

      <span
        class="text-md absolute left-28 top-5 m-2 w-auto min-w-max origin-left scale-0 select-none rounded-md bg-gray-900 p-2 font-bold text-white
          shadow-md transition-all duration-100 peer-hover:scale-100"
      >
        {props.tooltip}
      </span>
      <span
        class={`absolute top-9 h-6 w-2 origin-center rounded-md bg-white
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
    <div class="sticky z-20 top-0 left-0 flex h-screen w-28 flex-col bg-gray-900 text-white shadow-lg first:pt-2 last:pb-2">
      <SidebarIcon icon={<AiFillFire size={42} />} tooltip="Home" route="/" />
      <Space />
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
