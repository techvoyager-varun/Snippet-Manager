import { Outlet } from 'react-router-dom';
import Header from './Header';

const Applayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Applayout;
