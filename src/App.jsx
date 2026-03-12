import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './i18n';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const OverPage = lazy(() => import('./pages/OverPage'));
const DienstenPage = lazy(() => import('./pages/DienstenPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const WerkwijzePage = lazy(() => import('./pages/WerkwijzePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Suspense fallback={<div className="min-h-screen bg-charcoal" />}>
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
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
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
            <Route path="/en/blog" element={<BlogIndexPage />} />
            <Route path="/en/blog/:slug" element={<BlogPostPage />} />
          </Route>

          {/* Fallback: redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
