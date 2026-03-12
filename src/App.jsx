import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import OverPage from './pages/OverPage';
import DienstenPage from './pages/DienstenPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WerkwijzePage from './pages/WerkwijzePage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import FaqPage from './pages/FaqPage';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          {/* NL routes (default) */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/over" element={<OverPage />} />
            <Route path="/diensten" element={<DienstenPage />} />
            <Route path="/diensten/:slug" element={<ServiceDetailPage />} />
            <Route path="/werkwijze" element={<WerkwijzePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Route>

          {/* EN routes */}
          <Route element={<Layout />}>
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/about" element={<OverPage />} />
            <Route path="/en/services" element={<DienstenPage />} />
            <Route path="/en/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/en/approach" element={<WerkwijzePage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            <Route path="/en/privacy" element={<PrivacyPage />} />
            <Route path="/en/faq" element={<FaqPage />} />
          </Route>

          {/* Fallback: redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
