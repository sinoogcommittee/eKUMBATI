import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import StickyHotlineBar from './StickyHotlineBar';
import HotlineModal from '../common/HotlineModal';
import PwaInstallPrompt from '../common/PwaInstallPrompt';
import ScrollProgressBar from '../common/ScrollProgressBar';
import BackToTop from '../common/BackToTop';

export const PublicLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenMobileMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const handleCloseMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const handleOpenHotlineModal = useCallback(() => setIsHotlineModalOpen(true), []);
  const handleCloseHotlineModal = useCallback(() => setIsHotlineModalOpen(false), []);

  // Scroll to top and close mobile navigation drawer on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FFFDF9] text-slate-900 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Scroll-Driven Reading Progress Bar (Zero-JS composited animation when supported) */}
      <ScrollProgressBar />

      {/* Global Header */}
      <Header
        onOpenMobileMenu={handleOpenMobileMenu}
        onOpenHotlineModal={handleOpenHotlineModal}
      />

      {/* Main Content Viewport with Accessible Skip Anchor */}
      <main id="main-content" tabIndex={-1} className="flex-1 w-full max-w-full overflow-x-hidden outline-none">
        <Outlet />
      </main>

      {/* Mobile Drawer Menu */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        onOpenHotlineModal={handleOpenHotlineModal}
      />

      {/* Emergency Hotline Directory Modal */}
      <HotlineModal
        isOpen={isHotlineModalOpen}
        onClose={handleCloseHotlineModal}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <StickyHotlineBar
        onOpenHotlineModal={handleOpenHotlineModal}
      />

      {/* District Footer */}
      <Footer />

      {/* Floating Back to Top Action Pill */}
      <BackToTop />

      {/* PWA Device Web App Install Prompt */}
      <PwaInstallPrompt />
    </div>
  );
};

export default PublicLayout;
