import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import StickyHotlineBar from './StickyHotlineBar';
import HotlineModal from '../common/HotlineModal';

export const PublicLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FFFDF9] text-slate-900 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Global Header */}
      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenHotlineModal={() => setIsHotlineModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Mobile Drawer Menu */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenHotlineModal={() => setIsHotlineModalOpen(true)}
      />

      {/* Emergency Hotline Directory Modal */}
      <HotlineModal
        isOpen={isHotlineModalOpen}
        onClose={() => setIsHotlineModalOpen(false)}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <StickyHotlineBar
        onOpenHotlineModal={() => setIsHotlineModalOpen(true)}
      />

      {/* District Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
