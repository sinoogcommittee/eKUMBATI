import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Loading Fallback
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import LoadingSpinner from './components/common/LoadingSpinner';
import { ToastProvider } from './context/ToastContext';

// Lazy-Loaded Public Pages for Maximum Mobile Performance
const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ProgramsPage = lazy(() => import('./pages/public/ProgramsPage'));
const ImpactPage = lazy(() => import('./pages/public/ImpactPage'));
const NewsPage = lazy(() => import('./pages/public/NewsPage'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const DirectoryPage = lazy(() => import('./pages/public/DirectoryPage'));
const MapPage = lazy(() => import('./pages/public/MapPage'));
const ActionCenterPage = lazy(() => import('./pages/public/ActionCenterPage'));

// Lazy-Loaded Admin CMS Pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminNewsPage = lazy(() => import('./pages/admin/AdminNewsPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));
const AdminMetricsPage = lazy(() => import('./pages/admin/AdminMetricsPage'));
const AdminProgramsPage = lazy(() => import('./pages/admin/AdminProgramsPage'));
const AdminGalleryPage = lazy(() => import('./pages/admin/AdminGalleryPage'));
const AdminSubmissionsPage = lazy(() => import('./pages/admin/AdminSubmissionsPage'));
const AdminLocationsPage = lazy(() => import('./pages/admin/AdminLocationsPage'));

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner fullScreen text="Loading e-KUMBATI..." />}>
          <Routes>
            {/* Public Portal Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/announcements" element={<Navigate to="/news" replace />} />
              <Route path="/updates" element={<Navigate to="/news" replace />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/directory" element={<DirectoryPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/action-center" element={<ActionCenterPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>

            {/* Admin Login Route (Standalone) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin CMS Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="news" element={<AdminNewsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
              <Route path="metrics" element={<AdminMetricsPage />} />
              <Route path="programs" element={<AdminProgramsPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="submissions" element={<AdminSubmissionsPage />} />
              <Route path="directory-map" element={<AdminLocationsPage />} />
            </Route>

            {/* Fallback Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
