import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { ToastProvider } from './components/ToastProvider';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CreateReportPage from './pages/CreateReportPage';
import LandingPage from './pages/LandingPage';
import MapFeedPage from './pages/MapFeedPage';
import NotFoundPage from './pages/NotFoundPage';
import ReportDetailPage from './pages/ReportDetailPage';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/signalements" element={<MapFeedPage />} />
          <Route path="/signalements/nouveau" element={<CreateReportPage />} />
          <Route path="/signalements/:reportId" element={<ReportDetailPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
