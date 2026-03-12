import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import usePageMeta from '../hooks/usePageMeta';

const Layout = () => {
  usePageMeta();

  return (
    <div className="relative selection:bg-clay selection:text-cream font-sans bg-cream text-charcoal">
      <div className="noise-overlay fixed inset-0 pointer-events-none z-50"></div>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
