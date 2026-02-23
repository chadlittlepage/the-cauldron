import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { ProtectedRoute } from '@/components/layout/protected-route';
import { RoleRoute } from '@/components/layout/role-route';

// Auth pages
import { LoginPage } from '@/pages/login';
import { SignupPage } from '@/pages/signup';
import { AuthCallbackPage } from '@/pages/auth-callback';

// Public pages
import { HomePage } from '@/pages/home';
import { BrowsePage } from '@/pages/browse';
import { TrackDetailPage } from '@/pages/track-detail';
import { ChartsPage } from '@/pages/charts';
import { CuratorsPage } from '@/pages/curators';
import { CuratorProfilePage } from '@/pages/curator-profile';
import { NotFoundPage } from '@/pages/not-found';
import { AboutPage } from '@/pages/about';
import { BecomeCuratorPage } from '@/pages/become-curator';
import { TermsPage } from '@/pages/terms';
import { PrivacyPage } from '@/pages/privacy';

// Artist dashboard
import { ArtistDashboardPage } from '@/pages/dashboard/artist-dashboard';
import { SubmitTrackPage } from '@/pages/dashboard/submit-track';
import { MySubmissionsPage } from '@/pages/dashboard/my-submissions';
import { SubmissionDetailPage } from '@/pages/dashboard/submission-detail';

// Curator dashboard
import { CuratorDashboardPage } from '@/pages/dashboard/curator-dashboard';
import { ReviewQueuePage } from '@/pages/dashboard/review-queue';
import { WriteReviewPage } from '@/pages/dashboard/write-review';
import { MyReviewsPage } from '@/pages/dashboard/my-reviews';
import { CuratorStatsPage } from '@/pages/dashboard/curator-stats';

// Settings
import { ProfileSettingsPage } from '@/pages/settings/profile-settings';

// Payment
import { CheckoutPage } from '@/pages/payment/checkout';
import { PaymentSuccessPage } from '@/pages/payment/success';
import { PaymentCancelPage } from '@/pages/payment/cancel';

// Admin
import { AdminDashboardPage } from '@/pages/admin/admin-dashboard';
import { ManageSubmissionsPage } from '@/pages/admin/manage-submissions';
import { ManageCuratorsPage } from '@/pages/admin/manage-curators';
import { ManagePayoutsPage } from '@/pages/admin/manage-payouts';
import { AnalyticsPage } from '@/pages/admin/analytics';

function App() {
  return (
    <MainLayout>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/track/:id" element={<TrackDetailPage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/curators" element={<CuratorsPage />} />
        <Route path="/curator/:id" element={<CuratorProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
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
          element={<ProtectedRoute><ArtistDashboardPage /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/submit"
          element={<ProtectedRoute><SubmitTrackPage /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/submissions"
          element={<ProtectedRoute><MySubmissionsPage /></ProtectedRoute>}
        />
        <Route
          path="/dashboard/submission/:id"
          element={<ProtectedRoute><SubmissionDetailPage /></ProtectedRoute>}
        />

        {/* Curator Dashboard */}
        <Route
          path="/dashboard/curator"
          element={<RoleRoute role="curator"><CuratorDashboardPage /></RoleRoute>}
        />
        <Route
          path="/dashboard/review-queue"
          element={<RoleRoute role="curator"><ReviewQueuePage /></RoleRoute>}
        />
        <Route
          path="/dashboard/review/:id"
          element={<RoleRoute role="curator"><WriteReviewPage /></RoleRoute>}
        />
        <Route
          path="/dashboard/my-reviews"
          element={<RoleRoute role="curator"><MyReviewsPage /></RoleRoute>}
        />
        <Route
          path="/dashboard/curator-stats"
          element={<RoleRoute role="curator"><CuratorStatsPage /></RoleRoute>}
        />

        {/* Settings */}
        <Route
          path="/settings/profile"
          element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>}
        />

        {/* Payment */}
        <Route
          path="/payment/checkout/:submissionId"
          element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
        />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/cancel" element={<PaymentCancelPage />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={<RoleRoute role="admin"><AdminDashboardPage /></RoleRoute>}
        />
        <Route
          path="/admin/submissions"
          element={<RoleRoute role="admin"><ManageSubmissionsPage /></RoleRoute>}
        />
        <Route
          path="/admin/curators"
          element={<RoleRoute role="admin"><ManageCuratorsPage /></RoleRoute>}
        />
        <Route
          path="/admin/payouts"
          element={<RoleRoute role="admin"><ManagePayoutsPage /></RoleRoute>}
        />
        <Route
          path="/admin/analytics"
          element={<RoleRoute role="admin"><AnalyticsPage /></RoleRoute>}
        />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
