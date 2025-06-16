
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ResumeUpload from "./pages/ResumeUpload";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Chat from "./pages/Chat";
import Coach from "./pages/Coach";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import RecruiterOnboarding from "./pages/RecruiterOnboarding";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterActivity from "./pages/RecruiterActivity";
import RecruiterChat from "./pages/RecruiterChat";
import RecruiterStats from "./pages/RecruiterStats";
import PostJob from "./pages/PostJob";
import Candidates from "./pages/Candidates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/splash" replace />} />
            <Route 
              path="/splash" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Splash />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/auth" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Auth />
                </ProtectedRoute>
              } 
            />
            
            {/* Job Seeker Routes */}
            <Route 
              path="/resume-upload" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <ResumeUpload />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/onboarding" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <Onboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/jobs" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <Jobs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/jobs/:jobId" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <JobDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <Chat />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/coach" 
              element={
                <ProtectedRoute userType="job_seeker">
                  <Coach />
                </ProtectedRoute>
              } 
            />
            
            {/* Recruiter Routes */}
            <Route 
              path="/recruiter-onboarding" 
              element={
                <ProtectedRoute userType="recruiter">
                  <RecruiterOnboarding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter-dashboard" 
              element={
                <ProtectedRoute userType="recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter-activity" 
              element={
                <ProtectedRoute userType="recruiter">
                  <RecruiterActivity />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter-chat" 
              element={
                <ProtectedRoute userType="recruiter">
                  <RecruiterChat />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter-stats" 
              element={
                <ProtectedRoute userType="recruiter">
                  <RecruiterStats />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/post-job" 
              element={
                <ProtectedRoute userType="recruiter">
                  <PostJob />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/candidates" 
              element={
                <ProtectedRoute userType="recruiter">
                  <Candidates />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
