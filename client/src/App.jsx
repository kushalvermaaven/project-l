import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Providers
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';

// Public Pages
import Home from './pages/public/Home';
import Explore from './pages/public/Explore';
import ArtworkDetail from './pages/public/ArtworkDetail';
import ArtistProfile from './pages/public/ArtistProfile';
import CustomArt from './pages/public/CustomArt';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Pricing from './pages/public/Pricing';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';

// Buyer Dashboard Pages
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import Favorites from './pages/buyer/Favorites';
import BuyerOrders from './pages/buyer/Orders';
import BuyerMessages from './pages/buyer/Messages';
import BuyerCustomRequests from './pages/buyer/CustomRequests';

// Artist Dashboard Pages
import ArtistDashboard from './pages/artist/ArtistDashboard';
import MyArtworks from './pages/artist/MyArtworks';
import AddArtwork from './pages/artist/AddArtwork';
import ArtistOrders from './pages/artist/ArtistOrders';
import ArtistMessages from './pages/artist/ArtistMessages';
import ArtistCustomRequests from './pages/artist/ArtistCustomRequests';
import Earnings from './pages/artist/Earnings';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageArtworks from './pages/admin/ManageArtworks';
import ManageOrders from './pages/admin/ManageOrders';
import Reports from './pages/admin/Reports';

// Shared Pages
import ProfileSettings from './pages/shared/ProfileSettings';
import NotFound from './pages/shared/NotFound';

// Protected Route Component
function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper that hides footer on dashboard routes
function AppLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/artist-dashboard') || pathname.startsWith('/admin');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/custom-art" element={<CustomArt />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Buyer Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/favorites" element={<ProtectedRoute allowedRoles={['buyer']}><Favorites /></ProtectedRoute>} />
          <Route path="/dashboard/orders" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerOrders /></ProtectedRoute>} />
          <Route path="/dashboard/messages" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerMessages /></ProtectedRoute>} />
          <Route path="/dashboard/custom-requests" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerCustomRequests /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute allowedRoles={['buyer']}><ProfileSettings /></ProtectedRoute>} />
          
          {/* Artist Dashboard Routes */}
          <Route path="/artist-dashboard" element={<ProtectedRoute allowedRoles={['artist']}><ArtistDashboard /></ProtectedRoute>} />
          <Route path="/artist-dashboard/artworks" element={<ProtectedRoute allowedRoles={['artist']}><MyArtworks /></ProtectedRoute>} />
          <Route path="/artist-dashboard/add-artwork" element={<ProtectedRoute allowedRoles={['artist']}><AddArtwork /></ProtectedRoute>} />
          <Route path="/artist-dashboard/edit-artwork/:id" element={<ProtectedRoute allowedRoles={['artist']}><AddArtwork /></ProtectedRoute>} />
          <Route path="/artist-dashboard/orders" element={<ProtectedRoute allowedRoles={['artist']}><ArtistOrders /></ProtectedRoute>} />
          <Route path="/artist-dashboard/messages" element={<ProtectedRoute allowedRoles={['artist']}><ArtistMessages /></ProtectedRoute>} />
          <Route path="/artist-dashboard/custom-requests" element={<ProtectedRoute allowedRoles={['artist']}><ArtistCustomRequests /></ProtectedRoute>} />
          <Route path="/artist-dashboard/earnings" element={<ProtectedRoute allowedRoles={['artist']}><Earnings /></ProtectedRoute>} />
          <Route path="/artist-dashboard/profile" element={<ProtectedRoute allowedRoles={['artist']}><ProfileSettings /></ProtectedRoute>} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><ManageUsers /></ProtectedRoute>} />
          <Route path="/admin/artworks" element={<ProtectedRoute allowedRoles={['admin']}><ManageArtworks /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin']}><ManageOrders /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <NotificationProvider>
            <FavoritesProvider>
              <ScrollToTop />
              <AppLayout />
            </FavoritesProvider>
          </NotificationProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
