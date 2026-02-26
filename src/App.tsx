import { lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { LoadingBoundary } from '@/components/ui/loading-boundary';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { RoleRoute } from '@/components/layout/role-route';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Eager: pages that are always needed on first load
import { LoginPage } from '@/pages/login';
import { SignupPage } from '@/pages/signup';
import { NotFoundPage } from '@/pages/not-found';

// Lazy: home page (large due to track pool data)
const HomePage = lazy(() => import('@/pages/home').then((m) => ({ default: m.HomePage })));

// Lazy: public pages
const BrowsePage = lazy(() => import('@/pages/browse').then((m) => ({ default: m.BrowsePage })));
const TrackDetailPage = lazy(() =>
  import('@/pages/track-detail').then((m) => ({ default: m.TrackDetailPage })),
);
const ChartsPage = lazy(() => import('@/pages/charts').then((m) => ({ default: m.ChartsPage })));
const CuratorsPage = lazy(() =>
  import('@/pages/curators').then((m) => ({ default: m.CuratorsPage })),
);
const CuratorProfilePage = lazy(() =>
  import('@/pages/curator-profile').then((m) => ({ default: m.CuratorProfilePage })),
);
const AboutPage = lazy(() => import('@/pages/about').then((m) => ({ default: m.AboutPage })));
const FeaturesPage = lazy(() =>
  import('@/pages/features').then((m) => ({ default: m.FeaturesPage })),
);
const SpecsPage = lazy(() => import('@/pages/specs').then((m) => ({ default: m.SpecsPage })));
const BecomeCuratorPage = lazy(() =>
  import('@/pages/become-curator').then((m) => ({ default: m.BecomeCuratorPage })),
);
const TermsPage = lazy(() => import('@/pages/terms').then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('@/pages/privacy').then((m) => ({ default: m.PrivacyPage })));
const AuthCallbackPage = lazy(() =>
  import('@/pages/auth-callback').then((m) => ({ default: m.AuthCallbackPage })),
);

// Lazy: artist dashboard
const ArtistDashboardPage = lazy(() =>
  import('@/pages/dashboard/artist-dashboard').then((m) => ({ default: m.ArtistDashboardPage })),
);
const SubmitTrackPage = lazy(() =>
  import('@/pages/dashboard/submit-track').then((m) => ({ default: m.SubmitTrackPage })),
);
const MySubmissionsPage = lazy(() =>
  import('@/pages/dashboard/my-submissions').then((m) => ({ default: m.MySubmissionsPage })),
);
const SubmissionDetailPage = lazy(() =>
  import('@/pages/dashboard/submission-detail').then((m) => ({ default: m.SubmissionDetailPage })),
);

// Lazy: curator dashboard
const CuratorDashboardPage = lazy(() =>
  import('@/pages/dashboard/curator-dashboard').then((m) => ({ default: m.CuratorDashboardPage })),
);
const ReviewQueuePage = lazy(() =>
  import('@/pages/dashboard/review-queue').then((m) => ({ default: m.ReviewQueuePage })),
);
const WriteReviewPage = lazy(() =>
  import('@/pages/dashboard/write-review').then((m) => ({ default: m.WriteReviewPage })),
);
const MyReviewsPage = lazy(() =>
  import('@/pages/dashboard/my-reviews').then((m) => ({ default: m.MyReviewsPage })),
);
const CuratorStatsPage = lazy(() =>
  import('@/pages/dashboard/curator-stats').then((m) => ({ default: m.CuratorStatsPage })),
);

// Lazy: settings
const ProfileSettingsPage = lazy(() =>
  import('@/pages/settings/profile-settings').then((m) => ({ default: m.ProfileSettingsPage })),
);

// Lazy: payment
const CheckoutPage = lazy(() =>
  import('@/pages/payment/checkout').then((m) => ({ default: m.CheckoutPage })),
);
const PaymentSuccessPage = lazy(() =>
  import('@/pages/payment/success').then((m) => ({ default: m.PaymentSuccessPage })),
);
const PaymentCancelPage = lazy(() =>
  import('@/pages/payment/cancel').then((m) => ({ default: m.PaymentCancelPage })),
);

// Lazy: admin
const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/admin-dashboard').then((m) => ({ default: m.AdminDashboardPage })),
);
const ManageSubmissionsPage = lazy(() =>
  import('@/pages/admin/manage-submissions').then((m) => ({ default: m.ManageSubmissionsPage })),
);
const ManageCuratorsPage = lazy(() =>
  import('@/pages/admin/manage-curators').then((m) => ({ default: m.ManageCuratorsPage })),
);
const ManagePayoutsPage = lazy(() =>
  import('@/pages/admin/manage-payouts').then((m) => ({ default: m.ManagePayoutsPage })),
);
const AnalyticsPage = lazy(() =>
  import('@/pages/admin/analytics').then((m) => ({ default: m.AnalyticsPage })),
);
const DebugConsolePage = lazy(() =>
  import('@/pages/admin/debug-console').then((m) => ({ default: m.DebugConsolePage })),
);

function App() {
  return (
    <MainLayout>
      <ScrollToTop />
      <LoadingBoundary>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/track/:id" element={<TrackDetailPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/curators" element={<CuratorsPage />} />
          <Route path="/curator/:id" element={<CuratorProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/specs" element={<SpecsPage />} />
          <Route path="/become-curator" element={<BecomeCuratorPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Artist Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ArtistDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/submit"
            element={
              <ProtectedRoute>
                <SubmitTrackPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/submissions"
            element={
              <ProtectedRoute>
                <MySubmissionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/submission/:id"
            element={
              <ProtectedRoute>
                <SubmissionDetailPage />
              </ProtectedRoute>
            }
          />

          {/* Curator Dashboard */}
          <Route
            path="/dashboard/curator"
            element={
              <RoleRoute role="curator">
                <CuratorDashboardPage />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/review-queue"
            element={
              <RoleRoute role="curator">
                <ReviewQueuePage />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/review/:id"
            element={
              <RoleRoute role="curator">
                <WriteReviewPage />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/my-reviews"
            element={
              <RoleRoute role="curator">
                <MyReviewsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/dashboard/curator-stats"
            element={
              <RoleRoute role="curator">
                <CuratorStatsPage />
              </RoleRoute>
            }
          />

          {/* Settings */}
          <Route
            path="/settings/profile"
            element={
              <ProtectedRoute>
                <ProfileSettingsPage />
              </ProtectedRoute>
            }
          />

          {/* Payment */}
          <Route
            path="/payment/checkout/:submissionId"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/cancel" element={<PaymentCancelPage />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <RoleRoute role="admin">
                <AdminDashboardPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/submissions"
            element={
              <RoleRoute role="admin">
                <ManageSubmissionsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/curators"
            element={
              <RoleRoute role="admin">
                <ManageCuratorsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/payouts"
            element={
              <RoleRoute role="admin">
                <ManagePayoutsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <RoleRoute role="admin">
                <AnalyticsPage />
              </RoleRoute>
            }
          />
          <Route
            path="/admin/debug"
            element={
              <RoleRoute role="admin">
                <DebugConsolePage />
              </RoleRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LoadingBoundary>
    </MainLayout>
  );
}

export default App;
