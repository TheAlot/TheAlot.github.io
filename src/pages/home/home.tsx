import { Component } from 'solid-js';
import { BsGear } from 'solid-icons/bs';
import { useNavigate } from 'solid-app-router';
import Awesomebutton from '_components/awesomebutton';

const Home: Component = () => {
  const navigation = useNavigate();
  return (
    <div class="flex flex-1 flex-col items-center bg-gray-500">
      <BsGear
        class="absolute -bottom-52 -right-52 text-white opacity-20"
        size={1000}
      />
      <div class="z-10 my-10 flex w-4/5 flex-col items-center rounded-md bg-gray-600 p-5 shadow-xl">
        <p class="text- text-center text-5xl font-bold text-orange-400">
          Hello! Welcome to my webpage
        </p>
        <span class="mx-4 my-4 h-1 w-1/2 rounded-md bg-white opacity-50" />
        <p class="text-white">
          This website contains random projects that i wanted to create, these
          currently include the following:
        </p>
        <span class="mx-4 my-4 h-1 w-1/2 rounded-md bg-white opacity-50" />
        <button
          class="text-xl font-semibold text-white hover:text-orange-400"
          onClick={() => {
            console.log('clicked');
            navigation('/chargen');
          }}
          type="button"
        >
          DnD 5e Character sheet generator (WIP)
        </button>
        <span class="mx-4 my-4 h-1 w-1/2 rounded-md bg-white opacity-50" />

        <button
          class="text-xl font-semibold text-white hover:text-orange-400"
          onClick={() => {
            console.log('clicked');
            navigation('/killersolver');
          }}
          type="button"
        >
          Killer Sudoku Helper (WIP)
        </button>
        <Awesomebutton title="AwesomeButton" loading={false} />
      </div>
    </div>
  );
};

export default Home;
