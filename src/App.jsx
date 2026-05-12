import { Toaster } from "@/components/ui/toaster"
import { AppAuthProvider } from './context/AppAuthContext';
import { ProfileProvider } from './context/ProfileContext';
import Auth from './pages/Auth';
import ProfileSetup from './pages/ProfileSetup';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import ResortDetail from './pages/ResortDetail';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import TripPlanning from './pages/TripPlanning';
import ExpertAgents from './pages/ExpertAgents';
import Community from './pages/Community';
import ResortRoutePlanner from './pages/ResortRoutePlanner';
import HotelDetail from './pages/HotelDetail';
import TripPlannerFlow from './pages/TripPlannerFlow';
import TripSummary from './pages/TripSummary';
import TripConfirmed from './pages/TripConfirmed';
import MyTrips from './pages/MyTrips';
import PeakTracking from './pages/PeakTracking';
import ActivityDetail from './pages/ActivityDetail';
import TrackingRecord from './components/tracking/TrackingRecord';
import PeakLog from './components/tracking/PeakLog';
import PeakVision from './components/tracking/PeakVision';
import TrackingImport from './components/tracking/TrackingImport';
import RoutePlannerLanding from './components/tracking/RoutePlannerLanding';
import { TripPlannerProvider } from './context/TripPlannerContext';
import { Navigate } from 'react-router-dom';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/resort/:id" element={<ResortDetail />} />
        <Route path="/resort/:id/map" element={<ResortRoutePlanner />} />
        <Route path="/hotel/:id" element={<HotelDetail />} />
        <Route path="/plan" element={<TripPlannerFlow />} />
        <Route path="/plan/summary" element={<TripSummary />} />
        <Route path="/plan/confirmed" element={<TripConfirmed />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/tracking" element={<PeakTracking />}>
          <Route index element={<TrackingRecord />} />
          <Route path="log" element={<PeakLog />} />
          <Route path="vision" element={<PeakVision />} />
          <Route path="import" element={<TrackingImport />} />
          <Route path="routes" element={<RoutePlannerLanding />} />
        </Route>
        <Route path="/route-planner" element={<Navigate to="/tracking/routes" replace />} />
        <Route path="/route-planner/:resortId" element={<Navigate to="/tracking/routes" replace />} />
        <Route path="/tracking/activity/:id" element={<ActivityDetail />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trip-planning" element={<TripPlanning />} />
        <Route path="/agents" element={<ExpertAgents />} />
        <Route path="/community" element={<Community />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/setup" element={<ProfileSetup />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <AppAuthProvider>
        <TripPlannerProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <ProfileProvider>
                <AuthenticatedApp />
              </ProfileProvider>
            </Router>
            <Toaster />
          </QueryClientProvider>
        </TripPlannerProvider>
      </AppAuthProvider>
    </AuthProvider>
  )
}

export default App