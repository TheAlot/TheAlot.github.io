import { Route, Routes } from 'solid-app-router';
import { Component, lazy } from 'solid-js';
import { Navbar } from './components/navbar';
import Home from './pages/home';

const KillerSolver = lazy(() => import('./pages/killerSolver'));
const Chargen = lazy(() => import('./pages/chargen'));

const App: Component = () => {
  return (
    <div class="flex">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chargen" element={<Chargen />} />
        <Route path="/killersolver" element={<KillerSolver />} />
      </Routes>
    </div>
  );
};

export default App;
