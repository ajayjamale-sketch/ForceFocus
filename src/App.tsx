import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

// Layout
import ScrollToTop from "@/components/features/ScrollToTop";

// Pages — Public
import Index from "@/pages/Index";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import FAQ from "@/pages/FAQ";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import Changelog from "@/pages/Changelog";
import Careers from "@/pages/Careers";
import Documentation from "@/pages/Documentation";
import Community from "@/pages/Community";
import Integrations from "@/pages/Integrations";
import CookiePolicy from "@/pages/CookiePolicy";
import GDPR from "@/pages/GDPR";

// Pages — Auth
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";

// Pages — Dashboard
import Dashboard from "@/pages/Dashboard";
import FocusPage from "@/pages/FocusPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import TasksPage from "@/pages/TasksPage";
import GoalsPage from "@/pages/GoalsPage";
import HabitsPage from "@/pages/HabitsPage";
import TeamList from "@/pages/team/TeamList";
import TeamCreate from "@/pages/team/TeamCreate";
import TeamDetail from "@/pages/team/TeamDetail";
import TeamPage from "@/pages/TeamPage";
import AdminLayout from "@/components/layout/AdminLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserList from "@/pages/admin/users/UserList";
import UserEdit from "@/pages/admin/users/UserEdit";
import AdminRoles from "@/pages/admin/AdminRoles";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { RequireRole } from "@/components/RequireRole";
import WellnessPage from "@/pages/WellnessPage";
import AchievementsPage from "@/pages/AchievementsPage";

// Pages — Account
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";

// Pages — Catch-all
import NotFound from "@/pages/NotFound";

function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme();
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollRestoration />
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/community" element={<Community />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/gdpr" element={<GDPR />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboard pages (own layout via DashboardLayout) */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/focus" element={<FocusPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/tasks" element={<TasksPage />} />
          <Route path="/dashboard/goals" element={<GoalsPage />} />
          <Route path="/dashboard/habits" element={<HabitsPage />} />
          <Route path="/dashboard/wellness" element={<WellnessPage />} />
          <Route path="/dashboard/achievements" element={<AchievementsPage />} />
          <Route path="/dashboard/team" element={<RequireRole allowedRoles={['team_member','team_manager','hr_admin','platform_admin']}><TeamPage /></RequireRole>} />
          {/* Team pages via module */}
          <Route path="/team" element={<RequireRole allowedRoles={['team_member','team_manager','hr_admin','platform_admin']}><TeamList /></RequireRole>} />
          <Route path="/team/create" element={<RequireRole allowedRoles={['team_manager','hr_admin','platform_admin']}><TeamCreate /></RequireRole>} />
          <Route path="/team/:teamId" element={<RequireRole allowedRoles={['team_member','team_manager','hr_admin','platform_admin']}><TeamDetail /></RequireRole>} />

          {/* Admin pages */}
          <Route path="/admin/dashboard" element={<RequireRole allowedRoles={['hr_admin','platform_admin']}><AdminLayout><AdminDashboard /></AdminLayout></RequireRole>} />
          <Route path="/admin/users" element={<RequireRole allowedRoles={['hr_admin','platform_admin']}><AdminLayout><UserList /></AdminLayout></RequireRole>} />
          <Route path="/admin/users/:id/edit" element={<RequireRole allowedRoles={['hr_admin','platform_admin']}><AdminLayout><UserEdit /></AdminLayout></RequireRole>} />
          <Route path="/admin/roles" element={<RequireRole allowedRoles={['hr_admin','platform_admin']}><AdminLayout><AdminRoles /></AdminLayout></RequireRole>} />
          <Route path="/admin/settings" element={<RequireRole allowedRoles={['hr_admin','platform_admin']}><AdminLayout><AdminSettings /></AdminLayout></RequireRole>} />

          {/* Account pages */}
          <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--card))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              fontSize: "14px",
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}
